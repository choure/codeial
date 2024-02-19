const express = require('express');

const router = express.Router();
const postsRouter = require('../controllers/posts_controller');

router.get('/likes', postsRouter.likes);

module.exports = router;