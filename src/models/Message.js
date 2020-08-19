const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	fromBot: {
		type: Boolean,
		required: true,
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	message: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model('Message', MessageSchema);
