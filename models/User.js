const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { delete } = require("../routes/user");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 150,
      minLength: 8,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    dob: {
      type: Number,
      optional: true,
      minLength: 13,
    },
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  if (!this._update.password) {
    return;
  }
  this._update.password = bcrypt.hashSync(this._update.password, 8);
  next();
});

// check password of user
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
