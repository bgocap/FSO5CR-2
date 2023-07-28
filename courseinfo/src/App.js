const Course = ({course}) => {

  const Header = ({name}) => <h2>{name}</h2>

  const Part = ({name,exercises}) => <p>{name} {exercises}</p>

  const Content = ({content}) => {
    return(
      <div>
        {content.map(part=>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce((sum,item) => sum+item.exercises,0)
    return (
      <strong>Total of {total} exercises</strong>
    )
  }


  return (
  <div>
    <Header name={course.name}/>
    <Content content={course.parts}/>
    <Total parts={course.parts}/>
  </div>
  )
  
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course)=><Course key={course.id} course={course} />)}
    </div>
  )
}

export default App