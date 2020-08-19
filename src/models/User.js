const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		required: true,
		index: true,
	},
	picture: {
		type: String,
		default: 'default_picture.jpg',
		lowercase: true,
	},
	password: {
		type: String,
		select: false,
		minlength: 8,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	}
});

UserSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	
	next();
});

module.exports = mongoose.model('User', UserSchema);
