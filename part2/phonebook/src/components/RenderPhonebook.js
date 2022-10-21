const RenderPhonebook = ( {phonebook, onClick} ) => {
    return (
      <div className='renderPhonebook'>
          {phonebook.map(person => <p key={person.name}>{person.name} {person.number} 
          <button onClick={() => onClick(person.name)}>delete</button></p> )}
      </div>
    )
}

export default RenderPhonebook