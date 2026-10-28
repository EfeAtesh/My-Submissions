const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Person List</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Persons