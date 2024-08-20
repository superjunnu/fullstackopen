import { useState } from "react";

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (!(good || neutral || bad)) return <div>No feedback given</div>;

  return (
    <table>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={good + neutral + bad} />
      <StatisticsLine
        text="average"
        value={(good - bad) / (good + neutral + bad)}
      />
      <StatisticsLine
        text="positive"
        value={(good * 100) / (good + neutral + bad) + " %"}
      />
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodBtnClicked = () => {
    const updatedValue = good + 1;
    setGood(updatedValue);
  };
  const neutralBtnClicked = () => {
    const updatedValue = neutral + 1;
    setNeutral(updatedValue);
  };
  const badBtnClicked = () => {
    const updatedValue = bad + 1;
    setBad(updatedValue);
  };

  return (
    <>
      <Header title="Give Feedback" />
      <Button handleClick={goodBtnClicked} text="Good" />
      <Button handleClick={neutralBtnClicked} text="Neutral" />
      <Button handleClick={badBtnClicked} text="Bad" />
      <Header title="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
