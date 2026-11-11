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