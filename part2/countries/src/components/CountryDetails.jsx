import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (weather) return;
        weatherService
            .getWeatherFor({
                latitude: country.location.latitude,
                longitude: country.location.longitude,
            })
            .then(setWeather);
    }, [country, weather]);

    const languages = Object.values(country.languages);
    return (
        <div>
            <h2>{country.name}</h2>
            <img src={country.flag.png} alt={country.flag.alt} height={40} />
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <div>
                <p>Languages:</p>
                <ul>
                    {languages.map((e) => (
                        <li key={e}>{e}</li>
                    ))}
                </ul>
            </div>
            <WeatherDetails
                capital={country.capital}
                weather={weather}
            ></WeatherDetails>
        </div>
    );
};

const WeatherDetails = ({ capital, weather }) => {
    if (!weather) return null;

    const temperature = `${weather.main.temp} °C`;
    const wind = `${weather.wind.speed} km/h`;
    const icon = weather.weather[0].icon;

    return (
        <>
            <h3>Weather in {capital}</h3>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={`Icon for weather in ${capital}`}
            />
            <div>
                <p>Temperature: {temperature}</p>
                <p>Wind: {wind}</p>
            </div>
        </>
    );
};

export default CountryDetails;
