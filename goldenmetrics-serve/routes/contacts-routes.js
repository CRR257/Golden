const express = require('express');

const contactsControllers = require('../controllers/contacts-controllers');
const router = express.Router();

router.get('/', contactsControllers.getContacts)

module.exports = router;