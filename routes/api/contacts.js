const express = require('express')

const {
  getlistContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
  updateStatusContact,
} = require("../../controler/controler");
const { validateContact, checkContactId } = require("../../middlewars/contacstM");

const router = express.Router();

router.get('/', getlistContacts);

router.get('/:contactId', checkContactId, getContact);

router.post('/', validateContact, createContact);

router.delete('/:contactId', checkContactId, deleteContact);

router.put('/:contactId', checkContactId, changeContact);

router.patch("/:contactId/favorite",checkContactId, updateStatusContact);

module.exports = router
