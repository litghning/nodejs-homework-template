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

  module.exports = {
    validateContact
  };