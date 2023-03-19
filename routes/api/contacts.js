const express = require('express')

const {
  getlistContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
} = require("../../controler/controler");
const { validateContact } = require("../../middlewars/contacstM");

const router = express.Router();

router.get('/', getlistContacts);

router.get('/:contactId', getContact);

router.post('/', validateContact, createContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', changeContact);

module.exports = router
