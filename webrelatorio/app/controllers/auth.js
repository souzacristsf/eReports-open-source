module.exports = app => (req, res) =>  {
    const User = app.models.user;
	const jwt  	=  require('jsonwebtoken')
    const pass = require('../middleware/password')

    const query = {
        $or: [ {login: req.body.login}, {email: req.body.login} ]
    }

    User.findOne(query,{token: 0})
	.exec()
	.then((user)=>{
		if (!user) {
			res.status(401).json({ success: false, message: 'Invalid login' });
		} else if (user) {
			const obj = user.toObject()
			delete obj.password
			if(!pass.validate(user.password, req.body.password)) {
				res.status(401).json({ success: false, message: 'Invalid password' });
			} else {
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn : new Date().setHours(new Date().getHours() + 5)
				});	

				User.update({_id: user._id},{$set:{token: token}}).then((us)=>{
					res.json({
						success: true,
						message: 'Token Ativado',
						token: token,
						user: obj
					});
				}).catch((err)=>{
					throw err;
				});
			};
		};
	})
	.catch((err)=> {throw err});
}