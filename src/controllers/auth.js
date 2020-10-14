const helpers = require('../helpers/index')
const authModel = require('../models/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../configs/server');

module.exports = {
    register: async function(req, res) {
        const setData = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(setData.password, salt)
        setData.password = hashPass;
        try {
            const result = await authModel.registerModel(setData);
            delete result.password
            return helpers.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error);
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    login: async function(req, res) {
        const loginData = req.body
        try {
            const result = await authModel.loginModel(loginData.username);
            if (result.length > 0) {
                const hashPass = result[0].password;
                const checkPass = bcrypt.compareSync(loginData.password, hashPass);
                if (checkPass) {
                    delete result[0].password;
                    const tokenData = {
                        ...result[0]
                    }
                    const token = jwt.sign(tokenData, config.jwtSecretKey, { expiresIn: '1 days' })
                    result[0].token = token;
                    const refreshTokenNew = jwt.sign(tokenData, config.jwtSecretKeyNew, { expiresIn: '7 days' })
                    result[0].refreshTokenNew = refreshTokenNew;
                    return helpers.response(res, 'success', result, 200);
                }
                return helpers.response(res, 'fail', 'Username or password is wrong!', 400);
            }
            return helpers.response(res, 'fail', 'Username or password is wrong!', 400);
        } catch (err) {
            console.log(err, 'g');
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    refreshToken: async function(req, res) {
        const authorization = req.headers.authorization;
        try {
            const tokenData = {
                ...req.decodedRefreshToken
            }
            delete tokenData.iat;
            delete tokenData.exp;
            const token = jwt.sign(tokenData, config.jwtSecretKey, { expiresIn: '1 days' })
            const refreshTokenNew = jwt.sign(tokenData, config.jwtSecretKeyNew, { expiresIn: '7 days' })
            tokenData.refreshTokenNew = refreshTokenNew;
            tokenData.token = token;
            return helpers.response(res, 'success', tokenData, 200);
        } catch (err) {
            console.log(err);
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },
}