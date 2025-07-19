const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/database");

dotenv.config();
connectDB();

const app = express();

app.use(cors(
    {
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }
));

app.use(express.json());

const routes = require("./src/routes");
app.use("/api", routes);

module.exports = app;
