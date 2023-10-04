const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

//Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//Multer storage configuration for file uploads
  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //Store uploaded files in the "images" directory 
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    //Use the provided name for the uploaded file
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

//Route for handling file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//Define route handlers for authentication, user management, and post management
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

<<<<<<< HEAD
=======
//Default route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the root route');
});

>>>>>>> 2959118 (commented back end)
// app.listen("5000", () => {
//   console.log("Backend is running on port 5000.");
// });

<<<<<<< HEAD
const port = process.env.PORT || 5000;

=======
//Determine the port number from environment variables or use the default (5000)
const port = process.env.PORT || 5000;

//Start Express.js server
>>>>>>> 2959118 (commented back end)
app.listen(port, () => {
  console.log(`Backend is running on port ${port}.`);
});
