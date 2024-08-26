const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = (props) => {
  const allExercisesArr = props.parts.flatMap((course) => course.exercises);

  const totalOfExercises = allExercisesArr.reduce(
    (firstExercise, nextExercise) => firstExercise + nextExercise
  );

  return (
    <p>
      <b>Total of {totalOfExercises} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
