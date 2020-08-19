const bcrypt = require('bcryptjs');

const User = require('../models/User');
const authService = require('../tools/AuthService');

const i18n = require('../i18n');

module.exports = {
	async show(req, reply) {
		reply.type('application/json').code(200);
		const { email, password } = req.body;
		
		const language = req.headers['accept-language'];
		const lang = new i18n(language ? language : 'en');
		
		const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
		
		try {
			
			if(!tester.test(email)) {
				const title = lang.t('errorEmailMalformatted.title');
				const text = lang.t('errorEmailMalformatted.text');
				
				return {
					success: false,
					error:{
						title,
						text
					}
				};
			}
			
			const user = await User.findOne( { email } ).select('+password').lean();
			
			if(user) {
				if(!await bcrypt.compare(password, user.password)) {
					const title = lang.t('errorInvalidPassword.title');
					const text = lang.t('errorInvalidPassword.text');
					
					return {
						success: false,
						error: {
							title,
							text
						}
					};
				}
				
				user.password = undefined;
				
				const token = await authService.generateToken(user);
				
				reply.header('Authorization', token);
				
				return {
					success: true,
					status: 200,
					data: {
						user,
						token
					}
				}
			} else {		
				const title = lang.t('errorAccountNotFound.title');
				const text = lang.t('errorAccountNotFound.text');
				
				return {
					success: false,
					error: {
						title,
						text
					}
				};
			}
			
		} catch(e) {
			console.log(e);
			
			const title = lang.t('errorOccurred.title');
			const text = lang.t('errorOccurred.text');
			
			return {
				success: false,
				error: {
					title,
					text
				}
			};
		}
		
	},
	async store(req, reply) {
		reply.type('application/json').code(200);
		const { name, email, password } = req.body;
		
		const language = req.headers['accept-language'];
		const lang = new i18n(language ? language : 'en');
		
		const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
		
		try {
			if(password.length < 8) {
				const title = lang.t('errorPasswordShort.title');
				const text = lang.t('errorPasswordShort.text');
				
				return {
					success: false,
					error:{
						title,
						text
					}
				};
			}
			
			if(!tester.test(email)) {
				const title = lang.t('errorEmailMalformatted.title');
				const text = lang.t('errorEmailMalformatted.text');
				
				return {
					success: false,
					error:{
						title,
						text
					}
				};
			}
			
			let user = await User.findOne( { email } ).lean();
			if(!user) {
				
				user = await User.create( { name, email, password } );
				if(user) {
					
					const token = await authService.generateToken(user);
								
					reply.header('Authorization', token);
					
					return {
						success: true,
						status: 200,
						data: {
							user,
							token
						}
					};
				} else {
					const title = lang.t('errorOccurred.title');
					const text = lang.t('errorOccurred.text');
					
					return {
						success: false,
						error: {
							title,
							text
						}
					};
				}
				
			} else {
				const title = lang.t('errorEmailInUse.title');
				const text = lang.t('errorEmailInUse.text');
				
				return {
					success: false,
					error:{
						title,
						text
					}
				};
			}
			
		} catch(e) {
			console.log(e);
			const title = lang.t('errorOccurred.title');
			const text = lang.t('errorOccurred.text');
			
			return {
				success: false,
				error: {
					title,
					text
				}
			};
		}
	},
};
