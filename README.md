
# 🚀 NASA Data Explorer API

This project is a Node.js backend service that integrates with NASA's public APIs, allowing users to explore astronomy data, Mars rover photos, Earth imagery, asteroid information, and NASA's media library. It uses Express.js and Axios, with clean structure and proper error handling.

---

## 📁 Features

- 🔭 **Astronomy Picture of the Day (APOD)**
- 🚗 **Mars Rover Photos**
- 🌍 **Earth Polychromatic Imaging Camera (EPIC)**
- ☄️ **Near Earth Object Web Service (NeoWs)**

---

## ⚙️ Technologies Used

- **Node.js** (v18+ recommended)
- **Express.js**
- **Axios** (for HTTP requests)
- **Winston** (logging)
- **Mongoose** (MongoDB connection, if used for extension)
- **dotenv-safe** (env management and validation)
- **Helmet, Cors, Compression** (for security and performance)
- **Rate Limiting** (basic protection against abuse)

---

## 📦 Project Structure

├── src
│ ├── api
│ │ ├── controllers # Route handlers for NASA APIs
│ │ ├── middlewares # Error handling
│ │ ├── routes
│ │ │ └── v1
│ │ │ ├── index.js
│ │ │ └── nasa.route.js
│ │ └── utils # Reusable helpers like apiHelper
│ ├── config # Environment, logger, mongoose
│ └── server.js # Main server entry
├── .env
└── README.md


---

## 🔑 Environment Variables

Create a `.env` file in the root folder. Example values:


---

## 📡 Available API Endpoints

Base URL: `/v1/nasa`

| Endpoint             | Description                                   | Query Params                       |
|----------------------|-----------------------------------------------|------------------------------------|
| `/apod`              | Astronomy Picture of the Day                  | `date=YYYY-MM-DD`                 |
| `/mars-photos`       | Mars rover images                             | `rover`, `sol`, `camera`          |
| `/epic`              | Earth images from EPIC                        | `date=YYYY-MM-DD`                 |
| `/neo-feed`          | Near-Earth Object data                        | `start_date`, `end_date`          |

---

## 🧪 How to Run

1. **Install dependencies**  
   npm install

2. **Start the server**  
   npm run dev

3. **Start the server**  
   http://localhost:4000/v1/nasa/...

📌 Notes
Make sure your NASA API Key is valid. You can get one here: https://api.nasa.gov/

Rate limiting is applied globally and specifically on the login route.



📂 **Logging** 

.Development: logs to console using morgan('dev') and winston
.Production: can be configured to write to files (optional)

✅ **TODO / Extendable Ideas** 

.Add frontend to visualize responses (e.g., React dashboard)

.Add Swagger or Postman documentation

.Add MongoDB persistence (optional)

.Add caching layer (e.g., Redis)



📂 **Logging** 

.Development: logs to console using morgan('dev') and winston
.Production: can be configured to write to files (optional)



👨‍💻 **Author**
Built by [Arham Irfan] – for demo and educational purposes.



📃 **License**

MIT License – free to use, modify, and distribute.

