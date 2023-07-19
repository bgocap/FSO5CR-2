const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Course = ({course}) => {

  const Header = ({name}) => {
    //console.log(name)
    return(
    <h1>{name}</h1>
    )
  }

  const Part = ({name,exercises}) => {
    return(<p>{name} {exercises}</p>)
  }

  const Content = ({content}) => {
    //console.log(course.parts)
    //const mapsresult = course.parts.map(part=>part.name)
    //console.log(mapsresult)
    return(
      <div>
        {content.map(part=>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }

  const Total = ({parts}) => {
    let total=0;
    parts.map((part) => {
      total=total+part.exercises
      //console.log(total)
    })
    //console.log(total)
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
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }

  return <Course course={course} />
}

export default App