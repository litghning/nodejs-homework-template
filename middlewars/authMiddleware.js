const jwt = require("jsonwebtoken");
const { CreateError } = require("../helpers");

const authMiddleware = (req, res, next) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  try {
    if (!token || bearer !== "Bearer") {
      throw new CreateError(401, "Not authorized");
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      throw new CreateError(401, "Not authorized");
    }
    next(error);
  }
};

module.exports = { authMiddleware };
