const { CreateError } = require("../../helpers");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../middlewars");

let updateSubscription = async (req, res) => {
  const { id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(id, req.body);
  if (!updatedUser) {
    throw new CreateError(404, "Not found");
  }
  res.status(200).json(updatedUser);
};
updateSubscription = ctrlWrapper(updateSubscription);
module.exports = updateSubscription;
