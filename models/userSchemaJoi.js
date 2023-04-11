const Joi = require("joi");

const addUserSchemaJoi = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  subscription: Joi.string(),
  avatarURL: Joi.string(),
  token: Joi.string(),
});

const userSubscriptionSchemaJoi = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

module.exports = {
  addUserSchemaJoi,
  userSubscriptionSchemaJoi,
};
