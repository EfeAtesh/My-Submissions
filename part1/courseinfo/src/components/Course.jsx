const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Part = ({ part, exercises }) => {
  return (
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <div>
      <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

export default Course