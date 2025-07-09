const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [],
});

// Add console logging in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Stream support for morgan logging
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
