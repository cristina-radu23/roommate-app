// SearchBar.tsx
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FilterCriteria } from "./HomePage";

interface SearchBarProps {
  onSearch: (criteria: FilterCriteria) => void;
}

interface CityOption {
  value: string;
  label: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cities");
        const data = await res.json();
        const formatted = data.map((city: { cityId: string; cityName: string }) => ({
          value: city.cityId,
          label: city.cityName,
        }));
        setCities(formatted);
      } catch (err) {
        console.error("Failed to fetch cities", err);
      }
    };
    fetchCities();
  }, []);

  const handleSearch = () => {
    onSearch({ city: selectedCity?.value });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center " style={{ backgroundColor: "#f0d4f3",
      width: "100%", height:"300px", padding:"0px",}}>

      <div className="position-relative w-100" 
        style={{ 
            borderLeft:"0px",
            paddingLeft: "0px",
            marginLeft:"0px",
            height: "100%",
          backgroundColor: "#f0f4f8",
            width: "100vw",
          }}
      >
   {/* Search bar container */}
   <div
          className="position-absolute start-50 top-50 translate-middle shadow d-flex justify-content-between align-items-center"
          style={{
            background: "white",
            borderRadius: "50px",
            padding: "10px 20px",
            width: "90%",
            maxWidth: "900px",
            zIndex: 10,
          }}
        >
          <div style={{ flex: 2, minWidth: 0 }}>
            <Select
              options={cities}
              value={selectedCity}
              onChange={(option) => setSelectedCity(option)}
              placeholder="Select a city"
              classNamePrefix="react-select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: "50px",
                  height: "42px",
                }),
              }}
            />
          </div>
          <button
            className="btn btn-outline-secondary ms-3"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </button>
          <button
            className="btn btn-success ms-2"
            style={{ minWidth: "100px", borderRadius: "50px" }}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div
            className="position-absolute w-100"
            style={{ top: "calc(50% + 80px)", left: 0, padding: "0 5%" }}
          >
            <div className="card p-4 shadow">
              <h5 className="mb-3">Filter Options</h5>
              <p>Integrate your filter panel here.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchBar;
