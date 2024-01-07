import { useEffect, useState } from 'react';
import CountryDetails from './components/CountryDetails';
import countriesService from './services/countries';

const App = () => {
    const [query, setQuery] = useState('');
    const [countries, setCountries] = useState(null);

    useEffect(() => {
        if (countries) return;
        countriesService.getAll(query).then((data) => {
            data = data.map((e) => ({
                id: e.name.official,
                name: e.name.common,
                capital: e.capital,
                languages: e.languages,
                area: e.area,
                flag: e.flags,
                location: { latitude: e.latlng[0], longitude: e.latlng[1] },
            }));
            setCountries(data);
        });
    });

    const showCountryDetails = (country) => {
        setQuery(country.name);
    };

    const results = countries?.filter((e) =>
        e.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            Find countries
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <Results
                results={results}
                onShowClick={showCountryDetails}
            ></Results>
        </div>
    );
};

const Results = ({ results, onShowClick }) => {
    if (!results) return null;
    if (results.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (results.length === 1) {
        return <CountryDetails country={results[0]}></CountryDetails>;
    } else {
        return (
            <ul>
                {results.map((e) => (
                    <li key={e.name}>
                        {e.name}
                        <button onClick={() => onShowClick(e)}>show</button>
                    </li>
                ))}
            </ul>
        );
    }
};

export default App;
