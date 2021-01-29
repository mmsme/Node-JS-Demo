const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 150,
  },
  status: {
    type: String,
    enum: ["new", "in progress", "done"],
    default: "new",
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: Date,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const todoModel = mongoose.model("Todo", todoSchema);
module.exports = todoModel;
