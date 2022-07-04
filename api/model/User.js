const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  fName: { type: String, required: [true, "provide first name"] },
  lName: { type: String, required: [true, "provide last name"] },
  email: {
    type: String,
    required: [true, "provide a valid email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  phoneNumber: { type: Number, required: [true, "provide phone number"] },
  role: { type: String, enum: ["administrator", "user"], default: "user" },
  password: {
    type: String,
    required: [true, "provide first name"],
    minLength: [8, "Password must be more than 8 charaters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "provide first name"],
    validate: {
      validator: function () {
        return item === this.password;
      },
      message: "Passwords do not match!",
    },
  },
  orders: [{ type: mongoose.SchemaTypes.ObjectId }, ref],
  active: { type: Boolean, default: true, select: false },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
