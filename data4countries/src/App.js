import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

const ShowCountry = ({country}) =>{
  const weatherIconUrl=` https://openweathermap.org/img/wn/${country.weather.weather[0].icon}@2x.png`
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital: <b>{country.capital}</b></p>
      <p>Area <b>{country.area} &#13217;</b> </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language=><li key={language}>{language}</li>)}
      </ul>
      <h2 >Flag:</h2>
       <p style={{fontSize:150,margin:0}}>{country.flag}</p> 
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: <b>{country.weather.main.temp}º C</b></p>
      <p>Weather: <b>{country.weather.weather[0].description}</b></p>
      <img style={{width:120}} src={weatherIconUrl} alt={country.capital}></img>
      <p>Wind: <b>{country.weather.wind.speed} km/h</b> </p>
    </div>
  )
}


const Results =({countries,handleClick})=>{
  if(countries===''){
    return <p>Write the country you want to know about</p>
  }else{
    if(countries.length===250){return( <p>Write the country you want to know about</p>)}
    if(countries.length<11){
      return (
        <div>
        {countries.map(country=>{
          if(country.show===true){
            return <ShowCountry key={country.name.common} country={country}/> 
          }else{
            return  (<p key={country.name.common}>{country.name.common} <button onClick={()=>{handleClick(country)}}>show</button></p>) 
          }
        })}
      </div>
      )
    }
    if(countries.length===1){return <ShowCountry key={countries[0].name.common} country={countries[0]}/>}
    return <p>Too many countries, espicfy</p>
  }
}
  


const App = () => {

  const [allCountries,setAllCountries]= useState([])
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [country,setCountry]= useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(()=>{
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
          const allCountries=response.data
          setAllCountries(allCountries)
        })
      },[])
  
  useEffect(()=>{
        if(country){
            axios.get('https://api.openweathermap.org/data/2.5/weather?lat='
                      +country.capitalInfo.latlng[0]+'&lon='
                      +country.capitalInfo.latlng[1]+'&appid='
                      +api_key+'&units=metric'
            )
            .then(response=>{
              const countryNewView={...country, show:true, weather:response.data}
              const newCountries= countries.map(item=>{
                if(item.name.common===countryNewView.name.common){
                    return {...countries,...countryNewView}
                }
                return item
              })
              setCountries(newCountries)
            })
            .catch(error => {console.error('An error occurred:', error)})
        }
  },[country])

  
  
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

    if(filteredCountries.length===1){setCountry(filteredCountries[0])}
    setCountries(filteredCountries)
    setValue(event.target.value)
  }

  const handleCountry = (country) =>{
    setCountry(country)
  }

  return (
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          find countries : <input value={value} onChange={handleChange} />
        </form>
        <Results countries={countries} handleClick={handleCountry}/>
      </div>
  )
  
}

export default App;
