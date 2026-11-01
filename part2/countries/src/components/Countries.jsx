import { useState } from 'react';
import countryService from '../services/country';
import ShowCountry from './ShowCountry';

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  const handleShowCountry = (countryName) => {
    setError(null);
    countryService
      .getCountry(countryName)
      .then(response => {
        setSelectedCountry(response.data);
      })
      .catch(fetchError => {
        console.error('Error fetching country:', fetchError);
        setError('Country details could not be loaded.');
      });
  };

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length === 0) {
    return <div>No country found</div>;
  }

  if (selectedCountry) {
    return <ShowCountry country={selectedCountry} />;
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.cca3}>
            <span>{country.name.common} </span>
            <button type="button" onClick={() => handleShowCountry(country.name.common)}>
              Show
            </button>
          </div>
        ))}
      </div>
    );
  }

  return <ShowCountry country={countries[0]} />;
};

export default Countries;
