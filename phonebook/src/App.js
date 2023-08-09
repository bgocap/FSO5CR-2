import { useEffect,useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const PersonForm = ({handleSubmit,nameValue,nameChangeHandle,numberValue,numberChangeHandle}) => (
  <form onSubmit={handleSubmit}>
    <div> name: <input value={nameValue} onChange={nameChangeHandle} /> </div>
    <div> number: <input value={numberValue} onChange={numberChangeHandle} /> </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons= ({data,selectId}) =>{
  return(
  <div>{data.map(filteredPerson=>
    <p key={filteredPerson.id} > {filteredPerson.name} {filteredPerson.number} <button onClick={()=>selectId(filteredPerson.id,filteredPerson.name)}> delete</button> </p>
  )}</div>
  )

}
const Filter = ({inputValue,inputHandle}) => <div> filter shown with: <input value={inputValue} onChange={inputHandle} /> </div>

const Notification = ({ message,style }) => {
  let notificationStyle = {
    fontSize: 18,
    borderRadius: 10,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    padding:5,
    backgroundColor: 'rgb(204, 255, 204)',
    color: 'rgb(0, 153, 51)'
  }
  if (message === null) {
    return null
  }
  if (style==='error'){
    notificationStyle={...notificationStyle,backgroundColor: 'rgb(255, 159, 128)',
    color: 'rgb(204, 51, 0)'}
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setnotificationMessage] = useState({text:null,type:null})

  useEffect(()=>{personService.getAll().then(intialPersons=>{setPersons(intialPersons)})},[])
  
  const filteredPersons=
  persons.filter(filteredPersons=>
    filteredPersons.name.toLowerCase().match(filter.toLowerCase()))
  
  const addPerson = (event) => {
    
    event.preventDefault()

    if(persons.some(person=>person.name===newName)){
      if(window.confirm(`${newName} is already in the phonebook, do you want to replace with new number?`)){
        const personToUpdate = persons.find(n => n.name === newName)
        const updatedPerson = {...personToUpdate, number:newNumber}
        personService
          .update(updatedPerson.id,updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            const newNotificationMessage= {text:`${newName} number was correctly changed`,type:'success'}
            setnotificationMessage(newNotificationMessage)
            setTimeout(() => {setnotificationMessage({text:null,type:null})}, 5000)
          })
          .catch(error=>{
            console.log(error)
            const newNotificationMessage= {text:`Information of ${newName} has already been removed from the server`,type:'error'}
            setnotificationMessage(newNotificationMessage)
            setTimeout(() => {setnotificationMessage({text:null,type:null})}, 5000)
          })
      }
    }else{
      const newId=persons.reduce((id,item)=>id=item.id+1,0)
      const personObject = {name:newName, number:newNumber, id:newId}
      personService
        .create(personObject)
        .then(returnedPerson=>setPersons(persons.concat(returnedPerson)))
      const newNotificationMessage= {text:`${newName} was correctly added`,type:'success'}
      setnotificationMessage(newNotificationMessage)
      setTimeout(() => {setnotificationMessage({text:null,type:null})}, 5000)
    }
    
    setNewName('')
    setNewNumber('')

  }

  const handleDeletePerson=(id,name)=>{
    if(window.confirm(`Are you sure you want to delete ${name} from the phonebook?`)){
      personService.deleteOne(id)
      const updatedPersons=persons.filter(notDeletedPersons=>notDeletedPersons.id!==id)
      setPersons(updatedPersons)
    }
  }

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilter(event.target.value)}

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage.text} style={notificationMessage.type} />
      < Filter inputValue={filter} inputHandle={handleFilterChange} />
      <h3>Add a new</h3>
      < PersonForm
        handleSubmit={addPerson}
        nameValue={newName}
        nameChangeHandle={handleNameChange}
        numberValue={newNumber}
        numberChangeHandle={handleNumberChange}
      />
      <h3>Numbers</h3>
      < Persons data={filteredPersons} selectId={handleDeletePerson}  />
  </div>
  )
}

export default App
