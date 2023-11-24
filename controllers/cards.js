const cardModel = require('../models/card');
const {
  dataError,
  cardNotFoundError,
  serverError,
} = require('../utils/constants');

function createCard(req, res) {
  const cardData = req.body;

  return cardModel
    .create({ name: cardData.name, link: cardData.link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
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

function deleteCard(req, res) {
  const { cardId } = req.params;

  return cardModel
    .findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(cardNotFoundError.status)
          .send({ message: cardNotFoundError.message });
      }
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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
    .then((card) => {
      if (!card) {
        return res
          .status(cardNotFoundError.status)
          .send({ message: cardNotFoundError.message });
      }
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
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
    .then((card) => {
      if (!card) {
        return res
          .status(cardNotFoundError.status)
          .send({ message: cardNotFoundError.message });
      }
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(dataError.status)
          .send({ message: dataError.message });
      }
      return res
        .status(serverError.status)
        .send({ message: serverError.message });
    });
}

function readAllCards(req, res) {
  return cardModel
    .find()
    .then((cards) => res.status(201).send(cards))
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
