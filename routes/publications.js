const router = require('express').Router();

const PublicationsController = require('../controllers/PublicationsController');

//Begin routes
router.get('/', PublicationsController.index);
router.get('/new', PublicationsController.new);
router.get('/:id', PublicationsController.show);
router.get('/:id/edit', PublicationsController.edit);
router.post('/', PublicationsController.create);
router.post('/update', PublicationsController.update);
router.post('/destroy', PublicationsController.destroy);
//End routes

module.exports = router;