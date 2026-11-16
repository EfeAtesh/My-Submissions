import express from 'express'
import morgan from 'morgan'
import mongodbInteraction from './src/services/mongodb_interaction.js'
const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

let persons = await mongodbInteraction.getPersons()

app.use(morgan('tiny')) 


app.use(express.static('dist'))
app.get('/api/persons', async (req, res) => {
  try {
    const personsFromDatabase = await mongodbInteraction.getPersons()
    res.json(personsFromDatabase)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  if (persons) {
    res.json(persons)
  } else {
    res.status(404).json({ error: 'Person not found' })
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.delete('/api/persons/:id', async (req, res) => {
  const id = (req.params.id)  
  try {
    const deletedPerson = await mongodbInteraction.deletePerson(id)

    if (!deletedPerson) {
      return res.status(404).end()
    }

    persons = persons.filter(
      person => person._id.toString() !== id
    )

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number is missing' })
  }

  const existingPerson = persons.find(person => person.name === body.name)
  if (existingPerson) {
    return res.status(400).json({ error: 'Name must be unique' })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number
  }
  await mongodbInteraction.createPerson(newPerson)

  persons = persons.concat(newPerson)

  res.json(newPerson)
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler) 
