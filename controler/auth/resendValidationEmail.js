const { User } = require("../../models");
 const { HttpError, sendEmail } = require("../../helpers");
 const { ctrlWrapper } = require("../../middlewars");

 let resendValidationEmail = async (req, res, next) => {
   const { email } = req.body;
   const user = await User.findOne({ email });

   if (!user) {
     throw new HttpError(404, "User not found");
   }

   if (user.verify) {
     throw new HttpError(400, "Verification has already been passed");
   }
   const mail = {
     to: email,
     subject: "Confirmation of registration on the website",
     html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken} target="_blank>Click to confirm the email</a>`,
   };

   await sendEmail(mail);

   res.status(200).json("Verification email sent");
 };
 resendValidationEmail = ctrlWrapper(resendValidationEmail);

 module.exports = resendValidationEmail;