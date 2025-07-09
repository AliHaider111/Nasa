/**
 * NASA API Routes
 *
 * This file defines route endpoints for accessing various NASA public APIs.
 * It includes handlers for:
 *  - Astronomy Picture of the Day (APOD)
 *  - Mars Rover Photos
 *  - Earth Polychromatic Imaging Camera (EPIC)
 *  - Near Earth Object Web Service (NeoWs)
 *  - NASA Image and Video Library
 *
 * Each route maps to its corresponding controller method in nasa.controller.js
 *
 * @module routes/nasa.route
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/nasa.controller');

router.get('/apod', controller.getApod);
router.get('/mars-photos', controller.getMarsPhotos);
router.get('/epic', controller.getEpicImages);
router.get('/neo-feed', controller.getNeoFeed);

module.exports = router;
