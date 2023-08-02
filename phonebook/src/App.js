import { cloneElement, useState } from 'react'

const Contact = ({contact}) => <p>{contact.name} {contact.number}</p> 

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div> filter shown with: <input value={filter} onChange={handleFilterChange} /> </div>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <div>{filteredPersons.map(filteredPerson=>
          <Contact key={filteredPerson.id} contact={filteredPerson}/>
        )}</div>
    </div>
  )
}

export default App
