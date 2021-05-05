const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const {
	errorHandler,
	requestLogger,
	unknownEndpoint,
} = require('./utils/middleware');
const mongoose = require('mongoose');

const loginRouter = require('./controllers/login');
const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

mongoose
	.connect(config.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		logger.info('connected to mongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to mongoDB:', error.message);
	});

app.use(cors());
// app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);
// app.use(tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);
if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

module.exports = app;
