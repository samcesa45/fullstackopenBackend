const jwt = require('jsonwebtoken');
const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

// notesRouter.get('/', (req, res) => {
// 	res.send('<h1>Hello world</h1>');
// });

notesRouter.get('/', async (req, res) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
	res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
	// const id = Number(req.params.id);
	// Note.find((note) => note.id === id);
	// if (note) {
	// 	res.json(note);
	// } else {
	// 	res.status(404).end();
	// }

	const note = await Note.findById(req.params.id);
	if (note) {
		res.json(note);
	} else {
		res.status(404).end();
	}
});

// const generateId = () => {
// 	const maxId =
// 		notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
// 	return maxId + 1;
// };

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		return authorization.substring(7);
	}
	return null;
};

notesRouter.post('/', async (req, res) => {
	const body = req.body;

	const token = getTokenFrom(req);
	const decodedToken = jwt.verify(token, process.env.SECRET);

	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(decodedToken.id);

	const note = new Note({
		content: body.content,
		important: body.important === undefined ? false : body.important,
		date: new Date(),
		user: user._id,
	});

	const savedNote = await note.save();
	user.notes = user.notes.concat(savedNote._id);
	await user.save();

	res.json(savedNote);
});
// The 'magic' of the library allows us to eliminate the try-catch blocks completely. For example the route for deleting a note
notesRouter.delete('/:id', async (req, res) => {
	// const id = Number(req.params.id);
	// notes = notes.filter((note) => note.id !== id);
	// res.status(204).end();
	await Note.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

notesRouter.put('/:id', async (req, res) => {
	const body = req.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
		new: true,
	});

	res.json(updatedNote);
});

module.exports = notesRouter;
