const { User } = require("../../models");
 const { HttpError } = require("../../helpers");
 const { ctrlWrapper } = require("../../middlewars");

 let verificationEmail = async (req, res, next) => {
   const { verificationToken } = req.params;
   const user = await User.findOne({ verificationToken });
   if (!user) {
     throw new HttpError(404, "User not found");
   }
   await User.findByIdAndUpdate(user._id, {
     verify: true,
     verificationToken: "",
   });
   res.status(200).json("Verification successful");
 };

 verificationEmail = ctrlWrapper(verificationEmail);

 module.exports = verificationEmail;