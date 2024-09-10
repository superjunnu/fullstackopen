import { useState, useEffect } from "react";
import axios from "axios";

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
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log(response.data);

        setPersons(response.data);
        setFilteredPersons(response.data);
      })
      .catch((error) => {
        console.error(`Error getting data: ${error}`);
      });
  }, []);

  const addNewName = (event) => {
    event.preventDefault();

    const CapitalizeNewName =
      newName.charAt(0).toUpperCase() + newName.slice(1);

    const newNameObject = {
      name: CapitalizeNewName,
      number: newNumber,
    };

    axios
      .post("http://localhost:3001/persons", newNameObject)
      .then((response) => {
        console.log(response);

        const addNewPerson = persons.concat(response.data);

        setPersons(addNewPerson);
        setFilteredPersons(addNewPerson);
        setNewName("");
        setNewNumber("");
      });

    const checkName = persons.find(
      (person) => person.name === CapitalizeNewName
    );

    if (CapitalizeNewName.length === 0) return;

    if (checkName) {
      alert(`${CapitalizeNewName} is already added to phonebook`);
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
