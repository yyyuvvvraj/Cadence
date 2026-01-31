const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    provider: String,
    providerId: String,
    avatar: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
