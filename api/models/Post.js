const mongoose = require("mongoose");

// Defining a Mongoose schema for Posts
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);