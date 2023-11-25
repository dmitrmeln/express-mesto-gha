const mongoose = require('mongoose');
const cardModel = require('../models/card');

const {
  dataError,
  cardNotFoundError,
  serverError,
  gotSuccess,
} = require('../utils/constants');

function createCard(req, res) {
  const cardData = req.body;

  return cardModel
    .create({ name: cardData.name, link: cardData.link, owner: req.user._id })
    .then((card) => res.status(gotSuccess.status).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      return res
        .status(serverError.status)
        .send({ message: serverError.message });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  return cardModel
    .findByIdAndDelete(cardId)
    .orFail(new Error(cardNotFoundError.message))
    .then((card) => res
      .status(gotSuccess.status)
      .send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      if (err.message === cardNotFoundError.message) {
        return res
          .status(cardNotFoundError.status)
          .send({ message: cardNotFoundError.message });
      }
      return res.status(serverError.status).send({ message: serverError.message });
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;

  return cardModel
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(new Error(cardNotFoundError.message))
    .then((card) => res
      .status(gotSuccess.status)
      .send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      if (err.message === cardNotFoundError.message) {
        return res
          .status(cardNotFoundError.status)
          .send({ message: cardNotFoundError.message });
      }
      return res
        .status(serverError.status)
        .send({ message: serverError.message });
    });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;

  return cardModel
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(new Error(cardNotFoundError.message))
    .then((card) => res
      .status(gotSuccess.status)
      .send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      if (err.message === cardNotFoundError.message) {
        return res
          .status(cardNotFoundError.status)
          .send({ message: cardNotFoundError.message });
      }
      return res
        .status(serverError.status)
        .send({ message: serverError.message });
    });
}

function readAllCards(req, res) {
  return cardModel
    .find()
    .then((cards) => res.status(gotSuccess.status).send(cards))
    .catch(() => res
      .status(serverError.status)
      .send({ message: serverError.message }));
}

module.exports = {
  createCard,
  deleteCard,
  readAllCards,
  likeCard,
  dislikeCard,
};
