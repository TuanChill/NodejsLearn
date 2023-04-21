const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const mongoDB = require("../helpers/connectDB_mongo");

const { Schema, model } = mongoose;

// define the schema object for user
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, default: null },
  birthday: { type: Date, default: null },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

const User = mongoDB.model("user", userSchema);

module.exports = User;
