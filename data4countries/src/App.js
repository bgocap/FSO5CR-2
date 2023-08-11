import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

const ShowCountry = ({country}) =>{
  //console.log(country)
  //const languages = Object.values(country.languages)
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

const Results = ({input,allCountries}) => {
  //console.log(input)
  if(input===''){
    //INPUT IS NULL
    return <p>Write the country you want to know about</p>
  }else{
    //INPUT IS NOT NULL
    //let allCountriesFiltered =[]
    const allCountriesFiltered=
    allCountries.filter(filteredCountries=>filteredCountries.name.common.toLowerCase().match(input.toLowerCase()))
    //console.log(allCountriesFiltered)

    if(allCountriesFiltered.length<11){
      //INPUT HAS LESS OR 10 RESULTS
      if(allCountriesFiltered.length===1){
        const singleCountry= allCountriesFiltered[0]
        //console.log(singleCountry)
        return <ShowCountry country={singleCountry}/>
      }else{
        return (
          <div>
            {allCountriesFiltered.map(country=><p key={country.name.common}>{country.name.common}</p>)}
          </div>
        )
      }

    }else{return <p>Too many matches, specify</p>}

  }
}
  


const App = () => {
  const [allCountries,setAllCountries]= useState([])
  const [value, setValue] = useState('')
  //const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  //first fetch (everything)
  useEffect(()=>{
      //console.log('fetching countries')
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
          const allCountries=response.data
          setAllCountries(allCountries)
        })
      },[])
  
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        find countries : <input value={value} onChange={handleChange} />
      </form>
      <Results input={value} allCountries={allCountries}/>  
    </div>
  )
}




export default App;
