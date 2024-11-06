/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

const Header = ({ city, updateCity }) => {
  const [localCity, setLocalCity] = useState("");

  useEffect(() => {
    const userCity = localStorage.getItem("userCity");
    if (userCity) {
      setLocalCity(userCity);
      updateCity(userCity);
    }
  }, [updateCity]);

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          const countyName = data.address.county;
          fetch("https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json")
            .then((response) => response.json())
            .then((result) => {
              if (
              
                result.includes(countyName.toLowerCase())
              ) {
                localStorage.setItem("userCity", countyName);
                setLocalCity(countyName);
                updateCity(countyName); 
              } else {
                alert("Kota tidak terdaftar dalam API.");
              }
            })
            .catch((error) => {
              console.error("Error fetching city list:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
        });
    });
  };

  return (
    <div className="px-4 md:px-16 py-2 bg-transparent shadow-md">
      <div className="flex justify-between items-center w-full">
        <div className="text-white">
          <h1 className="text-2xl font-bold">Jadwal Sholat</h1>
          <p>{city || localCity}</p>
        </div>
        <div>
          <span
            className="cursor-pointer hover:opacity-90"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
