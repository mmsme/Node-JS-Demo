const Todo = require("../models/Todo");

// creat new todo with mongoose func craet wich take input todo
const createTodo = (todo) => Todo.create(todo);

// get all todos with find function
const getAllTodos = (id) => Todo.find(id).exec();

// get specific todo with findById
const getSpecificTodo = (id) => Todo.findById(id).exec();

// get specific todo with id and update with findOneAndUpdate
const updateSpecificTodo = (id, body) =>
  Todo.findByIdAndUpdate(id, body, { new: true }).exec();

// delete specific todo with findOneAndRemove
const deleteSpecificTodo = (id) => Todo.findByIdAndDelete(id).exec();

module.exports = {
  createTodo,
  getAllTodos,
  getSpecificTodo,
  updateSpecificTodo,
  deleteSpecificTodo,
};
