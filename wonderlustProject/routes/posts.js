const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//Create a new post
router.post("/", async (req, res) => {
  //Create a new post instance based on the request body
  const newPost = new Post(req.body);
  try {
    //Save the new post to the db
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updated a post by ID
router.put("/:id", async (req, res) => {
  try {
    //Find the post by ID
    const post = await Post.findById(req.params.id);
    //Check if the post's username matches the request's username
    if (post.username === req.body.username) {
      try {
        //Update the post witht he request body's data
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      //Deny access if the username does not match
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    //Find the post by ID
    const post = await Post.findById(req.params.id);
    //Check if the post's username matches the request's username
    if (post.username === req.body.username) {
      try {
        //Delete post from db
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      //Deny access if the username does not match
      res.status(401).json("You can only delete your posts!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a post by ID
router.get("/:id", async (req, res) => {
  try {
    //Find the post by ID
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all posts or posts by a specific user
router.get("/", async (req, res) => {
  //Extract the "user" query parameter from the request
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      //If a username is provided in the query, find posts by that user
      posts = await Post.find({ username });
    } else {
      //If no username is provided, find all posts
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
