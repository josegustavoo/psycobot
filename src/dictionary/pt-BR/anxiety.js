const anxiety = (manager) => {
	
	/* anxiety.iam */
	manager.addDocument('pt', 'Estou com ansiedade', 'anxiety.iam');
	
	manager.addAnswer('pt', 'anxiety.iam', 'Olá, tente relaxar, tente esqueçe tudo oque esta acontecendo com você de ruim, deixe so os pensamentos bons, escute uma musica que deixa feliz, faço algo que você se concentre apenas nas coisas boas da vida, resumindo tente relaxar.');
	manager.addAnswer('pt', 'anxiety.iam', 'Sinto muito que estejá com ansiedade. Tente fazer atividades como meditação, escutar uma musica.');
	manager.addAnswer('pt', 'anxiety.iam', 'Tente relaxar, respire bem fundo e inspiri bem lentamente, tenta, pode te ajudar 😉');
	
};

module.exports = anxiety;
