const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded...');

//home routes
router.get('/', homeController.home);

//users routes
router.use('/users', require('./users'));

//posts routes
router.use('/posts', require('./posts'));

//comments routes
router.use('/comments', require('./comments'));

//for any further routes, use it from here
//router.use('/routerName', require('./routerFile'));

module.exports = router;