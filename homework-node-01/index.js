const { Command } = require('commander');
const contacts = require('./contacts');
const path = require('path');

const program = new Command();
program
  .requiredOption('-a, --action [type]', 'Action type')
  .option('-f, --fdb [type]', 'File db', 'db/contacts.json')
  .option('-i, --id [type]', 'user id')
  .option('-n, --name [type]', 'user name')
  .option('-e, --email [type]', 'user email')
  .option('-p, --phone [type]', 'user phone');

program.parse(process.argv);
const options = program.opts();
console.log(options); //оставить для примера

const contactsPath = path.join(__dirname, options.fdb);
// TODO: рефакторить;
async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        console.table(await contacts.listContacts(contactsPath));

        break;

      case 'get':
        // ... id
        const contact = await contacts.getContactById(contactsPath, id);
        if (!contact) {
          console.log(`Contact-ID ${id} not found.`);
        } else {
          console.table(contact);
        }
        break;

      case 'add':
        // ... name email phone
        console.table(
          await contacts.addContact(contactsPath, name, email, phone),
        );
        break;

      case 'remove':
        // ... id
        console.table(await contacts.removeContact(contactsPath, id));
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (err) {
    console.error(err);
  }
}

invokeAction(options);
