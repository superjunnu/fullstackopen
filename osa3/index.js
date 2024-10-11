const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let persons = [
  // {
  //   id: 1,
  //   name: "Arto Hellas",
  //   number: "040-123456",
  // },
  // {
  //   id: 2,
  //   name: "Ada Lovelace",
  //   number: "39-44-5323523",
  // },
  // {
  //   id: 3,
  //   name: "Dan Abramov",
  //   number: "12-43-234345",
  // },
  // {
  //   id: 4,
  //   name: "Mary Poppendieck",
  //   number: "39-23-6423122",
  // },
];

app.get("/", (request, response) => {
  response.send(
    `Go to <a href="http://localhost:${PORT}/api/persons">http://localhost:${PORT}/api/persons</a>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  const today = new Date();

  response.send(`
    Phonebook has info for ${persons.length} people
    <br><br>
    ${today}`);
});

const generateId = () => {
  const randomId = Math.trunc(Math.random() * Date.now());

  const addId = persons.length > 0 ? randomId : 0;
  return addId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  console.log(person);

  response.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/persons`);
});
