const { User } = require("../../models");
 const { CreateError } = require("../../helpers");
 const { ctrlWrapper } = require("../../middlewars");

 let verificationEmail = async (req, res) => {
   const { verificationToken } = req.params;
   const user = await User.findOne({ verificationToken });
   if (!user) {
     throw new CreateError(404, "User not found");
   }
   await User.findByIdAndUpdate(user._id, {
     verify: true,
     verificationToken: null,
   });
   res.status(200).json({message: "Verification successful"});
 };

 verificationEmail = ctrlWrapper(verificationEmail);

 module.exports = verificationEmail;