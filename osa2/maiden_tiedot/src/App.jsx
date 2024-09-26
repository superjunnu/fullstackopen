import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const renderLanguages = () => {
    return Object.values(country.languages).map((value, index) => (
      <li key={index}>{value}</li>
    ));
  };

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>{renderLanguages()}</ul>
      <br />
      <img src={country.flags.png} alt="Country flag"></img>
    </div>
  );
};

const Content = ({ countries, setFilteredCountries }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length > 1 && countries.length < 10) {
    return (
      <>
        {countries.map((country, index) => (
          <div key={index}>
            {country.name.common}

            <button onClick={() => setFilteredCountries([country])}>
              Show
            </button>
          </div>
        ))}
      </>
    );
  } else if (countries.length > 10) {
    return <div>Too many matches</div>;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    if (searchCountry.trim() === "") {
      setCountries([]);
      setFilteredCountries([]);
    }

    const url = `https://studies.cs.helsinki.fi/restcountries/api/all`;

    if (searchCountry) {
      axios.get(url).then((response) => {
        // console.log(response.data);

        setCountries(response.data);
      });
    }
  }, [searchCountry]);

  const searchCountries = (e) => {
    const countryName = e.target.value;

    const sortedCountries = countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .map((country) => country);

    setFilteredCountries(sortedCountries);
    setSearchCountry(countryName);
  };

  return (
    <>
      <h1>Country information</h1>
      <label>
        Find countries:
        <input
          type="text"
          value={searchCountry}
          onChange={searchCountries}
        ></input>
      </label>
      <Content
        countries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </>
  );
}

export default App;
