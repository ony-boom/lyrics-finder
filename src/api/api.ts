import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const api = axios.create({
  baseURL: "https://spotify-scraper.p.rapidapi.com/v1/track/",
  headers: {
    "X-RapidAPI-key": apiKey,
    "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
  },
});

export default api;
