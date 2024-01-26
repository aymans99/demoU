const express = require("express");
const router = express.Router();

const {
  newUser,
  updateUser,
  deleteUser,
  allUser,
} = require("../controllers/userController");

router.route("/new").post(newUser);
router.route("/all").get(allUser);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
