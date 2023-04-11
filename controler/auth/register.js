const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { CreateError } = require("../../helpers");
const { ctrlWrapper } = require("../../middlewars");
let register = async (req, res) => {
  const { email, password } = req.body;
  const findedUser = await User.findOne({ email });
  if (findedUser) {
    throw new CreateError(409, `Email in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const user = await User.create({ ...req.body, password: hashPassword, avatarURL,});
  
  res.status(201).json({
    "user": {
        "email": `${user.email}`,
        "subscription": `${user.subscription}`
    }
});
};
register = ctrlWrapper(register);
module.exports = register;
