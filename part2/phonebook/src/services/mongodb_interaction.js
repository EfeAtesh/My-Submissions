import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('MONGODB_URI is not defined')
}

mongoose.connect(uri)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const getPersons = () => Person.find({})

export default { getPersons }
