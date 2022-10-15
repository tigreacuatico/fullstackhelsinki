import { useState } from 'react'

const Button = (props) => { 
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  // from: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleClick = () => {
    // get random new index for the array of anecdotes
    let randNum = -1;
    do {
      randNum = getRandomIntInclusive(0, anecdotes.length - 1)
    } while (randNum === selected)

    // deal with borders
    if (selected + randNum > anecdotes.length - 1) setSelected(selected - selected) // return to index 0
    else setSelected(selected + randNum)
  }

  return (
    <div>
      {anecdotes[selected]} <br />
      <Button onClick={handleClick} text='next anecdote'/>
    </div>
  )
}

export default App
