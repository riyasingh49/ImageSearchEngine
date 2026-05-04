import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/search", async (req, res) => {
  const keyword = req.query.q;
  const page = req.query.page || 1;

  if (!keyword) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  if (!ACCESS_KEY) {
    return res.status(500).json({ error: "Unsplash API key not configured" });
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=12&client_id=${ACCESS_KEY}`;

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
