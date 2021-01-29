const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

// create new user
router.post("/", async (req, res, next) => {
  try {
    debugger;
    const user = await createUser(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// login router
router.post("/login", async (req, res, next) => {
  const body = req.body;
  try {
    const user = await loginUser(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// update User information
router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const user = await updateUser(id, body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// delete User account
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
