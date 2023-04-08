const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { CreateError } = require("../../helpers");

const singup = async (req, res) => {
  const { email, password } = req.body;
  const findedUser = await User.findOne({ email });
  if (findedUser) {
    throw new CreateError(409, `Email in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json(user);
};

module.exports = singup;
