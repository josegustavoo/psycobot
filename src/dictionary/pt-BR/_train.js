const greetings = require('./greetings');
const questions = require('./questions');
const anxiety = require('./anxiety');
const congratulations = require('./congratulations');
const happy = require('./happy');

const train = async (manager) => {
	greetings(manager);
	questions(manager);
	
	anxiety(manager);
	congratulations(manager);
	happy(manager);
	
};

module.exports = train;
