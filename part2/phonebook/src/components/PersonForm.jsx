const PersonForm = (props) => {
    return (
        <div>
            <h3>Add number</h3>
            <form onSubmit={props.onSubmit}>
                <div>
                    name:{' '}
                    <input value={props.name} onChange={props.onNameChange} />
                </div>
                <div>
                    number:{' '}
                    <input
                        value={props.number}
                        onChange={props.onNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;
