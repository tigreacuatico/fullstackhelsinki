import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (name, newObject) => {
  const request = axios.put(`${baseUrl}/${name}`, newObject)
  return request.then(response => response.data)
}

const deleteP = (name) => {
  const request = axios.delete(`${baseUrl}/${name}`)
  return request.then(response => response.data)
} 

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteP: deleteP
}