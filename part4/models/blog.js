const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	url: { type: String, required: true },
	likes: { type: Number, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

// const blog = new Blog({
// 	title: 'HTML is Easy',
// 	author: 'Richard Bestman',
// 	url: 'https://google.com',
// 	likes: 1,
// });

// blog.save().then((result) => {
// 	console.log('note saved!');
// 	mongoose.connection.close();
// });

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject._id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Blog', blogSchema);
