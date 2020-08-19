const { Recognizer, Language, NlpManager } = require('node-nlp');

const trainingNLP = require('./dictionary/_training');
const encryption = require('./tools/encryption');

const THRESHOLD = 0.7;
let incrementIdConversation = true;
let idConversation = 0;


const Bot = class {
	
	constructor(lang, fallbackLang) {
		this.recognizer = new Recognizer();
		this.languageGuess = new Language();
		this.languages = lang;
		this.manager = this.recognizer.nlpManager;
		this.manager.addLanguage(lang);
		this.fallbackLocale = fallbackLang;
		
		console.log('Bot started!');
	}
	
	async trainBot() {
		console.log('Training bot...');
		
		await trainingNLP(this.manager);
		await this.manager.train();
		
		console.log('Bot trained!');
	}
	
	saveModel(filename) {
		this.manager.save(filename);
		console.log('Model saved!');
	}
	
	loadModel(filename) {
		if(fs.existsSync(filename)) {
			console.log('Model loaded from disk!');
			this.manager.load(filename);
		} else {
			console.log('Model not found!');
		}
	}
	
	async sendAnswer(query) {
		const message = this.buildMessage(query);
		var result = await this.recognizer.recognize(message);
		
		incrementIdConversation = !(result && result.slotFill);
		
		const answer = result.score > THRESHOLD && result.answer ? result.answer : 'Desculpe, não entendi!';
		
		const answerEncrypt = await encryption.encrypt(answer);
		
		return {
			locale: result.locale,
			score: result.score,
			message: answerEncrypt,
		}
		
	}
	
	
	buildMessage(query) {
		if (incrementIdConversation === true) idConversation++;
		return {
			locale: this.fallbackLocale,
			message: {
				address: {
					conversation: {
						id: 'conversation_' + idConversation
					}
				},
				text: query
			}
		};
	}
	
}

module.exports = Bot;
