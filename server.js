require('dotenv').config();
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var app = express();
var Person = require('./models/persons');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('data', function (req) {
	if (req.method === 'POST') {
		return '' + JSON.stringify(req.body);
	} else {
		return '';
	}
});
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/', (req, res) => {
	res.send('<h1>Phonebook</h1>');
});

app.get('/info', (req, res) => {
	Person.find({}).then((p) => {
		res.send(`<p>Phonebook has info for ${p.length} people </p>
			<p>${new Date()}</p>
			`);
	});
});
app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then((persons) => {
			res.status(200).json(persons);
		})
		.catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((persons) => {
			res.json(persons);
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((persons) => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	if (!body.name) {
		res.status(400).json({
			error: 'name is missing',
		});
	}
	if (!body.number) {
		res.status(400).json({
			error: 'number is missing',
		});
	}

	Person.find({ number: body.number }).then((num) => {
		if (num.length !== 0) {
			res.status(400).json({
				error: 'number  must be unique',
			});
		}
	});

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((savedPerson) => savedPerson.toJSON())
		.then((savedAndFormatted) => {
			res.json(savedAndFormatted);
		})

		.catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;
	const person = {
		name: body.name,
		number: body.number,
	};
	Person.findByIdAndUpdate(req.params.id, person, {
		new: true,
		runValidators: true,
	})
		.then((updatedResult) => {
			res.json(updatedResult);
		})
		.catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
	if (req.name === 'CastError') {
		res.status(400).send({ error: 'malformatted id' });
	}
	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// require('dotenv').config();
// const express = require('express');
// const Person = require('./models/persons');
// const morgan = require('morgan');

// const app = express();
// app.use(express.json());
// app.use(express.static('build'));

// morgan.token('data', (req) => {
// 	if (req.method === 'POST') {
// 		return ' ' + JSON.stringify(req.body);
// 	} else {
// 		return ' ';
// 	}
// });
// app.use(
// 	morgan(':method :url :status :res[content-length] - :response-time ms :data')
// );

// // let persons = [
// // 	{ id: 1, name: 'Arto Hellas', number: '040-123456' },
// // 	{ id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
// // 	{ id: 3, name: 'Dan Abramov', number: '12-43-234345' },
// // 	{ id: 4, name: 'Mary', number: '39-23-6423122' },
// // ];

// // app.get('/info', (req, res) => {
// // 	const info = persons.length;
// // 	res.send(
// // 		`<p>Phonebook has info for ${info} people</p>
// // 		 <p>${new Date()}</p>`
// // 	);
// // });

// app.get('/api/persons', (req, res, next) => {
// 	Person.find({})
// 		.then((persons) => {
// 			res.json(persons);
// 		})
// 		.catch((error) => next(error));
// });

// app.get('/api/persons/:id', (req, res) => {
// 	// const id = Number(req.params.id);
// 	// const person = persons.find((person) => person.id === id);
// 	// if (person) {
// 	// 	res.json(person);
// 	// } else {
// 	// 	res.status(404).end();
// 	// }

// 	Person.findById(req.params.id).then((persons) => {
// 		res.json(persons);
// 	});
// });

// // const getPostId = () => {
// // 	const randomId =
// // 		persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
// // 	return Math.random(randomId) + 20;
// // };

// app.post('/api/persons', (req, res, next) => {
// 	const body = req.body;
// 	if (!body.number) {
// 		res.status(404).json({
// 			error: 'name or number is missing',
// 		});
// 	}

// 	const person = new Person({
// 		// id: getPostId(),
// 		name: body.name,
// 		number: body.number,
// 	});
// 	// const p = persons.find((person) => person.name === body.name);
// 	// if (p) {
// 	// 	res.status(404).json({
// 	// 		error: 'name must be unique',
// 	// 	});
// 	// } else {
// 	// 	persons = persons.concat(person);

// 	// 	res.json(person);
// 	// }

// 	person
// 		.save()
// 		.then((savePerson) => {
// 			res.json(savePerson);
// 		})
// 		.catch((error) => next(error));
// });

// app.delete('/api/persons/:id', (req, res, next) => {
// 	// const id = Number(req.params.id);
// 	// persons = persons.filter((person) => person.id !== id);
// 	// res.status(204).end();
// 	Person.findByIdAndRemove(req.params.id)
// 		.then((result) => {
// 			res.status(204).end();
// 		})
// 		.catch((error) => next(error));
// });

// // const errorHandler = (error, req, res, next) => {
// // 	if (error.name === 'CastError') {
// // 		res.status(400).send({ error: 'malformed id' });
// // 	}
// // 	next(error);
// // };

// // app.use(errorHandler);

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });
