const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URL;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((result) => console.log('connected to db'))
	.catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
		unique: true,
	},
	number: {
		type: String,
		minlength: 8,
		unique: true,
		required: true,
	},
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject._v;
	},
});

personSchema.plugin(uniqueValidator, {
	message: 'Error, expected {PATH} to be unique',
});

module.exports = mongoose.model('Person', personSchema);
