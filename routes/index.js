const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.get('/', (req, res) => res.status(200).send('Backend for MESTO'));

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
