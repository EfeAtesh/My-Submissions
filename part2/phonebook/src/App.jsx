import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState(null)

  const handleListAdd = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      setMessage(`${newName} is already added to the phonebook`)
      alert(`${newName} is already added to the phonebook`)      
    }

    setPersons(persons.concat({ name: newName }))
    setNewName('')
    setMessage(null)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleListAdd}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App