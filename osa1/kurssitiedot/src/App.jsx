import { useState } from "react";

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.parts[0]} {props.parts[1]}
    </p>
  );
};

const Content = (props) => {
  const part1 = [props.course.parts[0].name, props.course.parts[0].exercises];
  const part2 = [props.course.parts[1].name, props.course.parts[1].exercises];
  const part3 = [props.course.parts[2].name, props.course.parts[2].exercises];

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
    props.course.parts[0].exercises +
    props.course.parts[1].exercises +
    props.course.parts[2].exercises;

  return <p>Number of exercises {totalOfExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
