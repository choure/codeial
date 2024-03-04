const express = require('express');

const router = express.Router();
const postsRouter = require('../controllers/posts_controller');

const passport = require('passport');

router.post('/create', passport.checkAuthentication, postsRouter.create);

module.exports = router;