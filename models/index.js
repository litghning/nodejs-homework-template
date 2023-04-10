const { Contact } = require("./contacts");
const { schemas } = require("./contactSchemasJoi");
const { User } = require("./user");
const userSchemaJoi = require("./userSchemaJoi");

module.exports = {
  Contact,
  User,
  schemas,
  userSchemaJoi,
};
