const sgMail = require("@sendgrid/mail");
require("dotenv").config();
 sgMail.setApiKey(process.env.SENDGRID_API_KEY);

 const sendEmail = async (data) => {
   try {
     const email = { ...data, from: "vladislav_pl@icloud.com" };
     await sgMail
       .send(email)
       .then(() => {
         console.log("Email sent");
       })
       .catch((error) => {
         console.error(error);
       });
     return true;
   } catch (error) {
    return console.log(error.message);
   }
 };

 module.exports = { sendEmail };
