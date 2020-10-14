module.exports = {
    response: function(res, status, data, statusCode) {
        let result = {}
        result.data = data || '';
        result.statusCode = statusCode || 200;
        result.status = status === 'success' ? true : false;

        return res.status(result.statusCode).json({
            status: result.statusCode,
            message: result.status,
            data: result.data
        })
    }
}