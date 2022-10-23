const RenderPhonebook = ( {phonebook,  handlePersonToDelete} ) => {
  const handleDeleteButton = (person) => {
    handlePersonToDelete(person)
  }

  return (
    <div className='renderPhonebook'>
        {phonebook.map(person => <p key={person.name}>{person.name} {person.number} 
        <button onClick={() => handleDeleteButton(person)}>delete</button></p> )}
    </div>
  )
}

export default RenderPhonebook