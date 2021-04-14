const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
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
		delete returnedObject._v;
	},
});

module.exports = mongoose.model('blog', blogSchema);
