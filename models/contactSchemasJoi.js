const Joi = require("joi");

const addSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchemaJoi,
  updateFavoriteSchema,
};

module.exports = {
  schemas,
};
