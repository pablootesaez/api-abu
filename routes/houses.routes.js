const express = require('express');
const router = express.Router();
const housesController = require('../controllers/houses.controller.js');
// const secureMiddleware = require('../middlewares/secure.middleware');


router.get('/', housesController.list);
router.get('/:id', housesController.get);
router.post('/', housesController.create); //Only if admin o gestor de casa (pendiente gestor)
router.put('/:id', housesController.update); //Only if admin o gestor de casa (pendiente gestor)
router.delete('/:id', housesController.destroy);

module.exports = router;
