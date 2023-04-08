const { Contact } = require("../../models/index");

const createContact = async (req, res) => {
  const { id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: id });
  res.status(201).json(contact);
};

module.exports = createContact;
