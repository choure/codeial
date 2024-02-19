const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded...');

//home routes
router.get('/', homeController.home);
router.get('/signup', homeController.signup);

//users routes
router.use('/users', require('./users'));

//for any further routes, use it from here
//router.use('/routerName', require('./routerFile'));

//posts routes
router.use('/posts', require('./posts'));

module.exports = router;