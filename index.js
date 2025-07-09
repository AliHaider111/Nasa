// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./src/config/vars');
const logger = require('./src/config/logger');
const server = require('./src/config/express');
const mongoose = require('./src/config/mongoose');

// open mongoose connection
// mongoose.connect();

server.listen(port || 4000, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = server;
