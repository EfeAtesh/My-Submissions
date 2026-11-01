import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const getone = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
  return axios.get(baseUrl)
}

const getCountry = (name) => {
  return axios.get(`${getone}${encodeURIComponent(name)}`)
}


export default { 
  getAll: getAll,
  getCountry: getCountry
}