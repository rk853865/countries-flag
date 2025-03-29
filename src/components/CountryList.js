import React, { useEffect, useState } from "react";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Ensures initial content is displayed
  }

  return (
    <div>
      <h1>Country Flags</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {countries.length > 0 ? (
          countries.map((country) => (
            <div key={country.name} style={{ textAlign: "center" }}>
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`} // Ensures alt text for accessibility
                style={{ width: "100px", height: "60px" }}
              />
              <p>{country.name}</p>
            </div>
          ))
        ) : (
          <p>No countries available.</p>
        )}
      </div>
    </div>
  );
};

export default CountryList;
