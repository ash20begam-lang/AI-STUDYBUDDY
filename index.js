require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/db");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));

app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/materials", require("./src/routes/materials"));
app.use("/api/admin", require("./src/routes/admin"));

app.get("/", (req, res) => res.json({ message: "AI StudyBuddy API is running" }));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);