/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const SelectLocate = ({ city, updateCity }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://my-api-tau.vercel.app/api/islami/kota-jadwal-sholat"
        );
        if (response.ok) {
          const data = await response.json();
          setCities(data.result);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCities();
  }, []);

  const filteredCities = cities.filter((cityName) =>
    cityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (selectedCity) => {
    updateCity(selectedCity);
    localStorage.setItem("userCity", selectedCity);
    setShowDropdown(false);
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative mt-4">
        <div
          className={`bg-gray-100 py-2 px-6 ${
            showDropdown ? "rounded-t-md" : "rounded-md"
          } cursor-pointer shadow-md w-60`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex items-center justify-between">
            <p className="text-indigo-500 font-semibold">{city || "Pilih kota"}</p>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>
        {showDropdown && (
          <div className="absolute top-10 bg-white w-60 shadow-md rounded-md z-20">
            <input
              type="text"
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Cari Kota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="max-h-80 overflow-y-auto">
              {filteredCities.map((cityName, index) => (
                <div
                  key={index}
                  className="py-2 px-6 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleCitySelect(cityName)}
                >
                  {cityName}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectLocate;
