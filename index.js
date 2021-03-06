const app = require('./part4/app');
const http = require('http');
const logger = require('./part4/utils/logger');
const config = require('./part4/utils/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
