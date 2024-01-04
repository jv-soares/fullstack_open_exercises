const PersonList = ({ persons, onDelete }) => {
    return (
        <div>
            <h3>Numbers</h3>
            <ul>
                {persons.map((person) => (
                    <li key={person.name}>
                        {person.name} {person.number}
                        <button onClick={() => onDelete(person)}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonList;
