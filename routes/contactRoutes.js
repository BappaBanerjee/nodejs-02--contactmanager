const express = require('express');
const { createContact, getAllContact, getContact, updateContact, deleteContact } = require('../controller/contactController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.use(validateToken);
router.route('/').get(getAllContact).post(createContact);
router.route('/:id').get(getContact).patch(updateContact).delete(deleteContact);

module.exports = router;