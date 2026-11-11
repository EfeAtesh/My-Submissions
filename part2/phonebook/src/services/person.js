import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'

const baseUrl = 'https://phonebook-efeates-forfullstack.fly.dev/api/persons'


const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}


export default { 
  getAll: getAll, 
  create: create, 
  delete: deletePerson
}