const express = require("express");
const todo = require("./todo");
const user = require("./user");
const auth = require("../middleware/auth");

const router = express.Router();

router.use("/todo", auth, todo);
router.use("/user", user);

module.exports = router;
