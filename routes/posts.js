const express = require('express');

const router = express.Router();
const postsRouter = require('../controllers/posts_controller');

router.post('/create', postsRouter.create);

module.exports = router;