const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {name : 'Fundamentals of React', exercises: 10},
    {name : 'Using props to pass data', exercises: 7},
    {name : 'State of a component', exercises: 14}
  ]

  const exercises1 = parts.exercises
  const exercises2 = parts.exercises
  const exercises3 = parts.exercises

  return (
    <div>
      <Header course={course} />
      <Content part1={parts} exercises1={exercises1} part2={parts} exercises2={exercises2} part3={parts} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

export default App