import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNewName = (event) => {
    event.preventDefault();

    const personsCopy = [...persons];
    const newNameObject = {
      name: newName,
    };

    const checkName = personsCopy.find((person) => person.name === newName);

    if (checkName) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    setPersons(personsCopy.concat(newNameObject));
    setNewName("");
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
