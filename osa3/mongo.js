const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://junnu144:${password}@cluster0.nuf4y.mongodb.net/PhoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name,
  number,
});

// if name and number are in cmd input
if (name && number) {
  person.save().then((result) => {
    console.log(`added ${name} ${number} to Phonebook`);
    mongoose.connection.close();
  });

  // else name and number are not in cmd input
} else {
  Person.find({}).then((result) => {
    console.log(`Phonebook:`);
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  });
}
