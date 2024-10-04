import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchCountry.trim() === "") {
      setCountries([]);

      return;
    }

    if (searchCountry) {
      fetchCountry();
    }
  }, [searchCountry]);

  const fetchCountry = async () => {
    try {
      const url = `https://restcountries.com/v3.1/name/${searchCountry}`;

      const response = await axios.get(url);
      setCountries(response.data);

      if (response.data.length === 1) {
        const capital = response.data[0].capital;
        fetchWeather(capital);
      }
    } catch (error) {
      console.error("Could not fetch country data: ", error.data);
    }
  };

  const fetchWeather = async (capital) => {
    try {
      const API_KEY = import.meta.env.VITE_SOME_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);

      setWeather(response.data);
    } catch (error) {
      setWeather(null);
      console.error("Could not fetch weather data: ", error.data);
    }
  };

  const handleSearchCountries = (e) => {
    const countryName = e.target.value;

    if (countryName.trim() === "") {
      setSelectedCountry(null);
    }

    setSearchCountry(countryName);
    fetchWeather(countryName);
  };

  const handleCountryButton = (country) => {
    setSelectedCountry(country);
    const capital = country.capital;

    fetchWeather(capital);
  };

  return (
    <>
      <h1>Country information</h1>
      <label>
        Find countries:
        <input
          type="text"
          value={searchCountry}
          onChange={handleSearchCountries}
        ></input>
      </label>

      {countries.length > 10 && <div>Too many countries</div>}

      {countries.length <= 10 && countries.length > 1 && (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleCountryButton(country)}>Show</button>
            </div>
          ))}
        </div>
      )}

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <h3>Languages:</h3>
          {Object.values(selectedCountry.languages).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
          <br />
          <img
            src={selectedCountry.flags.png}
            alt={selectedCountry.flags.alt}
          ></img>

          {weather && (
            <div>
              <h2>Weather in {selectedCountry.capital}</h2>
              <p>Temperature now: {weather.main.temp}°C</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
              ></img>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}

      {countries.length === 1 && (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Population: {countries[0].population}</p>
          <h3>Languages:</h3>
          {Object.values(countries[0].languages).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
          <br />
          <img src={countries[0].flags.png} alt={countries[0].flags.alt}></img>

          {weather && (
            <div>
              <h2>Weather in {countries[0].capital}</h2>
              <p>Temperature now: {weather.main.temp}°C</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
              ></img>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
