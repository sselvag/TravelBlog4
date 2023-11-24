const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//Update user info by ID
router.put("/:id", async (req, res) => {
  //Check if IDs match
  if (req.body.userId === req.params.id) {
    //Check if new password is provided
    if (req.body.password) {
      //Salting & Hashing password
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      //Find and update the usesr by their ID
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        //Return the updated user data (new: true)
        { new: true }
      );
      //Respond with successful update status and the updated user data
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
     //Deny access if IDs do not match
    res.status(401).json("You can update only your account!");
  }
});

//Get user info by ID
router.get("/:id", async (req, res) => {
  try {
    //Find the user by their ID
    const user = await User.findById(req.params.id);
    //Exclude the password field from the user data 
    const { password, ...others } = user._doc;
    //Respond with successful retrieval status and the user data
    res.status(200).json(others);
  } catch (err) {
    
    res.status(500).json(err);
  }
});

module.exports = router;
