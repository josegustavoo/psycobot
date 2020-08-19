const congratulations = (manager) => {
	
	/* congratulations.default */
	manager.addDocument('pt', 'Muito obrigado!', 'congratulations.default');
	manager.addDocument('pt', 'Obrigado por me ajudar!', 'congratulations.default');
	manager.addDocument('pt', 'Muito obrigada!', 'congratulations.default');
	manager.addDocument('pt', 'Obrigada por me ajudar!', 'congratulations.default');
	manager.addDocument('pt', 'Obrigada por mim ajudar!', 'congratulations.default');
	manager.addDocument('pt', 'Agredicido!', 'congratulations.default');
	manager.addDocument('pt', 'Agredicida!', 'congratulations.default');
	manager.addDocument('pt', 'Obrigado!', 'congratulations.default');
	manager.addDocument('pt', 'Obrigada!', 'congratulations.default');
	
	manager.addAnswer('pt', 'congratulations.default', 'Não a de quer.');
	manager.addAnswer('pt', 'congratulations.default', 'Owwwnn! 😍, por nada!');
	manager.addAnswer('pt', 'congratulations.default', 'Fico feliz que você gostou, estou a sua disposição.');
	manager.addAnswer('pt', 'congratulations.default', 'Por nada!!, estou aqui para tentar ajudar você.');
	
};

module.exports = congratulations;
