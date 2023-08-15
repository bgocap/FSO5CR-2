import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

const ShowCountry = ({country}) =>{
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>Common name: <b>{country.name.common}</b></p>
      <p>Area <b>{country.area} &#13217;</b> </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language=><li key={language}>{language}</li>)}
      </ul>
      <h2 >Flag:</h2>
       <p style={{fontSize:150,margin:0}}>{country.flag}</p> 
    </div>
  )
}


const Results =({allCountries,countries,handleClick})=>{
  if(countries.length==allCountries.length||countries==''){
    return <p>Write the country you want to know about</p>
  }
  if(countries.length<11){
    return (
      <div>
      {countries.map(country=>{
        if(country.show===true){
          return <ShowCountry key={country.name.common} country={country}/> 
        }else{
          return  (<p key={country.name.common}>{country.name.common} <button onClick={()=>handleClick(country)}>show</button></p>) 
        }
      })}
    </div>
    )
  }
  return( <p>Too many matches, specify</p>)
}
  


const App = () => {
  const [allCountries,setAllCountries]= useState([])
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  
  useEffect(()=>{
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
          const allCountries=response.data
          setAllCountries(allCountries)
        })
      },[])
  
  const handleChange = (event) => {
    const filteredCountries=allCountries
    .filter(
      filteredCountries=>
      filteredCountries.name.common.toLowerCase().match(event.target.value.toLowerCase()))
    .reduce((modifiedCountries, item) => {
        item={...item,show:false}
        modifiedCountries.push(item)
        return modifiedCountries
      },[])
    setCountries(filteredCountries)
    setValue(event.target.value)
  }

  const changeView = (country) =>{
    const countryNewView={...country, show:true}
    const newCountries= countries.map(item=>{
      if(item.name.common===countryNewView.name.common){
        return {...countries,...countryNewView}
      }
      return item
    })
    setCountries(newCountries)
  }
  
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        find countries : <input value={value} onChange={handleChange} />
      </form>
      <Results countries={countries} handleClick={changeView} allCountries={allCountries}/>
      
    </div>
  )
}

export default App;
