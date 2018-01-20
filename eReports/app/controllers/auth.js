module.exports = app => (req, res) => {
  const User = app.models.user
  const jwt = require('jsonwebtoken')
  const pass = require('../middleware/password')

  const query = {
    $or: [{ username: req.body.username }, { email: req.body.email }]
  }

  User.findOne(query, { token: 0 })
    .exec()
    .then(user => {
      if (!user) {
        res.status(401).json({ success: false, message: 'Invalid login' })
      } else {
        const obj = user.toObject()
        delete obj.password

        if (!pass.validate(user.password, req.body.password)) {
          res.status(401).json({ success: false, message: 'Invalid password' })
        } else {

          const expire = new Date()
          expire.setDate(expire.getDate() + 5)
          const time = expire.getTime()
          
          console.log('Expire: ', time)

          const token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: '7d',
            algorithm: 'HS512'
          })

          User.update({ _id: user._id }, { $set: { token: token } })
            .then(us => {
              res.json({
                success: true,
                message: 'Token Ativado',
                token: token,
                user: obj
              })
            })
            .catch(err => {
              console.log('Deu erro')
              throw err
            })
        }
      }
    })
    .catch(err => {
      console.log('Deu erro')
      throw err
    })
}
