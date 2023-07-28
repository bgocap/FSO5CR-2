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

  export default Course