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

//   // Muuttaa nimet vertailua varten ja suorittaa tarkastuksen

//   const checkName = persons.map((person) => person.name.toLowerCase());

//   if (checkName.includes(person.name.toLowerCase())) {
//     return response.status(400).json({ error: "Person already exists" });
//   } else {
//     persons = persons.concat(person);

//     response.json(person);
//   }
// });

// Haetaan kaikki henkilöt

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        response.json(persons);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Haetaan tietty henkilö

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Lisää uuden henkilön jos tietyt ehdot täyttyvät

app.post("/api/persons", (request, response, next) => {
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

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

// Päivitetään olemassa oleva tieto

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const number = request.body;

  Person.findByIdAndUpdate(id, number, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Poistetaan olemassa oleva tieto

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  const today = new Date();

  Person.find().then((person) => {
    response.send(
      `
      Phonebook has info for ${person.length} people
      <br><br>
      ${today}`
    );
  });
});

// Virheiden käsittelijä

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
