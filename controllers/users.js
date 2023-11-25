const mongoose = require('mongoose');
const userModel = require('../models/user');

const {
  dataError,
  userNotFoundError,
  serverError,
  gotSuccess,
} = require('../utils/constants');

function createUser(req, res) {
  const userData = req.body;
  return userModel
    .create(userData)
    .then((user) => res.status(gotSuccess.status).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      return res
        .status(serverError.status)
        .send({ message: serverError.message });
    });
}

function readUser(req, res) {
  const { userId } = req.params;

  return userModel
    .findById(userId)
    .orFail(new Error(userNotFoundError.message))
    .then((user) => res
      .status(gotSuccess.status)
      .send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      if (err.message === userNotFoundError.message) {
        return res
          .status(userNotFoundError.status)
          .send({ message: userNotFoundError.message });
      }
      return res.status(serverError.status).send({ message: serverError.message });
    });
}

function readAllUsers(req, res) {
  return userModel
    .find()
    .then((users) => res.status(gotSuccess.status).send(users))
    .catch(() => res
      .status(serverError.status).send({ message: serverError.message }));
}

function updateUserInfo(req, res) {
  return userModel
    .findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new Error(userNotFoundError.message))
    .then((user) => res
      .status(gotSuccess.status)
      .send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      if (err.message === userNotFoundError.message) {
        return res
          .status(userNotFoundError.status)
          .send({ message: userNotFoundError.message });
      }
      return res
        .status(serverError.status)
        .send({ message: serverError.message });
    });
}

function updateUserAvatar(req, res) {
  return userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new Error(userNotFoundError.message))
    .then((user) => res
      .status(gotSuccess.status)
      .send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      if (err.message === userNotFoundError.message) {
        return res
          .status(userNotFoundError.status)
          .send({ message: userNotFoundError.message });
      }
      return res
        .status(serverError.status)
        .send({ message: serverError.message });
    });
}

module.exports = {
  createUser,
  updateUserInfo,
  readUser,
  readAllUsers,
  updateUserAvatar,
};
