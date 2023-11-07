const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Muestra los contactos
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error("Error al leer los contactos:", error.message);
  }
}

// Busca un contacto por ID
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contact = contacts.find((c) => c.id === contactId);

    if (contact) {
      console.log("Contacto encontrado:");
      console.table([contact]);
    } else {
      console.log("Contacto no encontrado.");
    }
  } catch (error) {
    console.error("Error al leer los contactos:", error.message);
  }
}

// Elimina un contacto por ID
async function removeContact(contactId) {
  try {
    let data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    // Filtra los contactos para excluir el contacto a eliminar
    const updatedContacts = contacts.filter((c) => c.id !== contactId);

    if (contacts.length !== updatedContacts.length) {
      await fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2)
      );
      console.log("Contacto eliminado exitosamente.");
    } else {
      console.log("Contacto no encontrado.");
    }
  } catch (error) {
    console.error("Error al leer o escribir los contactos:", error.message);
  }
}

// Añade un nuevo contacto
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log("Contacto agregado exitosamente.");
  } catch (error) {
    console.error("Error al leer o escribir los contactos:", error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
