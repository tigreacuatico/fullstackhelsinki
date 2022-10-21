import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchFilter from './components/SearchFilter'
import RenderCountries from './components/RenderCountries'

const App = () => {
  const [countries, setCountries] = useState([{}])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all') //?fields=name,capital,area,languages,flags
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <SearchFilter value={newFilter} onChange={handleFilterChange}/>
      <RenderCountries countries={countriesToShow} filter={newFilter}/>
    </div>
  )
}

export default App


