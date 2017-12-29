const success = (res, callback) => (object) => callback(object, res)

const error = (res) => (error) => { 
    console.log(error)
   return res.status(400).json({ error: error} ) 
}

module.exports = {
    success: success,
    error: error
}
