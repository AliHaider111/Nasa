const express = require('express');
const nasaRoutes = require('./nasa.route');

const router = express.Router();

/**
 * Mounts NASA-related API routes at /nasa.
 *
 * @module routes/index
 * @example
 * GET /nasa/apod
 * GET /nasa/mars-photos
 */
router.use('/nasa', nasaRoutes);

module.exports = router;
