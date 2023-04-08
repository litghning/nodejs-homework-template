const { Contact } = require("../../models/index");

const getlistContacts = async (req, res) => {
  const { id } = req.user;
  const { page = 1, limit = 10, favorite = [true, false] } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    { owner: id, favorite },
    "-createdAt -updatedAt"
  )
    .populate("owner", "_id email")
    .skip(skip)
    .limit(parseInt(limit));
  res.status(200).json(contacts);
};

module.exports = getlistContacts;
