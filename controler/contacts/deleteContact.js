const { Contact } = require("../../models/index");
const { CreateError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  console.log(id);
  const deletedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: id,
  });
  if (!deletedContact) {
    throw new CreateError(404, "Not found");
  }

  res.status(200).json("contact deleted");
};

module.exports = deleteContact;
