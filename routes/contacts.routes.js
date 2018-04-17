const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts.controller.js');
// const secureMiddleware = require('../middlewares/secure.middleware');

//Only if admin
router.get('/', contactsController.list); 
router.post('/', contactsController.create);
router.delete('/:id', contactsController.destroy);

module.exports = router;