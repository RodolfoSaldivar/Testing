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

userSchema.statics.getAll = function() {
	return this.find();
};

userSchema.statics.getById = function(_id) {
	return this.find({ _id });
};

userSchema.statics.getByMail = function(mail) {
	return this.find({ mail });
};

userSchema.statics.getByName = function(name) {
	return this.find({ name });
};

userSchema.statics.create = function(body) {
	const user = new this(body);
	return user.save();
};

userSchema.statics.update = function(_id, body) {
	return this.findOneAndUpdate({ _id }, body, { new: true }).exec();
};

userSchema.statics.delete = function(_id) {
	return this.deleteOne({ _id });
};

userSchema.statics.logError = (res, where, error) => {
	console.log(`User - ${where}: ${error}`);
	res.status(500).send({ message: 'Server Error.' });
};

mongoose.model('users', userSchema);
