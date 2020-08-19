const questions = (manager) => {
	
	/* questions.name */
	manager.addDocument('pt', 'Qual seu nome?', 'greetings.name');
	manager.addDocument('pt', 'Qual o seu nome?', 'greetings.name');
	
	manager.addAnswer('pt', 'greetings.name', 'Olá, meu nome é Laura');
	manager.addAnswer('pt', 'greetings.name', 'Olá, me chamo Laura');
	manager.addAnswer('pt', 'greetings.name', 'Oi, pode me chamar de Laura');
	
};

module.exports = questions;
