import { useEffect, useState } from 'react';
import Filter from './components/Filter.jsx';
import Notification from './components/Notification.jsx';
import PersonForm from './components/PersonForm.jsx';
import PersonList from './components/PersonList.jsx';
import personService from './services/persons.js';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        personService.getAll().then(setPersons);
    }, []);

    const onPersonSubmit = (event) => {
        event.preventDefault();
        const isDuplicate = persons
            .map((person) => person.name.toLowerCase())
            .includes(newName.toLowerCase());
        if (isDuplicate) {
            const shouldUpdatePerson = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            );
            if (shouldUpdatePerson) updatePersonsNumber();
        } else {
            addPerson();
        }
    };

    const updatePersonsNumber = () => {
        const existingPerson = persons.find(
            (e) => e.name.toLowerCase() === newName.toLowerCase()
        );
        personService
            .update(existingPerson.id, {
                ...existingPerson,
                number: newNumber,
            })
            .then((updatedPerson) => {
                const updatedPersons = persons.map((e) =>
                    e.id === updatedPerson.id ? updatedPerson : e
                );
                setPersons(updatedPersons);
                clearTextFields();
                showNotification(`Changed ${updatedPerson.name}'s number`);
            })
            .catch((_) => {
                showNotification(
                    `Information of ${existingPerson.name} has already been removed from server`,
                    true
                );
            });
    };

    const addPerson = () => {
        const newPerson = { name: newName, number: newNumber };
        personService
            .create(newPerson)
            .then((person) => {
                setPersons(persons.concat(person));
                clearTextFields();
                showNotification(`Added ${newPerson.name}`);
            })
            .catch((error) =>
                showNotification(error.response.data.error, true)
            );
    };

    const deletePerson = (person) => {
        const shouldDelete = window.confirm(`Delete ${person.name}?`);
        if (shouldDelete)
            personService.remove(person.id).then((response) => {
                if (response.status === 204) {
                    const updatedPersons = persons.filter(
                        (e) => e.id !== person.id
                    );
                    setPersons(updatedPersons);
                }
            });
    };

    const showNotification = (message, isError = false) => {
        setNotification({ message, isError });
        setTimeout(() => setNotification(null), 3000);
    };

    const clearTextFields = () => {
        setNewName('');
        setNewNumber('');
    };

    const filtered =
        searchText.length === 0
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(searchText.toLowerCase())
              );

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification notification={notification}></Notification>
            <Filter
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
            ></Filter>
            <PersonForm
                onSubmit={onPersonSubmit}
                name={newName}
                onNameChange={(event) => setNewName(event.target.value)}
                number={newNumber}
                onNumberChange={(event) => setNewNumber(event.target.value)}
            ></PersonForm>
            <PersonList persons={filtered} onDelete={deletePerson}></PersonList>
        </div>
    );
};

export default App;
