const express = require('express');

const router = express.Router();
const usersRouter = require('../controllers/users_controller');

router.get('/profile', usersRouter.profile);

router.get('/sign-up', usersRouter.signup);
router.get('/sign-in', usersRouter.signin);

router.post('/create', usersRouter.create);
router.post('/create-session', usersRouter.createSession);

module.exports = router;