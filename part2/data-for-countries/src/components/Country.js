import CountryWeather from './CountryWeather'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ( {name, capital, area, languages, imageURL, country} ) => {
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  const api_call = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}` 
  
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    axios
    .get(api_call)
    .then(response => 
      {setWeather(response.data)
      console.log('promise fulfilled2')
    })
  }, []) 

  return (
      <div>
        <h2>{name}</h2>
        <p>capital {capital} <br/> area {area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.values(languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={imageURL} alt="flag" width="150px"></img>
        <CountryWeather country={name} weather={weather}/>
      </div>
    )
}

export default Country

// The Object.values() method returns an array of a given object's own enumerable property values (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)