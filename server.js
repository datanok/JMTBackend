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
const uri = "mongodb+srv://tanmaypatiltp25:9224063412Ta@cluster0.wgvt5xh.mongodb.net/?retryWrites=true&w=majority";

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
app.post("/jmt/user/new", async (req, res) => {
  try {
    const userData = req.body;

    if (Array.isArray(userData)) {
      // Batch creation of users
      const createdUsers = await User.create(userData);
      res.json(createdUsers);
    } else {
      // Single user creation
      const user = new User({
        name: userData.text,
      });
      await user.save();
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user(s)" });
  }
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

app.delete("/user/delete-all", async (req, res) => {
  const result = await User.deleteMany({});
  res.json(result);
});


//create new Login
app.post("/login/new", async (req, res) => {
  try {
    const loginData = req.body;
    console.log(loginData)

    if (Array.isArray(loginData)) {
      // Batch creation of logins
      const createdLogins = await Login.create(loginData);
      console.log(createdLogins);
      res.json(createdLogins);
    } else {
      // Single login creation
      const login = new Login({
        name: loginData.text,
      });
      await login.save();
      res.json(login);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create login(s)" });
  }
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
app.delete("/login/delete-all", async (req, res) => {
  try {
    const result = await Login.deleteMany({});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting documents." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
