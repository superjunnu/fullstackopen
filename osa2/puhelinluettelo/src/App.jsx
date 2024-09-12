import { useState, useEffect } from "react";
// import axios from "axios";
import contactsService from "./services/contacts";

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    contactsService
      .getAll("http://localhost:3001/persons")
      .then((AllContacts) => {
        console.log("Alkudata: ", AllContacts);

        setPersons(AllContacts);
        setFilteredPersons(AllContacts);
      })
      .catch((error) => {
        console.error(`Error getting data: ${error}`);
      });
  }, []);

  const addNewName = (event) => {
    event.preventDefault();

    const CapitalizeNewNameFirstLetter =
      newName.charAt(0).toUpperCase() + newName.slice(1);

    const newNameObject = {
      name: CapitalizeNewNameFirstLetter,
      number: newNumber,
    };

    contactsService
      .create(newNameObject)
      .then((newContact) => {
        console.log("Muuttunut data: ", newContact);

        const addNewPerson = persons.concat(newContact);

        setPersons(addNewPerson);
        setFilteredPersons(addNewPerson);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error(`Error getting data: ${error}`);
      });

    const checkName = persons.find(
      (person) => person.name === CapitalizeNewNameFirstLetter
    );

    if (CapitalizeNewNameFirstLetter.length === 0) return;

    if (checkName) {
      alert(`${CapitalizeNewNameFirstLetter} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
