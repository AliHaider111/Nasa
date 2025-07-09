/**
 * Custom base error class extending the native Error.
 * Useful for consistent API error handling.
 *
 * @class ExtendableError
 * @extends Error
 *
 * @param {Object} options - Error config.
 * @param {string} options.message - Error message.
 * @param {Array|Object} [options.errors] - Optional details (e.g. validation errors).
 * @param {number} options.status - HTTP status code.
 * @param {boolean} [options.isPublic=false] - Show message to client if true.
 * @param {string} [options.stack] - Optional custom stack trace.
 */

class ExtendableError extends Error {
  constructor({
    message,
    errors,
    status,
    isPublic,
    stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
  }
}

module.exports = ExtendableError;
