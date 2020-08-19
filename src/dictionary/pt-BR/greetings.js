const greetings = (manager) => {
	
	/* greetings.hello */
	manager.addDocument('pt', 'Olá', 'greetings.hello');
	manager.addDocument('pt', 'Oi', 'greetings.hello');
	
	manager.addAnswer('pt', 'greetings.hello', 'Olá!');
	manager.addAnswer('pt', 'greetings.hello', 'Oi!');
	manager.addAnswer('pt', 'greetings.hello', 'Oi, em que posso te ajudar?');
	
	/* greetings.bye */
	
	manager.addDocument('pt', 'Tchau', 'greetings.bye');
	manager.addDocument('pt', 'Até logo', 'greetings.bye');
	manager.addDocument('pt', 'Adeus por agora', 'greetings.bye');
	manager.addDocument('pt', 'Xau', 'greetings.bye');
	
	manager.addAnswer('pt', 'greetings.bye', 'Tchau');
	manager.addAnswer('pt', 'greetings.bye', 'Até Logo!');
	manager.addAnswer('pt', 'greetings.bye', 'Se cuida!');
	manager.addAnswer('pt', 'greetings.bye', 'Tchau, estarei te esperando aqui!');
	manager.addAnswer('pt', 'greetings.bye', 'Tchau, se cuida!');
	
	
	/* greetings.see_you_soon */
	manager.addDocument('pt', 'Te vejo depois', 'greetings.see_you_soon');
	manager.addDocument('pt', 'Te vejo em breve', 'greetings.see_you_soon');
	manager.addDocument('pt', 'Te vejo mais tarde', 'greetings.see_you_soon');
	manager.addDocument('pt', 'Te vejo amanhã', 'greetings.see_you_soon');
	
	manager.addAnswer('pt', 'greetings.see_you_soon', 'Se cuida!');
	manager.addAnswer('pt', 'greetings.see_you_soon', 'Tchau, estarei te esperando aqui!');
	manager.addAnswer('pt', 'greetings.see_you_soon', 'Tchau, se cuida!');
	
};

module.exports = greetings;
