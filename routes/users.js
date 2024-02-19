const express = require('express');

const router = express.Router();
const usersRouter = require('../controllers/users_controller');

router.get('/profile', usersRouter.profile);

module.exports = router;