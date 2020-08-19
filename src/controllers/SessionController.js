const User = require('../models/User');
const authService = require('../tools/AuthService');

module.exports = {
	async show(req, reply) {
		reply.type('application/json').code(200);
		const { userId: id } = req;
		
		try {
			
			const user = await User.findById( id ).lean();
			
			if(user) {
				const token = await authService.generateToken(user);
				
				reply.header('Authorization', token);
				return {
					status: 200,
					data: {
						user,
						token
					}
				}
			} else {
				return { error: 'Account not found!' };
			}
			
		} catch(e) {
			console.log(e);
			return { error: 'an error has occurred' };
		}
		
	}
};
