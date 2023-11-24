const router = require('express').Router();
const userController = require('../controllers/users');

router.post('/', userController.createUser);
router.get('/', userController.readAllUsers);
router.get('/:userId', userController.readUser);
router.patch('/me', userController.updateUserInfo);
router.patch('/me/avatar', userController.updateUserAvatar);

module.exports = router;
