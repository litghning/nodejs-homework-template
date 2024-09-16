const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verificationEmail = require("./verificationEmail");
 const resendValidationEmail = require("./resendValidationEmail");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verificationEmail,
  resendValidationEmail,
};
