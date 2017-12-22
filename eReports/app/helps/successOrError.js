const success = (res, callback) => (object) => callback(object, res)

const error = (res) => (error) => res.status(400).json({ error: error})

module.exports = {
    success: success,
    error: error
}
