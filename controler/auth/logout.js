const { User } = require("../../models");
const { ctrlWrapper } = require("../../middlewars");

let logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};
logout = ctrlWrapper(logout);
module.exports = logout;
