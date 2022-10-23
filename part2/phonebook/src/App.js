import { useState, useEffect } from 'react'
import personService from './services/personService'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import AddPeopleForm from './components/AddPeopleForm'
import RenderPhonebook from './components/RenderPhonebook'
import Footer from './components/Footer'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Grimes Claire', number:'6549094' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personToDelete, setPersonToDelete] = useState({})
  const [message, setMessage] = useState({text: '', type:''})


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
    
    const isFound = persons.some(person => {
      if (person.name === newName) return {isFound: true, id: person.id};
      return false;
    });
    // confirm user shes wants to be replacing old number for that particular person
    if (isFound && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      // update number for that person
      const personObjectUpdated = {
        id: isFound.id,
        name: newName,
        number: newNumber
      }

      personService
      .update(personObjectUpdated.name, personObjectUpdated)
      .then(
        setPersons(persons.map(person => {
          if (person.name === newName) return personObjectUpdated
          return person
        }))
        .catch(error => {
          setMessage({text: `error updating ${personObjectUpdated.name} number`, type:'error'})
          setTimeout(() => {
            setMessage({text: '', type:''})
          }, 1000)
        })
      )
      setNewName('')
      setNewNumber('')
    }
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
      })
      //setMessage({text: `Added ${personObject.name}`, type:'success'})
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const deletePerson = () => {
    // prevent user from deleting someone she doesn't want to delete
    if (window.confirm(`Delete ${personToDelete.name} ?"`)) {
      personService.deleteP(personToDelete.id)
        .then(() => console.log('success delete')) // el then tiene q ser un map sin la persona i setpersons actualizado
        .catch(error => alert(`the person ${personToDelete.name} is not present in the phonebook`))

        setPersons(
          persons.filter((p) => {
             return p.id !== personToDelete.id;
          })
        );

        setMessage({text: `Deleted ${personToDelete.name}`, type:'success'})
        setTimeout(() => {
        setMessage({text: '', type:''})
        }, 1000)
        setPersonToDelete({})
    }
  }

  const handlePersonToDelete = (person) => {
    setPersonToDelete(person)
    deletePerson()
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <SearchFilter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <AddPeopleForm onSubmit={addPerson} nameValue={newName} handleChangeName={handleNameChange} numberValue={newNumber} handleChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <RenderPhonebook phonebook={personsToShow}  handlePersonToDelete={handlePersonToDelete}/>
      <Footer />
    </div>
  )
}

export default App


// https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/
// npm run server
// npm install json-server --save-dev
// npm install axios


    