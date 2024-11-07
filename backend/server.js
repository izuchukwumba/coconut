const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./authentication/auth_routes");
const colleges = require("./data/extract_college_data.js");

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/data", colleges);

app.listen(PORT, () => [console.log("Server is running on port ", PORT)]);
