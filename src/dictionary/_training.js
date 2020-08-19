const trainPT = require('./pt-BR/_train');

const trainNLP = async (manager) => {
	trainPT(manager);
};

module.exports = trainNLP;
