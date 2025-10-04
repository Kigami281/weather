// Import dependencies
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan("dev")); // logs requests

// API key & base URL (OpenWeatherMap free API)
const API_KEY = "8b15a60426aa4e306b44cbe7f673a5fd"; // get free from openweathermap.org
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Route: Home
app.get("/", (req, res) => {
  res.send("🌤️ Welcome to Tiny Weather API Server");
});

// Route: Get weather for a city
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = response.data;
    res.json({
      city: data.name,
      temperature: `${data.main.temp} °C`,
      condition: data.weather[0].description,
    });
  } catch (error) {
    res.status(404).json({ error: "City not found or API error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});