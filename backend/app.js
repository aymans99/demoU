const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");
const user = require("./routes/user");
app.use(cors());
app.use(express.json());
app.use("/api/v1", user);

module.exports = app;
