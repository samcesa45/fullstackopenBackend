const express = require('express');
const blogRouter = express.Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res, next) => {
	Blog.find({})
		.then((blogs) => {
			res.json(blogs);
		})
		.catch((error) => next(error));
});

blogRouter.post('/', (req, res, next) => {
	const body = req.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	blog
		.save()
		.then((savedResult) => {
			res.status(200).json(savedResult);
		})
		.catch((error) => next(error));
});

module.exports = blogRouter;
