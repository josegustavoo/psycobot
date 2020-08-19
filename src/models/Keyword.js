const mongoose = require('mongoose');

const KeywordSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model('Keyword', KeywordSchema);
