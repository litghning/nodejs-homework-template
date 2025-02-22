const { User } = require("../../models");
const { CreateError } = require("../../helpers");
const { ctrlWrapper } = require("../../middlewars");

let getCurrent = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new CreateError(401, "Not authorized");
  }
  const showedDataUser = { email: user.email, subscription: user.subscription };
  res.status(200).json(showedDataUser);
};

getCurrent = ctrlWrapper(getCurrent);
module.exports = getCurrent;
