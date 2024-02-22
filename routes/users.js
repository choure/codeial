const express = require('express');

const router = express.Router();
const usersRouter = require('../controllers/users_controller');

router.get('/profile', usersRouter.profile);

router.get('/create_profile', usersRouter.createProfile);

router.get('/sign-up', usersRouter.signup);
router.get('/sign-in', usersRouter.signin);

module.exports = router;