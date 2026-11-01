import { useEffect, useState} from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';
import countryService from './services/country';


const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        countryService
            .getAll()
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
                setError('Countries could not be loaded.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
        <Filter filter={filter} setFilter={setFilter} />
        {loading && <p>Loading countries...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <Countries countries={filteredCountries} />}
    </div>
  );
};

export default App;