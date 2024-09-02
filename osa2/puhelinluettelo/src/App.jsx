import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addNewName = (event) => {
    event.preventDefault();

    const CapitalizeNewName =
      newName.charAt(0).toUpperCase() + newName.slice(1);

    const newNameObject = {
      name: CapitalizeNewName,
      number: newNumber,
    };

    const checkName = persons.find(
      (person) => person.name === CapitalizeNewName
    );

    if (checkName) {
      alert(`${CapitalizeNewName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const addNewPerson = persons.concat(newNameObject);

    setPersons(addNewPerson);
    setFilteredPersons(addNewPerson);
    setNewName("");
    setNewNumber("");
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
      <div>
        filter shown with:
        <input value={searchName} onChange={handleSearchName} />
        <h2>Add a new</h2>
      </div>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
