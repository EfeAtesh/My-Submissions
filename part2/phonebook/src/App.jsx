import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
        <Filter filter={filterTerm} setFilter={setFilterTerm} />
      </form>
      <h2>Add a new</h2>

      <PersonForm addPerson={handleListAdd} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App