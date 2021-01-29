const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getSpecificTodo,
  updateSpecificTodo,
  deleteSpecificTodo,
} = require("../controller/todo");

router.get("/", async (req, res) => {
  const id = req.user.id;
  try {
    const todos = await getAllTodos({ userId: id });
    res.json(todos);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todos = await getSpecificTodo(id);
    res.json(todos);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const id = req.user.id;
  try {
    const todo = await createTodo({ ...body, userId: id });
    res.json(todo);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const todos = await updateSpecificTodo(id, body);
    res.json(todos);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const todos = await deleteSpecificTodo(id);
    res.json(todos);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
