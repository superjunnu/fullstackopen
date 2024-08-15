import { useState } from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.parts[0]} {props.parts[1]}
    </p>
  );
};

const Content = (props) => {
  const part1 = [props.parts[0].name, props.parts[0].exercises];
  const part2 = [props.parts[1].name, props.parts[1].exercises];
  const part3 = [props.parts[2].name, props.parts[2].exercises];

  return (
    <div>
      <Part parts={part1} />
      <Part parts={part2} />
      <Part parts={part3} />
    </div>
  );
};

const Total = (props) => {
  const totalOfExercises =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;

  return <p>Number of exercises {totalOfExercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
