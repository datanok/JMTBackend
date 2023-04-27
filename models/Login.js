const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
