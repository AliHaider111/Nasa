const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const error = require('../api/middlewares/error');

const app = express();
const server = http.createServer(app);

// Logging requests
app.use(morgan(logs));

// Parse incoming requests
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Enable gzip compression
app.use(compress());

// Support for PUT/DELETE from forms
app.use(methodOverride());

// Set secure HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Global rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Specific rate limiter for login route
const limiterLogin = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts, please try again later.',
  skip: (req) => req.method !== 'POST',
});

app.use('/v1/users/:userId?', limiterLogin);
app.use(limiter);

// Mount versioned API routes
app.use('/v1', routes);

// Error handling middleware
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = server;
