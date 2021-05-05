const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
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
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Blog', blogSchema);
