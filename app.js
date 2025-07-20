const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/database");

dotenv.config();
connectDB();
require("./src/models");

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
}));

app.use(express.json());

const routes = require("./src/routes");
app.use("/api", routes);

module.exports = app;
