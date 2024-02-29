const express = require('express');

const router = express.Router();
const usersRouter = require('../controllers/users_controller');

const passport = require('passport');

router.get('/profile', passport.checkAuthentication, usersRouter.profile);

router.get('/sign-up', usersRouter.signUp);
router.get('/sign-in', usersRouter.signIn);

router.post('/create', usersRouter.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersRouter.createSession);

router.get('/sign-out', usersRouter.destroySession);

module.exports = router;