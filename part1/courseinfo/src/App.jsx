import React from 'react'
import Course from './components/Course'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10, id: 1},
      {name: 'Using props to pass data', exercises: 7, id: 2},
      {name: 'State of a component', exercises: 14, id: 3}
    ]
  }

  return (
    <><Course course={course} /><div>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises </div></>
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

export default App