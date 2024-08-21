import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([...anecdotes].fill(0));

  const randomQuote = () => {
    const random = Math.trunc(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const addVotes = [...vote];
    addVotes[selected] += 1;
    setVote(addVotes);
  };

  const bestQuote = vote.indexOf(Math.max(...vote));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      <p>has {vote[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={randomQuote}>next anecdote</button>

      {vote[bestQuote] === 0 ? null : (
        <>
          <h2>Anecdote with most votes</h2>
          {anecdotes[bestQuote]}
          <p>has {vote[bestQuote]} votes</p>
        </>
      )}
    </div>
  );
};

export default App;
