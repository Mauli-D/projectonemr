const router = require('express').Router();

//controllers
const PagesController = require('../controllers/pagesController')

//routes
router.get('/', PagesController.show);
router.get('/about', PagesController.show);
router.get('/contact', PagesController.show);

module.exports = router;