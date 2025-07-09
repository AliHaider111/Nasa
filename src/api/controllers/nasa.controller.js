const { apiHelper, sendResponse, mapEpicImages, getFormattedDate } = require("../utils/helper");
const { nasa_base_url } = require("../../config/vars");

/**
 * Fetches NASA's Astronomy Picture of the Day (APOD) for a given date.
 *
 * @param {Object} req - The Express request object, supports optional `date` query parameter (YYYY-MM-DD).
 * @param {Object} res - The Express response object used to return the APOD data.
 *
 * @async
 * @function
 * @throws {Error} Throws an error if the API call to NASA fails.
 *
 * @returns {Promise<void>}
 */
exports.getApod = async (req, res, next) => {
  try {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 9);
    const formattedStartDate = startDate.toISOString().split("T")[0];

    const response = await apiHelper({
      method: "get",
      url: `${nasa_base_url}/planetary/apod`,
      params: {
        api_key: process.env.NASA_API_KEY,
        start_date: formattedStartDate,
        end_date: endDate,
      },
    });
    sendResponse(res, response.data, "Apod fetched successfully!");
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves Mars Rover photos for a specified sol (Martian day), rover, and optional camera.
 *
 * @param {Object} req - The Express request object, supports `rover`, `sol`, and `camera` as query parameters.
 * @param {Object} res - The Express response object to send back the list of photos.
 *
 * @async
 * @function
 * @throws {Error} Throws an error if the API call fails or invalid parameters are provided.
 *
 * @returns {Promise<void>}
 */
exports.getMarsPhotos = async (req, res, next) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const earth_date = req.query.date || getFormattedDate(yesterday);
    const camera = req.query.camera;

    const response = await apiHelper({
      method: "get",
      url: `${nasa_base_url}/mars-photos/api/v1/rovers/curiosity/photos`,
      params: {
        api_key: process.env.NASA_API_KEY,
        earth_date,
        ...(camera && { camera }),
      },
    });
    sendResponse(res, response.data, "Mars Photos fetched successfully!");
  } catch (err) {
    next(err);
  }
};

/**
 * Fetches EPIC (Earth Polychromatic Imaging Camera) natural images for a given Earth date.
 *
 * @param {Object} req - The Express request object, supports `date` query parameter (YYYY-MM-DD).
 * @param {Object} res - The Express response object to send back the EPIC images.
 *
 * @async
 * @function
 * @throws {Error} Throws an error if the NASA EPIC API call fails.
 *
 * @returns {Promise<void>}
 */
exports.getEpicImages = async (req, res, next) => {
  try {
    const { type = "natural", date } = req.query;

    const endpoint = `${nasa_base_url}/EPIC/api/${type}${date ? `/date/${date}` : ""}`;

    const response = await apiHelper({
      method: "get",
      url: endpoint,
      params: {
        api_key: process.env.NASA_API_KEY,
      },
    });
    const data = mapEpicImages(response.data, type);

    sendResponse(res, data, "Epic Images fetched successfully!");
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves a list of near-earth objects (asteroids) from NASA's NeoWs feed between a start and end date.
 *
 * @param {Object} req - The Express request object. Supports `start_date` (required) and `end_date` (optional).
 * @param {Object} res - The Express response object to send back the list of near-earth objects.
 *
 * @async
 * @function
 * @throws {Error} Throws an error if the NeoWs API call fails.
 *
 * @returns {Promise<void>}
 */
exports.getNeoFeed = async (req, res, next) => {
  try {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    const response = await apiHelper({
      method: "get",
      url: `${nasa_base_url}/neo/rest/v1/feed`,
      params: {
        api_key: process.env.NASA_API_KEY,
        ...(start_date && { start_date }),
        ...(end_date && { end_date }),
      },
    });
    sendResponse(res, response.data, "Neo Feed fetched successfully!");
  } catch (err) {
    next(err);
  }
};
