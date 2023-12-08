const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  readAllUsers, readUser, updateUserInfo, updateUserAvatar, readCurrentUser,
} = require('../controllers/users');

router.get('/', readAllUsers);
router.get('/me', readCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum(),
  }),
}), readUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

module.exports = router;
