const jwt = require('jsonwebtoken');
const express = require('express');
const blogRouter = express.Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(blogs.map((b) => b.toJSON()));
});

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		return authorization.substring(7);
	}
	return null;
};

blogRouter.post('/', async (request, response) => {
	const body = request.body;

	if (!body.title || !body.url) {
		return response.status(400).end();
	}
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, process.env.SECRET);

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id,
	});

	console.log(blog);

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	response.status(200).json(savedBlog.toJSON());
});

blogRouter.put('/:id', async (request, response) => {
	const body = request.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});

	response.json(updatedBlog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, process.env.SECRET);

	if (!token || !decodedToken.id) {
		return response.status(401).json({
			error: 'token missing or invalid',
		});
	}
	const blog = await Blog.findByIdAndRemove(request.params.id);
	if (blog.user.toString() === decodedToken.id.toString()) {
		await blog.remove();
		response.status(204).end();
	} else {
		response.status(401).end();
	}
});
module.exports = blogRouter;
