import countryService from '../services/country';

const ShowCountry = ({ country }) => {
  if (!country) {
    return null; // Return null if no country is provided
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
    </div>
  );
};

export default ShowCountry;