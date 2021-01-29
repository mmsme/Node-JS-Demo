const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const asyncSign = promisify(jwt.sign);

const getAllUsers = () => User.find({}).exec();

// create new user with function create
const createUser = (user) => User.create(user);

// login user with findOne function
const loginUser = async ({ username, password }) => {
  // search for user by username
  const user = await User.findOne({ username }).exec();

  // check if user is Authenticated
  if (!user) {
    throw Error("UN_AUTHENTICATED");
  }

  // check if password is correct or not
  const validPassword = await user.validatePassword(password);
  if (!validPassword) {
    throw Error("UN_AUTHENTICATED");
  }

  const token = await asyncSign(
    {
      username: user.username,
      id: user.id,
    },
    "el7ag_Faso",
    { expiresIn: "1d" }
  );

  console.log(token);

  return { ...user.toJSON(), token };
};

// find user by id and update user with findByIdAndUpdate function
const updateUser = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true }).exec();

// find user by id and delete User with findByIdAndDelete function
const deleteUser = (id) => User.findByIdAndDelete(id).exec();

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
