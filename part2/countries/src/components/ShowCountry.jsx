import Weather from './Weather';

const ShowCountry = ({ country }) => {
  if (!country) {
    return null; // Return null if no country is provided
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital.join(', ')}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      <h2>Weather in {country.capital[0]}</h2>
      <Weather city={country.capital[0]} />
    </div>
  );
}
  
export default ShowCountry;