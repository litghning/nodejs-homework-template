const { isValidObjectId } = require("mongoose");
const { CreateError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    throw new CreateError(400, "Not foundt");
  }
  next();
};

module.exports = isValidId;
