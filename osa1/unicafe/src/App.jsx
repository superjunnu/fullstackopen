import { useState } from "react";

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const RenderText = ({ text, value }) => {
  return (
    <div>
      {text} {value === 0 || Number.isNaN(value) ? "" : value}
    </div>
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
      <RenderText text="good" value={good} />
      <RenderText text="neutral" value={neutral} />
      <RenderText text="bad" value={bad} />
      <RenderText text="all" value={(good - bad) / (good + neutral + bad)} />
      <RenderText
        text="positive"
        value={(good * 100) / (good + neutral + bad)}
      />
    </>
  );
}

export default App;
