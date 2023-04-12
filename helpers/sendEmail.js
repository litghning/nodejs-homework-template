const sgMail = require("@sendgrid/mail");
 sgMail.setApiKey(process.env.SENDGRID_API_KEY);

 const sendEmail = async (data) => {
   try {
     const msg = { ...data, from: "vladislav_pl@icloud.com" };
     await sgMail
       .send(msg)
       .then(() => {
         console.log("Email sent");
       })
       .catch((error) => {
         console.error(error);
       });
     return true;
   } catch (error) {
     throw error;
   }
 };

 module.exports = { sendEmail };