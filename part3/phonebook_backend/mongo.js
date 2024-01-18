const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('missing expected arguments');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://docputs:${password}@cluster0.dzmzujf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const Person = mongoose.model(
    'Person',
    new mongoose.Schema({
        name: String,
        number: String,
    })
);

if (process.argv.length == 5) {
    const [name, number] = [process.argv[3], process.argv[4]];
    createPerson({ name: name, number: number });
} else if (process.argv.length == 3) {
    getAll();
}

function getAll() {
    Person.find({}).then((result) => {
        console.log('Phonebook:');
        result.forEach((e) => console.log(`• ${e.name} ${e.number}`));
        mongoose.connection.close();
    });
}

function createPerson({ name, number }) {
    Person({ name: name, number: number })
        .save()
        .then((result) => {
            console.log(
                `Added ${result.name} number ${result.number} to phonebook`
            );
            mongoose.connection.close();
        });
}
