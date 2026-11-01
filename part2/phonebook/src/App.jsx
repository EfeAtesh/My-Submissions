import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import '../index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

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
            setErrorMessage(null)
            setNewName('')
            setNewNumber('')
            setFilterTerm('')
          })
          .catch(error => {
            if (error.response?.status === 404) {
              setErrorMessage(`${newName} was already removed from the phonebook`)
              personService
                .getAll()
                .then(response => setPersons(response.data))
                .catch(() => setErrorMessage('Could not reload the phonebook'))
            } else {
              setErrorMessage(`Could not update the number for ${newName}`)
            }
          })
      }
      
      return
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        setFilterTerm('')
      })
      .catch(() => {
        
        setNotification('Could not save the person')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Notification message={errorMessage} />
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