const helpers = require('../helpers/index')
const messageModel = require('../models/message')

module.exports = {
    getAllMessage: async function(req, res) {
        req.io.emit
        const id = req.params.id;
        try {
            const results = await messageModel.getIdMessage(id)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getPersonalMessage: async function (req, res) {
        req.io.emit
        const sender_id = req.params.sender_id;
        const receiver_id = req.params.receiver_id;
        try {
            const results = await messageModel.getPersonalMessageModel(sender_id, receiver_id)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    postMessage: async function(req, res) {
        const setData = req.body;
        try {
            const results = await messageModel.postMessageModel(setData)
            req.io.emit('message', results)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    putMessage: async function(req, res) {
        const setData = req.body;
        const id = req.params.id;
        try {
            const result = await messageModel.putMessageModel(setData, id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    deleteMessage: async function(req, res) {
        const id = req.params.id;
        try {
            const results = await messageModel.deleteMessageModel(id)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

}