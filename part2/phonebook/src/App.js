import { useState, useEffect } from 'react'
import personService from './services/personService'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import AddPeopleForm from './components/AddPeopleForm'
import RenderPhonebook from './components/RenderPhonebook'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Grimes Claire', number:'6549094' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personToDelete, setPersonToDelete] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault() // event.preventDefault() method prevents the default action of submitting a form. The default action would, among other things, cause the page to reload.
    
    // prevent user from adding repeated names
    const isFound = persons.some(person => {
      if (person.name=== newName) return true;
      return false;
    });
    if (isFound) alert(`${newName} is already added to phonebook`)
    // add new person to phonebook
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const deletePerson = (name) => {
    // prevent user from deleting someone she doesn't want to delete
    if (window.confirm(`Delete ${name} ?"`)) {
      personService.delete(name)
        .then(() => console.log('success delete')) // el then tiene q ser un map sin la persona i setpersons actualizado
        .catch(error => alert(`the person ${name} is not present in the phonebook`))
    }
    setPersonToDelete('')
  }

    
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <AddPeopleForm onSubmit={addPerson} nameValue={newName} handleChangeName={handleNameChange} numberValue={newNumber} handleChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <RenderPhonebook phonebook={personsToShow} onClick={() => deletePerson(personToDelete)}/>
    </div>
  )
}

export default App


// https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/


    