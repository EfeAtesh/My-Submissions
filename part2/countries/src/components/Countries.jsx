const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca3}>{country.name.common}</div>
        ))}
      </div>
    );
  }
  if (countries.length === 0) {
    return <div>No country found</div>;
  }
  if (countries.length === 1) {
    return (<><h1>{countries[0].name.common}</h1><p>Capital {countries[0].capital}</p><p>Area {countries[0].area}</p>
    <h1>Languages
    </h1>
    <ul>
      {Object.values(countries[0].languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} width="200" />
    </>
    );
  }

  return <div>{countries[0].name.common}</div>;
}

export default Countries