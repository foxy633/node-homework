const fs = require('fs').promises;
// const { v4: uuidv4 } = require("uuid");

let currentId = 10;

async function listContacts(contactsPath) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(contactsPath, contactId) {
  const contacts = await listContacts(contactsPath);
  const idNumber = Number.parseInt(contactId);
  const contact = contacts.find(contact => {
    if (contact.id === idNumber) {
      return contact;
    }
  });
  return contact;
}

async function removeContact(contactsPath, contactId) {
  const contacts = await listContacts(contactsPath);
  const idNumber = Number.parseInt(contactId);

  const newContact = contacts.filter(contact => contact.id !== idNumber);
  await fs.writeFile(contactsPath, JSON.stringify(newContact), 'utf-8');

  return newContact;
}

async function addContact(contactsPath, name, email, phone) {
  const contacts = await listContacts(contactsPath);
  // const idNumber = uuidv4();

  currentId = contacts.length + 1;
  contacts.push({
    id: currentId,
    name,
    email,
    phone,
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
