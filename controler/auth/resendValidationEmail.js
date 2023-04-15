const { User } = require("../../models");
 const { CreateError, sendEmail } = require("../../helpers");


 const resendValidationEmail = async (req, res) => {
   const { email } = req.body;
   const user = await User.findOne({ email });

   if (!user) {
     throw new CreateError(404, "User not found");
   }

   if (user.verify) {
     throw new CreateError(400, "Verification has already been passed");
   }
   const mail = {
     to: email,
     subject: "Confirmation of registration on the website",
     html: `<a  href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Click to confirm the email</a>`,
   };

   await sendEmail(mail);

   res.status(200).json({message: "Verification email sent"});
 };


 module.exports = resendValidationEmail;