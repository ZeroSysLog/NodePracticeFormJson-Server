﻿const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/data", async (_req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/data`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.post("/data", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const response = await axios.post(`${JSON_SERVER_URL}/data`, { name, email, age });
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error posting data:", error);
    res.status(500).json({ error: "An error occurred while posting data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));