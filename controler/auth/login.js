const { User } = require("../../models");
const { CreateError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { ctrlWrapper } = require("../../middlewars");

let login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new CreateError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });
  const logedUser = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    "token": token,
    "user": {
      "email": logedUser.email,
      "subscription": logedUser.password
    }});
};
ogin = ctrlWrapper(login);
module.exports = login;
