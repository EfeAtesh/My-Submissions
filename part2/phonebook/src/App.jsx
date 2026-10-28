import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '040-123456', id: 1 },
    { name: 'Ada Lovelace' , number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov' , number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck' , number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setNewId] = useState(persons.length + 1)
  const [filterTerm, setFilterTerm] = useState('')
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  )
  const handleListAdd = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} and their phone number is already added to the phonebook`)
    }


    setPersons(persons.concat({ name: newName, number: newNumber, id: newId }))
    setNewName('')
    setNewNumber('')
    setNewId(newId + 1)
    setMessage(null)
    setFilterTerm('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleListAdd}>
        <div>
          filter shown with: <input value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} />
        </div>
      </form>
      <h2>add a new</h2>

      <form onSubmit={handleListAdd}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => (
          <li key={person.name}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App