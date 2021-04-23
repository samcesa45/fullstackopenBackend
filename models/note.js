const mongoose = require('mongoose');

//DO NOT SAVE YOUR PASSWORD TO GITHUB!!

const url = process.env.MONGODB_URL;

console.log('connecting to', url);

mongoose
	.connect(url, {
		useUnifiedTopology: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then((result) => {
		console.log('connected to db');
	})
	.catch((err) => console.log(err));

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minlength: 5,
		required: true,
	},
	date: Date,
	importance: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Note', noteSchema);
