const mongoose = require('mongoose');

const server = require('./bin/server');
const routes = require('./routes');
const Bot = require('./bot');

const bot = new Bot(['pt'], 'pt');

async function startServer() {
	await server.addRoutes(routes);
	await server.startServer();
	
	mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
}

async function trainAndSave() {
	await bot.trainBot();
	bot.saveModel('./model.nlp');
	
	server.addGlobalVariable('bot', bot);
}

(async () => {
	await trainAndSave();
	await startServer();
})();

