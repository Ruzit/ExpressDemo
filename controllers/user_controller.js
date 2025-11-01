const User = require("../models/User");
const Joi = require("joi");

const getUserList = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
     return next(error);
  }
  if (!users) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(200).json({ users });
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
     return next(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(200).json({ user });
};

const addUser = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }
  const { name, email, password } = req.body;
  let user;
  try {
    user = new User({ name, email, password });
    console.log(user);
    user = await user.save();
  } catch (error) {
    return next(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  res.status(201).json({ user });
};

const updateUserData = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, password });
  } catch (error) {
    return next(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(200).send({ message: 'Updated Successfully' });
};

const deleteUserData = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (error) {
    return next(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(200).send({ message: 'Sucessfully deleted' });
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(user);
}

exports.getUserList = getUserList;
exports.addUser = addUser;
exports.updateUserData = updateUserData;
exports.deleteUserData =deleteUserData;
exports.getUserById =getUserById;
