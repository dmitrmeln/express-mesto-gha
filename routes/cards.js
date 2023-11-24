const router = require('express').Router();
const cardController = require('../controllers/cards');

router.post('/', cardController.createCard);
router.get('/', cardController.readAllCards);
router.delete('/:cardId', cardController.deleteCard);
router.put('/:cardId/likes', cardController.likeCard);
router.delete('/:cardId/likes', cardController.dislikeCard);

module.exports = router;
