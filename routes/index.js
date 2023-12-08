const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const SearchError = require('../errors/search-error');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const errorsHandler = require('../middlewares/error-handler');

router.use(cookieParser());
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

router.use(authMiddleware);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => next(new SearchError('Страница не найдена')));

router.use(errors());
router.use(errorsHandler);

module.exports = router;
