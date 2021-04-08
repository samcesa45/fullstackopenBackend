const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

morgan.token('data', (req) => {
	if (req.method === 'POST') {
		return ' ' + JSON.stringify(req.body);
	} else {
		return ' ';
	}
});
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

let persons = [
	{ id: 1, name: 'Arto Hellas', number: '040-123456' },
	{ id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
	{ id: 3, name: 'Dan Abramov', number: '12-43-234345' },
	{ id: 4, name: 'Mary', number: '39-23-6423122' },
];

app.get('/info', (req, res) => {
	const info = persons.length;
	res.send(
		`<p>Phonebook has info for ${info} people</p> 
		 <p>${new Date()}</p>`
	);
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

const getPostId = () => {
	const randomId =
		persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
	return Math.random(randomId) + 20;
};

app.post('/api/persons', (req, res) => {
	const body = req.body;
	if (!body.number || !body.name) {
		res.status(404).json({
			error: 'name or number is missing',
		});
	}

	const person = {
		id: getPostId(),
		name: body.name,
		number: body.number,
	};
	const p = persons.find((person) => person.name === body.name);
	if (p) {
		res.status(404).json({
			error: 'name must be unique',
		});
	} else {
		persons = persons.concat(person);

		res.json(person);
	}
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter((person) => person.id !== id);
	res.status(204).end();
});

const PORT = 4001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
