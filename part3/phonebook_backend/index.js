require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./person');

const app = express();
const port = 3001;

app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
);

app.get('/info', (req, res) => {
    const length = entries.length;
    const now = Date();
    res.send(`Phonebook has info for ${length} people<br/>${now}`);
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then((result) => res.json(result));
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id).then((result) => res.json(result));
});

app.post('/api/persons', (req, res) => {
    const person = req.body;
    if (!person.name || !person.number) {
        return res.status(400).json({ error: 'Content missing' });
    }
    // if (entries.map((e) => e.name).includes(person.name)) {
    //     return res.status(400).json({ error: 'Name must be unique' });
    // }
    Person({ ...person })
        .save()
        .then((result) => res.status(201).json(result));
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    entries = entries.filter((e) => e.id !== id);
    res.send('Removed');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
