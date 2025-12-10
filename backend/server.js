import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Port environment se ya default 5000
const PORT = process.env.PORT || 5001;

// API key from .env
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  console.error("ERROR: UNSPLASH_ACCESS_KEY not set in .env");
  process.exit(1);
}

app.get("/", (req, res) => {
    res.send("Backend is running");
  });
  
// Search endpoint
app.get("/api/search", async (req, res) => {
  const keyword = req.query.q;
  const page = req.query.page || 1;

  if (!keyword) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per_page=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unsplash API returned status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch images from Unsplash" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
