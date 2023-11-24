const router = require('express').Router();
const { routerError } = require('../utils/constants');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.get('/', (req, res) => res.status(200).send('Backend for MESTO'));
router.get('*', (req, res) => res
  .status(routerError.status)
  .send({ message: routerError.message }));

module.exports = router;
