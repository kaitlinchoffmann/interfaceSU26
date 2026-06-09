// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true},
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})

// 3. create model of schema
const User = mongoose.model("User", userSchema)

// 4. create CRUD functions on model
//CREATE a user
async function register(username, password) {
  const user = await getUser(username);
  if(user) throw Error('Username already in use')

  const newUser = await User.create({
    username: username,
    password: password
  });

  return newUser._doc
}

// READ a user
async function login(username, password) {
  const user = await getUser(username)
  if(!user) throw Error('User not found')
  if(user.password != password) throw Error('Wrong Password')

  return user._doc
}

// UPDATE
async function updatePassword(id, password) {
  const user = await User.findByIdAndUpdate(id, {password}, {new: true})
  return user._doc
}

//DELETE
async function deleteUser(id) {
  await User.deleteOne({"_id": id})
};

// utility functions
async function getUser(username) {
  return await User.findOne({"username": username})
}

// 5. export all functions we want to access in route files
module.exports = { 
  register, login, updatePassword, deleteUser 
};