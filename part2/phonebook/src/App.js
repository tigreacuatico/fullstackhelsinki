import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Grimes Claire' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault() // event.preventDefault() method prevents the default action of submitting a form. The default action would, among other things, cause the page to reload.
    //console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      //date: new Date().toISOString(),
      //important: Math.random() < 0.5,
      //id: notes.length + 1,
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p>{person.name}</p> )}
      </div>
    </div>
  )
}

export default App
