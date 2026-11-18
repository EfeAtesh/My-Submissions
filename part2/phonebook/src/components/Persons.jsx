const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <h2>Person List</h2>
      <ul>
        {persons.map(person => (
          <li key={person._id}>
            {person.name}: {person.number}
            {' '}
            <button onClick={() => deletePerson(person._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>

  )
} 

export default Persons