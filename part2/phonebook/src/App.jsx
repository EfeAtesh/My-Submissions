import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
      .catch(() => alert('Could not load the phonebook'))
  }, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  )

  const handleListAdd = event => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} and their phone number is already added to the phonebook`)
      return
    } else if (persons.some((person) => person.name === newName && person.number !== newNumber)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find((person) => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }

        personService
          .update(personToUpdate.id, updatedPerson)
          .then(response => {
            setPersons(persons.map((person) => person.id !== personToUpdate.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setFilterTerm('')
          })
          .catch(() => alert(`Could not update the number for ${newName}`))
      }
      
      return
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setFilterTerm('')
      })
      .catch(() => alert('Could not save the person'))

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