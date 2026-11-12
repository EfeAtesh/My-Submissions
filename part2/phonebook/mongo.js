import mongoose from 'mongoose'

const args = process.argv.slice(2)
const password = args[0]
const uriTemplate = process.env.MONGODB_URI

if (!password || !uriTemplate) {
  console.error('Usage: MONGODB_URI="mongodb+srv://user:<password>@cluster.mongodb.net/phonebook" node mongo.js <password> [name number]')
  process.exit(1)
}

if (args.length !== 1 && args.length !== 3) {
  console.error('Provide either a password or a password, name, and number.')
  process.exit(1)
}

const uri = uriTemplate.replace('<password>', encodeURIComponent(password))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

try {
  await mongoose.connect(uri)

  if (args.length === 1) {
    const persons = await Person.find({})

    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
  } else {
    const person = new Person({
      name: args[1],
      number: args[2],
    })

    await person.save()
    console.log(`added ${person.name} number ${person.number} to phonebook`)
  }
} catch (error) {
  console.error(`MongoDB operation failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await mongoose.connection.close()
}
