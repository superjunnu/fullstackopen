import { useState } from "react";

// const Header = () => {
//   const course = "Half Stack application development";
//   return <h1>{course}</h1>;
// };

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = () => {
  const part1 = "Fundamentals of React";
  const part2 = "Using props to pass data";
  const part3 = "State of a component";
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  return (
    <div>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </div>
  );
};

const Total = () => {
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  );
};

export default App;
