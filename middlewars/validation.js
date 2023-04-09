const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    next();
  };
};

const validationFavorite = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      error.message = "missing field favorite";
      next(error);
    }
    next();
  };
};

module.exports = { validation, validationFavorite };
