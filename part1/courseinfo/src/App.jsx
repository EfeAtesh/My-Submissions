import React from 'react'
import Course from './components/Course'

const App = () => {
  const course = [{
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10, id: 1},
      {name: 'Using props to pass data', exercises: 7, id: 2},
      {name: 'State of a component', exercises: 14, id: 3}
    ]
  },
  {
    name: 'Node.js',
    parts: [
      {name: 'Routing', exercises: 10, id: 1},
      {name: 'Middlewares', exercises: 7, id: 2}
    ]
  }]

  return (
    <>{course.map(course => <Course key={course.name} course={course} />)}</>
  )
}

export default App