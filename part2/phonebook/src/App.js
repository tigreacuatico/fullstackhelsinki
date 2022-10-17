import { useState } from 'react'

const SearchFilter = ( {value, onChange} ) => {
  return (
    <div>filter shown with <input value={value} onChange={onChange}/></div>
  )
}

const AddPeopleForm = ( {onSubmit, nameValue, handleChangeName, numberValue, handleChangeNumber } ) => {
  return (
    <form onSubmit={onSubmit}>
        <div>name: <input value={nameValue} onChange={handleChangeName}/></div>
        <div>number: <input value={numberValue} onChange={handleChangeNumber}/></div>
        <div><button type="submit">add</button></div>
    </form>
  )
}

const RenderPhonebook = ( {phonebook} ) => {
  return (
    <div>
        {phonebook.map(person => <p key={person.name}>{person.name} {person.number}</p> )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Grimes Claire', number:'6549094' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

    
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <AddPeopleForm onSubmit={addPerson} nameValue={newName} handleChangeName={handleNameChange} numberValue={newNumber} handleChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <RenderPhonebook phonebook={personsToShow}/>
    </div>
  )
}

export default App


// https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/


    