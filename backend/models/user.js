const mongoose = require("mongoose");
const validator = require("validator");

const userSchma = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "pls enter your task"],
    maxLength: [30, "task cannot exceed 30 characters"],
  },
});
module.exports = mongoose.model("USer", userSchma);
