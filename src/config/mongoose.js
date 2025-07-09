const mongoose = require('mongoose');
const logger = require('./logger');
const { mongo, env } = require('./vars');

// Use native ES6 Promises with Mongoose
mongoose.Promise = Promise;

// Log MongoDB connection errors and exit process
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// Enable query debug logging in development
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to MongoDB
 *
 * @returns {object} Mongoose connection
 */
exports.connect = () => {
  mongoose.connect(mongo.uri, {
    useCreateIndex: true,
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(() => console.log('MongoDB connected...'));

  return mongoose.connection;
};
