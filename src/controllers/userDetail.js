const helpers = require('../helpers/index')
const userDetailModel = require('../models/userDetail')

module.exports = {
    getAllUser: async function(req, res) {
        try {
            const results = await userDetailModel.getAllDetailUser()
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getIdUser: async function(req, res) {
        const id = req.params.id;
        try {
            const results = await userDetailModel.getIdDetailUser(id)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    postUser: async function(req, res) {
        const setData = req.body;
        setData.image = req.file ? req.file.filename : '';
        try {
            const results = await userDetailModel.postDetailUser(setData)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    putUser: async function(req, res) {
        const setData = req.body;
        const id = req.params.id;
        setData.image = req.file ? req.file.filename : '';
        try {
            const result = await userDetailModel.putDetailUser(setData, id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    deleteUser: async function(req, res) {
        const id = req.params.id;
        try {
            const results = await userDetailModel.deleteDetailUser(id)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

}