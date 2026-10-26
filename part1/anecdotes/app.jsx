import { useState } from 'react'
import random from 'lodash/random'

const showAnecdote = (anecdotes, selected) => {
  return (
    <button onClick={() => selected(random(0, anecdotes.length - 1))}>next anecdote</button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const copy = [...votes]

  console.log(copy)
  console.log(votes)

  const [selected, setSelected] = useState(0)

  return (
    
    <div>
        <h1>Anecdote of the day</h1>
      {anecdotes[selected]}       <p>has {copy[selected]} votes</p>

      <p>        <button onClick={() => setVotes(copy.map((vote, index) => index === selected ? vote + 1 : vote))}>vote</button>
    {showAnecdote(anecdotes, setSelected)}</p>

        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[copy.indexOf(Math.max(...copy))]}</p>
        <p>has {copy[copy.indexOf(Math.max(...copy))]} votes</p>
    </div>
  )
}

export default App
