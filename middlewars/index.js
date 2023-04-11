const { validation, validationFavorite } = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const  handleSchemaErrorValidation = require("./handleSchemaErrorValidation");
const isValidId = require("./isValidId");
const  authMiddleware  = require("./authMiddleware");
const uploadMiddleware = require("./uploadMiddleware");

module.exports = {
  validation,
  validationFavorite,
  ctrlWrapper,
  handleSchemaErrorValidation,
  isValidId,
  authMiddleware,
  uploadMiddleware,
};
