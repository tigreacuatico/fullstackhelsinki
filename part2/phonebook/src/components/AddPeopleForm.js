const AddPeopleForm = ( {onSubmit, nameValue, handleChangeName, numberValue, handleChangeNumber } ) => {
    return (
      <form onSubmit={onSubmit}>
          <div>name: <input value={nameValue} onChange={handleChangeName}/></div>
          <div>number: <input value={numberValue} onChange={handleChangeNumber}/></div>
          <div><button type="submit">add</button></div>
      </form>
    )
}

export default AddPeopleForm