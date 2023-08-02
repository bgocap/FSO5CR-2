import { cloneElement, useState } from 'react'

const PersonForm = ({handleSubmit,nameValue,nameChangeHandle,numberValue,numberChangeHandle}) => (
  <form onSubmit={handleSubmit}>
    <div> name: <input value={nameValue} onChange={nameChangeHandle} /> </div>
    <div> number: <input value={numberValue} onChange={numberChangeHandle} /> </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
const Contact = ({contact}) => <p>{contact.name} {contact.number}</p>
const Persons= ({data}) =>(
  <div>{data.map(filteredPerson=>
    <Contact key={filteredPerson.id} contact={filteredPerson}/>
  )}</div>
)
const Filter = ({inputValue,inputHandle}) => <div> filter shown with: <input value={inputValue} onChange={inputHandle} /> </div>

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const filteredPersons=
  persons.filter(filteredPersons=>
    filteredPersons.name.toLowerCase().match(filter.toLowerCase()))
  
  const addPerson = (event) => {

    event.preventDefault()
    const newId=persons.reduce((id,item)=>id=item.id+1,0)
    const personObject = {name:newName, number:newNumber, id:newId}
 
    persons.some(person=>person.name===newName)?
    alert(`${newName} is already added to phonebook`)
    :setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')

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
      < Persons data={filteredPersons} />
  </div>
  )
}

export default App
