const User = require("../models/user.js");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncerrors");

exports.allUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.newUser = catchAsyncError(async (req, res, next) => {
  const { task } = req.body;
  const user = await User.create({
    task,
  });
  res.json({
    success: true,
    message: "user created successfully",
    user,
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  const newData = {
    task: req.body.task,
  };
  user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
  });
});
