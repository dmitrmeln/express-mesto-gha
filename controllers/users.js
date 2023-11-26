const mongoose = require('mongoose');
const userModel = require('../models/user');

const {
  dataError,
  userNotFoundError,
  serverError,
  gotSuccess,
} = require('../utils/constants');

function handleErrors(err, res, specificError) {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(dataError.status).send({ message: dataError.message });
  }
  if (err.message === specificError.message) {
    return res.status(specificError.status).send({ message: specificError.message });
  }
  return res.status(serverError.status).send({ message: serverError.message });
}

function handleUserUpdate(req, res, options) {
  return userModel
    .findByIdAndUpdate(
      req.user._id,
      options,
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new Error(userNotFoundError.message))
    .then((user) => res
      .status(gotSuccess.status)
      .send(user))
    .catch((err) => handleErrors(err, res, userNotFoundError));
}

function updateUserInfo(req, res) {
  const updateData = { name: req.body.name, about: req.body.about };

  return handleUserUpdate(req, res, updateData);
}

function updateUserAvatar(req, res) {
  const updateData = { avatar: req.body.avatar };

  return handleUserUpdate(req, res, updateData);
}

function createUser(req, res) {
  const userData = req.body;
  return userModel
    .create(userData)
    .then((user) => res.status(gotSuccess.status).send(user))
    .catch((err) => handleErrors(err, res, dataError));
}

function readUser(req, res) {
  const { userId } = req.params;

  return userModel
    .findById(userId)
    .orFail(new Error(userNotFoundError.message))
    .then((user) => res
      .status(gotSuccess.status)
      .send(user))
    .catch((err) => handleErrors(err, res, userNotFoundError));
}

function readAllUsers(req, res) {
  return userModel
    .find()
    .then((users) => res.status(gotSuccess.status).send(users))
    .catch(() => res
      .status(serverError.status).send({ message: serverError.message }));
}

module.exports = {
  createUser,
  updateUserInfo,
  readUser,
  readAllUsers,
  updateUserAvatar,
};
