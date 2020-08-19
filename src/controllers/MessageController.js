const moment = require('moment');

const User = require('../models/User');
const Message = require('../models/Message');
const encryption = require('../tools/encryption');

const i18n = require('../i18n');

module.exports = {
	async index(req, reply) {
		reply.type('application/json').code(200);
		const { userId } = req;
		var { page } = req.params;
		
		page = (page && page > 0 ? parseInt(page) : 1);
		const itemsPerPage = 50;
		
		const language = req.headers['accept-language'];
		const lang = new i18n(language ? language : 'en');
		
		try {
			
			if(!userId) {
				const title = lang.t('errorAcessDenied.title');
				const text = lang.t('errorAccessDenied.text');
				
				return {
					success: false,
					status: 401,
					error: {
						title,
						text
					}
				};
			}
			
			const user = await User.countDocuments({ _id: userId }).lean();
			
			if(user == 0) {
				const title = lang.t('errorAcessDenied.title');
				const text = lang.t('errorAccessDenied.text');
					
				return {
					success: false,
					status: 401,
					error: {
						title,
						text
					}
				};
			}
			
			const countMessages = await Message.estimatedDocumentCount({ $or: [
				{ to: userId },
				{ from: userId }
			] }).lean();
			
			let totalPages = Math.ceil((countMessages / itemsPerPage));
			
			var messages = [];
			
			if(page <= totalPages) {
				messages = await Message.find({ $or: [
					{ to: userId },
					{ from: userId }
				] })
				.select([ '-to','-from','-__v' ])
				.limit(itemsPerPage)
				.skip(itemsPerPage * (page - 1))
				.sort({ '_id': -1 }).lean();
				
				await Promise.all(messages.map(async item => {		
					item.message = await encryption.decryptDB(item.message);
				}));
			}
			
			if( messages.length == 0 ) {
				const welcomeText = await encryption.encrypt("Olá, tudo bem?, me chamo Laura e serei sua psicóloga virtual, quando quiser inciar, so enviar uma mensagem. 😉");
			
				const dateNow = new Date();
				const date = moment(dateNow).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
			
				messages.unshift({
					_id: '1',
					fromBot: true,
					message: welcomeText,
					created_at: date,
				});
				
				if(totalPages == 0) totalPages = 1;
			}
			
			return {
				success: true,
				status: 200,
				data: {
					userId,
					countMessages,
					totalPages,
					messages,
				}
			};
			
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
		
		const language = req.headers['accept-language'];
		const lang = new i18n(language ? language : 'en');
		
		const session = await Message.startSession();
		session.startTransaction();
		
		try {
			const { userId } = req;
			const { messageText, fromBot, date } = req.body;
			
			if(!userId) {
				const title = lang.t('errorAcessDenied.title');
				const text = lang.t('errorAccessDenied.text');
				
				return {
					success: false,
					status: 401,
					error: {
						title,
						text
					}
				};
			}
			
			const user = User.countDocuments({ _id: userId }).lean();
			
			if(user == 0) {
				const title = lang.t('errorAcessDenied.title');
				const text = lang.t('errorAccessDenied.text');
					
				return {
					success: false,
					status: 401,
					error: {
						title,
						text
					}
				};
			}
					
			const messageDecrypted = await encryption.decrypt(messageText);
			
			const answer = await req.bot.sendAnswer(messageDecrypted);
			
			const msgEncrypted = await encryption.encryptDB(messageText);
			const answerEncrypted = await encryption.encryptDB(answer.message);
			
			var sendedDate = Date.parse(date);
			var botDate = Date.now();
			
			const messageOfUser = await Message({
				fromBot: false,
				from: userId,
				message: msgEncrypted,
				created_at: sendedDate
			}).save({ session });
			
			const messageOfBot = await Message({
				fromBot: true,
				to: userId,
				message:answerEncrypted,
				created_at: botDate,
			}).save({ session });
			
			await session.commitTransaction();
			session.endSession();
			
			const { _id, created_at } = messageOfBot;
			
			return {
				success: true,
				status: 200,
				data: {
					_id,
					created_at,
					fromBot: true,
					answer,
				}
			};
			
			
		} catch(e) {
			console.log(e);
			
			await session.abortTransaction();
			session.endSession();
			
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
		
	}
};
