module.exports = app => {
		function validate(req, res, next) {

		const jwt = require('jsonwebtoken');
		const User = app.models.user;

		const token = req.headers['x-access-token'];
		const login = req.body.login;

		const query = {
        	token: token,
			isAdmin: true
		}
		if (token) {
		try {
			const decoded = jwt.decode(token, app.get('superSecret'));

			if (decoded.exp <= Date.now() && req.user && decoded) {
			res.status(400).json({ error: 'Access Expired, please sign in again' });
			}
			User.findOne(query)
			.then((user) => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(500).json({ message: 'Error fetching token User.' });
			}
			})
			.catch((err) => {
			res.status(500).json({ message: 'Error fetching token User.' });
			});
		} catch (err) {
			res.status(401).json({ message: 'Error: Your token is invalid' });
		}
		} else {
			res.status(401).json({ message: 'Error: Authentication not found' });
		}
	}
	return validate;
}
