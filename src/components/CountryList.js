import React, { useEffect, useState } from "react";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <div>
      <h1>Country Flags</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {countries.map((country) => (
          <div key={country.name} style={{ textAlign: "center" }}>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              style={{ width: "100px", height: "60px" }}
            />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
