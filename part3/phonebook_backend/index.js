require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./person');

const app = express();
const port = 3001;

app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
);

app.get('/info', (req, res, next) => {
    const now = Date();
    Person.find({})
        .then((result) =>
            res.send(
                `Phonebook has info for ${result.length} people<br/>${now}`
            )
        )
        .catch(next);
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then((result) => res.json(result));
});

app.get('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;
    Person.findById(id)
        .then((result) => (result ? res.json(result) : res.status(404).end()))
        .catch(next);
});

app.put('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;
    const person = req.body;
    if (!person.name || !person.number) {
        return res.status(400).json({ error: 'Content missing' });
    }
    return Person.findByIdAndUpdate(id, person, {
        new: true,
        runValidators: true,
    })
        .then((result) => res.status(201).json(result))
        .catch(next);
});

app.post('/api/persons', (req, res, next) => {
    const person = req.body;
    if (!person.name || !person.number) {
        return res.status(400).json({ error: 'Content missing' });
    }
    return Person({ ...person })
        .save()
        .then((result) => res.status(201).json(result))
        .catch(next);
});

app.delete('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;
    Person.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch(next);
});

const errorHandler = (error, req, res, next) => {
    console.error(error);
    if (error.name === 'CastError') {
        res.status(400).json({ error: 'Malformatted id' });
    } else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
    }
    next(error);
};
app.use(errorHandler);

const unknownEndpointHandler = (error, req, res) => {
    res.status(404).json({ error: 'Unknown endpoint' });
};
app.use(unknownEndpointHandler);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
