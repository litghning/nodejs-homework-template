const express = require('express')

const crypto = require("crypto");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required(),
});
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      status: "success",
      code: "200",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
  next(); })

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.message = "missing required name field";
      error.status = 400;
      throw error;
    }
    const newContacts = { id: crypto.randomUUID(), ...req.body };
    const result = await addContact(newContacts);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error(`Missing fields`);
      error.status = 400;
      throw error;
    }
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.message = "missing required name field";
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router
