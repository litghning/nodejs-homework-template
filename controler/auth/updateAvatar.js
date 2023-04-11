const { User } = require("../../models");
 const fs = require("fs/promises");
 const path = require("path");
 const Jimp = require("jimp");

 const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

 const updateAvatar = async (req, res) => {
   try {
     const { path: temporaryName, filename } = req.file;
     const { id } = req.user;
     const [extention] = filename.split(".").reverse();
     const avatarName = `${id}.${extention}`;

     const resultUpload = path.join(avatarsDir, avatarName);

     await Jimp.read(temporaryName)
       .then((img) => {
         return img.resize(250, 250).writeAsync(temporaryName);
       })
       .catch((error) => {
         console.log(error);
       });

     await fs.rename(temporaryName, resultUpload);
     const avatarURL = path.join("avatar", resultUpload);

     await User.findByIdAndUpdate(id, { avatarURL });

     res.status(200).json({ "avatarURL": avatarURL });
   } catch (error) {
     await fs.unlink(req.file.path);
     throw error;
   }
 };

 module.exports = updateAvatar;