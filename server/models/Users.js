const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	username: String,
	password: String,
	name: String,
	lastname: String,
	mail: String,
	age: Number
});

mongoose.model('users', userSchema);
