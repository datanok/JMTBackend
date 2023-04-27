const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the MongoDB database using Mongoose

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const User = require("./models/User");
const Login = require("./models/Login");

//create new user
app.post("/jmt/user/new", (req, res) => {
  const user = new User({
    name: req.body.text,
  });
  user.save();
  res.json(user);
});
//get all users
app.get("/jmt/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Delete User
app.delete("/user/delete/:id", async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  res.json(result);
});

//create new Login
app.post("/login/new", (req, res) => {
  const login = new Login({
    name: req.body.text,
  });
  login.save();
  res.json(login);
});

//get all logins

app.get("/logins", async (req, res) => {
  const login = await Login.find();
  res.json(login);
});

//Delete Login
app.delete("/login/delete/:id", async (req, res) => {
  const result = await Login.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
