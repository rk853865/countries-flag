import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CountryList.css";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err.message);
      }
    };

    fetchCountries();
  }, []);

  if (error) {
    return <div className="error">Failed to load countries: {error}</div>;
  }

  return (
    <div className="country-list">
      {countries.map((country) => (
        <div key={country.name} className="country-item">
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            className="country-flag"
          />
          <p className="country-name">{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
