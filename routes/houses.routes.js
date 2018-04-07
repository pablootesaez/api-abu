const express = require('express');
const router = express.Router();
const housesController = require('../controllers/houses.controller.js');

router.get('/', housesController.list);
router.get('/:id', housesController.get);
router.post('/', housesController.create);
router.put('/:id', housesController.update);
router.delete('/:id', housesController.destroy);

module.exports = router;
