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

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{personService.getAll().then(intialPersons=>{setPersons(intialPersons)})},[])
  
  const filteredPersons=
  persons.filter(filteredPersons=>
    filteredPersons.name.toLowerCase().match(filter.toLowerCase()))
  
  const addPerson = (event) => {

    event.preventDefault()

    if(person=>person.name===newName){
      if(window.confirm(`${newName} is already in the phonebook, do you want to replace with new number?`)){
        const personToUpdate = persons.find(n => n.name === newName)
        const updatedPerson = {...personToUpdate, number:newNumber}
        personService.update(updatedPerson.id,updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
        })
      }
    }else{
      const newId=persons.reduce((id,item)=>id=item.id+1,0)
      const personObject = {name:newName, number:newNumber, id:newId}
      personService.create(personObject).then(returnedPerson=>setPersons(persons.concat(returnedPerson)))
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
      <h2>Phonebook</h2>
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
