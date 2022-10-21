const CountryWeather = ({country, weather}) => {
    if (Object.keys(weather).length === 0) {
        return (
            <div>
                Still loading weather data for {country}.
            </div>
        )
    }
    return (
        <div>
            <h2>Weather in {country}</h2>
            <p>temperature {weather.main.temp} Celsius</p>
            <p>wind {weather.wind.speed} m/s</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather" width="150px"></img>
        </div>
    )
}

export default CountryWeather
