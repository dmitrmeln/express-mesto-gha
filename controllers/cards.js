const cardModel = require('../models/card');
const handleErrors = require('../utils/errorsHandler');

const {
  dataError,
  cardNotFoundError,
  serverError,
  gotSuccess,
} = require('../utils/constants');

function handleLike(req, res, options) {
  const { cardId } = req.params;
  return cardModel
    .findByIdAndUpdate(cardId, options, { new: true })
    .orFail(new Error(cardNotFoundError.message))
    .then((card) => res.status(gotSuccess.status).send(card))
    .catch((err) => handleErrors(err, res, cardNotFoundError));
}

function likeCard(req, res) {
  return handleLike(req, res, { $addToSet: { likes: req.user._id } });
}

function dislikeCard(req, res) {
  return handleLike(req, res, { $pull: { likes: req.user._id } });
}

function readAllCards(req, res) {
  return cardModel
    .find()
    .then((cards) => res.status(gotSuccess.status).send(cards))
    .catch(() => res
      .status(serverError.status)
      .send({ message: serverError.message }));
}

function createCard(req, res) {
  const { name, link } = req.body;

  return cardModel
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(gotSuccess.status).send(card))
    .catch((err) => handleErrors(err, res, dataError));
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  return cardModel
    .findByIdAndDelete(cardId)
    .orFail(new Error(cardNotFoundError.message))
    .then((card) => res.status(gotSuccess.status).send(card))
    .catch((err) => handleErrors(err, res, cardNotFoundError));
}

module.exports = {
  createCard,
  deleteCard,
  readAllCards,
  likeCard,
  dislikeCard,
};
