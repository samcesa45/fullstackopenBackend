const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/user');
const blogRouter = express.Router();
const Blog = require('../models/blog');
const blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	res.json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if (blog) {
		res.json(blog);
	} else {
		res.status(404).end();
	}
});

// const getTokenFrom = (req) => {
// 	const authorization = req.get('authorization');
// 	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
// 		return authorization.substring(7);
// 	}
// 	return null;
// };

blogRouter.post('/', async (req, res) => {
	const body = req.body;

	if (body.title === undefined || body.url === undefined) {
		return res.status(400).end();
	}

	const decodedToken = jwt.verify(req.token, process.env.SECRET);

	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	res.status(200).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET);

	if (!req.token || !decodedToken) {
		return res.status(401).json({
			error: 'token missing or invalid',
		});
	}
	const blog = await Blog.findByIdAndRemove(req.params.id);
	if (blog.user.toString() === decodedToken.id.toString()) {
		await blog.remove();
		res.status(204).end();
	} else {
		res.status(401).end();
	}
});

blogRouter.put('/:id', async (req, res) => {
	const body = req.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog);

	res.json(updatedBlog);
});
module.exports = blogRouter;
