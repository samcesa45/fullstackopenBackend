const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
});

notesRouter.get('/', (req, res) => {
	Note.find({}).then((notes) => {
		res.json(notes);
	});
});

notesRouter.get('/:id', (req, res, next) => {
	// const id = Number(req.params.id);
	// Note.find((note) => note.id === id);
	// if (note) {
	// 	res.json(note);
	// } else {
	// 	res.status(404).end();
	// }

	Note.findById(req.params.id)
		.then((note) => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

// const generateId = () => {
// 	const maxId =
// 		notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
// 	return maxId + 1;
// };

notesRouter.post('/', (req, res, next) => {
	const body = req.body;

	const note = new Note({
		content: body.content,
		important: body.important || false,
		data: new Date(),
		// id: generateId(),
	});
	if (body.content === undefined) {
		return res.status(404).json({
			error: 'content missing',
		});
	}

	// notes = notes.concat(note);

	// res.json(note);
	note
		.save()
		.then((savedNote) => savedNote.toJSON())
		.then((savedAndFormattedNote) => {
			res.json(savedAndFormattedNote);
		})
		.catch((error) => next(error));
});

notesRouter.delete('/:id', (req, res, next) => {
	// const id = Number(req.params.id);
	// notes = notes.filter((note) => note.id !== id);
	// res.status(204).end();
	Note.findByIdAndRemove(req.params.id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

notesRouter.put('/:id', (req, res, next) => {
	const body = req.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(req.params.id, note, { new: true })
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((error) => next(error));
});

//this has to be the last loaded middleware
app.use(errorHandler);

module.exports = notesRouter;
