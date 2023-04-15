const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { CreateError, sendEmail } = require("../../helpers");
const { ctrlWrapper } = require("../../middlewars");
const { v4 } = require("uuid");

let register = async (req, res) => {
  const { email, password } = req.body;
  const findedUser = await User.findOne({ email });
  if (findedUser) {
    throw new CreateError(409, `Email in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = v4();
  const avatarURL = gravatar.url(email);
  const user = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken,});
  
  const mail = {
    to: email,
    subject: "Confirmation of registration on the website",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm the email</a>`,
  };

  await sendEmail(mail);
  
  res.status(201).json({
    "user": {
        "email": `${user.email}`,
        "subscription": `${user.subscription}`
    }
});
};
register = ctrlWrapper(register);
module.exports = register;
