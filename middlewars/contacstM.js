const Joi = require("joi");
const { catchAsync } = require("..//async/catchAsync");
const Contact = require("../models/contacts");
const {
  Types: { ObjectId },
} = require("mongoose");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net"] },
    })
    .required().messages({
      'any.required': `missing required name field`
    }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required().messages({
      'any.required': `missing required name field`
    }),
});

const validateContact = async (req, res, next) => {
    const { error,value } = contactSchema.validate(req.body);
    if (error) {
        console.log(error.label)
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    req.body = value;
    next();
  };

  const checkContactId = catchAsync(async (req, res, next) => {
    const { contactId } = req.params;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid Contact id.." });
    }
  
    const contactExists = await Contact.exists({ _id: contactId });
  
    if (!contactExists)
      return res.status(404).json({ message: "Contact not found.." });
    next();
  });
  module.exports = {
    validateContact,
    checkContactId,
  };