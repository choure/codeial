const express = require('express');

const router = express.Router();
const commentsRouter = require('../controllers/comments_controller');

const passport = require('passport');

router.post('/create', passport.checkAuthentication, commentsRouter.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsRouter.destroy);

module.exports = router;