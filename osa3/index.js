const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// Hakee kaikki sen hetken henkilöt

// app.get("/api/persons", (request, response) => {
//   response.json(persons);
// });

// // Hakee henkilön ID:n avulla

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);

//   person ? response.json(person) : response.status(404).end();
// });

// // Poistaa henkilön ID:n perusteella

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

// app.get("/info", (request, response) => {
//   const today = new Date();

//   response.send(`
//     Phonebook has info for ${persons.length} people
//     <br><br>
//     ${today}`);
// });

// Luo random ID lisättävälle henkilölle

// const generateId = () => {
//   const randomId = Math.trunc(Math.random() * Date.now());

//   const addId = Person.length > 0 ? randomId : 0;
//   return addId;
// };

// Luodaan token POST-tietoa varten

morgan.token("request-body", (request, response) => {
  return JSON.stringify(request.body);
});

// Luodaan Middleware custom versiona tiedon loggausta varten

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-body"
  )
);

// Lisää uuden henkilön jos tietyt ehdot täyttyvät

// app.post("/api/persons", (request, response) => {
//   const body = request.body;

//   if (!body.name) {
//     return response.status(400).json({ error: "Name missing" });
//   }
//   if (!body.number) {
//     return response.status(400).json({ error: "Number missing" });
//   }

//   // Uusi luotava henkilö olio

//   const person = {
//     id: generateId(),
//     name: body.name,
//     number: body.number,
//   };

//   // Muuttaa nimet vertailua varten ja suorittaa tarkastuksen

//   const checkName = persons.map((person) => person.name.toLowerCase());

//   if (checkName.includes(person.name.toLowerCase())) {
//     return response.status(400).json({ error: "Person already exists" });
//   } else {
//     persons = persons.concat(person);

//     response.json(person);
//   }
// });

// Getting all persons

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Lisää uuden henkilön jos tietyt ehdot täyttyvät

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "Name missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "Number missing" });
  }

  // Uusi luotava henkilö olio

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
