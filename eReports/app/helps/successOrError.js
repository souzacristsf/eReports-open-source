const success = (res, callback) => (object) => callback(object, res)//callback(object, res)

const error = (res, callback) => (error) => callback(error, res)

module.exports = {
    success: success,
    error: error
}
