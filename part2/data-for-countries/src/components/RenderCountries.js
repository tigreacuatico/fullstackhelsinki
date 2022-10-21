import Country from './Country'

const RenderCountries = ( {countries, filter} ) => {
  if (filter !== '') {
    const n = countries.length
    if (n === 1)
      return (
        <div>
          {countries.map(country => <Country key={country.name.common} name={country.name.common} capital={country.capital} area={country.area} languages={country.languages} imageURL={country.flags.png} country={country}/> )}
        </div>
      )
    else if (n > 10) return (<div>Too many matches, specify another filter</div>)
    return (
      <div>
        {countries.map(country => <div key={country.name.common}>
          {country.name.common} <button>show</button></div>)}
      </div>
    )
  }
}

export default RenderCountries    


