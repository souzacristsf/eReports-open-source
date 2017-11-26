module.exports = (app) => ({
    validate: (req, res, next) => {
        const jwt = require('jsonwebtoken')
        const User = app.models.user
        const token = req.headers['x-access-token']
        const key = require('../config/urls').token
        const Errors = require('../errors/system').token
        if (token) {
            try {
                const decoded = jwt.decode(token, key)
                if (decoded.exp <= Date.now() && req.user && decoded) {
                    res.status(400).json(Errors.expired)
                }
                User.findOne({token: token})
                    .then((user) => {
                        if (user) {
                            req.user = user
                            next()
                        } else {
                            res.status(500).json(Errors.notToken)
                        }
                    })
                    .catch((err) => {
                        res.status(500).json(Errors.notToken)
                    })
            } catch (err) {
                res.status(401).json(Errors.isInvalid)
            }
        } else {
            res.status(401).json(Errors.authenticate)
        }
    }
})
