const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//Route for user registration
router.post("/register", async (req, res) => {
  try {
    //Salting password
    const salt = await bcrypt.genSalt(10);
    //Hashing password
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    //Create new user instance with hashed password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    //Save new user to db
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route for user login
router.post("/login", async (req, res) => {
  try {
    //Find by username
    const user = await User.findOne({ username: req.body.username });
    //Error message if no user is found
    !user && res.status(400).json("Wrong credentials!");
    //Compare entered password with hashed password
    const validated = await bcrypt.compare(req.body.password, user.password);
    //Error message if incorrect
    !validated && res.status(400).json("Wrong credentials!");
    //If login is successful, respond with the user data
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;