const jwt = require('jsonwebtoken');

module.exports  = {
	async generateToken(user) {
		const data = {
			_id: user._id,
			name: user.name,
			email: user.email,
		}
		const secret = process.env.JWT_SECRET;
		
		return jwt.sign({ data }, secret);	
	}
};
