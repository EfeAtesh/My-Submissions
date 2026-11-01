const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {



    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
                number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            <div>
                <button type="delete" onClick = {personService.delete}>delete</button>
            </div>
        </form>
    )
}

export default PersonForm