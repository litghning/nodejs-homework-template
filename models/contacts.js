const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");



const listContacts = async () => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    console.log(err.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(
      (item) => String(item.id) === String(contactId)
    );
    return contact;
  } catch (err) {
    console.log(err.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      (item) => String(item.id) !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 4));
    return contacts.find((item) => String(item.id) === String(contactId));
  } catch (e) {
    console.log(e);
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
    return body;
  } catch (e) {
    console.log(e);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(
      (item) => String(item.id) === String(contactId)
    );
    contacts[idx] = { contactId, ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

    return contacts[idx];
  } catch (er) {
    console.log(er.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
