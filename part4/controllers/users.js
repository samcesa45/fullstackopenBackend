const bcrypt = require('bcrypt');
const express = require('express');

const usersRouter = express.Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		author: 1,
		title: 1,
		url: 1,
	});
	res.json(users.map((u) => u.toJSON()));
});

usersRouter.post('/', async (req, res) => {
	const body = req.body;

	if (!body.password || body.password.length < 3) {
		return res.status(400).json({ error: 'password is too short or missing' });
	}

	const salt = await bcrypt.genSalt();

	const passwordHash = await bcrypt.hash(body.password, salt);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	});

	const savedUser = await user.save();

	res.json(savedUser);
});

module.exports = usersRouter;
