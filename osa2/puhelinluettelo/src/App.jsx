import { useState, useEffect } from "react";
import contactsService from "./services/contacts";

const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const PersonForm = ({
  addNewName,
  newName,
  newNumber,
  handleNewNameChange,
  handleNewNumberChange,
}) => {
  return (
    <form onSubmit={addNewName}>
      <div>
        name:
        <input value={newName} onChange={handleNewNameChange} />
        <br />
        number:
        <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ searchName, handleSearchName }) => {
  return (
    <div>
      filter shown with:
      <input value={searchName} onChange={handleSearchName} />
    </div>
  );
};

const Notification = ({ message }) => {
  const MessageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }
  const messageTypes = {
    add: { ...MessageStyle, color: "green" },
    update: { ...MessageStyle, color: "orange" },
    remove: { ...MessageStyle, color: "violet" },
  };

  if (message.includes("Added"))
    return <div style={messageTypes.add}>{message}</div>;
  if (message.includes("Updated"))
    return <div style={messageTypes.update}>{message}</div>;
  if (message.includes("Removed"))
    return <div style={messageTypes.remove}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    contactsService
      .getAll()
      .then((AllContacts) => {
        console.log("Alkudata: ", AllContacts);

        setPersons(AllContacts);
        setFilteredPersons(AllContacts);
      })
      .catch((error) => {
        console.error(`Error getting data: ${error}`);
      });
  }, []);

  const displayNotificationMessage = (text, person) => {
    setNotificationMessage(`${text} ${person.name}`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addNewName = (event) => {
    event.preventDefault();

    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    if (newName.trim() === "") {
      return;
    }

    const checkName = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (checkName) {
      const confirmName = window.confirm(
        `${checkName.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (!confirmName) {
        setNewName("");
        setNewNumber("");
        return;
      }

      contactsService
        .update(checkName.id, newNameObject)
        .then((updatePerson) => {
          setPersons(
            persons.map((person) =>
              person.id === checkName.id ? updatePerson : person
            )
          );
          setFilteredPersons(
            persons.map((person) =>
              person.id === checkName.id ? updatePerson : person
            )
          );
          displayNotificationMessage("Updated", updatePerson);
        });

      setNewName("");
      setNewNumber("");
      return;
    } else {
      contactsService
        .create(newNameObject)
        .then((newContact) => {
          const addNewPerson = persons.concat(newContact);

          setPersons(addNewPerson);
          setFilteredPersons(addNewPerson);
          setNewName("");
          setNewNumber("");
          displayNotificationMessage("Added", newContact);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleNewNameChange = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    const name = event.target.value;

    const filterPerson = persons.filter((person) =>
      person.name.toLowerCase().includes(name.toLowerCase())
    );

    setSearchName(name);
    setFilteredPersons(filterPerson);
  };

  const removePerson = (id) => {
    const targetPerson = persons.find((person) => person.id === id);
    const confirmRemove = window.confirm(`Delete ${targetPerson.name}?`);

    if (confirmRemove) {
      contactsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id != id));
          setFilteredPersons(
            filteredPersons.filter((person) => person.id != id)
          );
          displayNotificationMessage("Removed", targetPerson);
        })
        .catch((error) => {
          console.error(`Error removing person: ${error.message}`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter handleSearchName={handleSearchName} searchName={searchName} />
      <h2>Add a new</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
