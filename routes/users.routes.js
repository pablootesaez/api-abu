const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller.js');
// const secureMiddleware = require('../middlewares/secure.middleware');

router.get('/', usersController.list);
router.get('/:id', usersController.get);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;
