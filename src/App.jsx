import { useState } from "react";
import CardSchedule from "./components/CardSchedule";
import SelectLocate from "./components/SelectLocate";
import Hero from "./components/Hero";
import Header from "./components/Header";

const App = () => {
  const [city, setCity] = useState("");
  // console.log(city);
  const updateCity = (newCity) => {
    setCity(newCity);
  };

  return (
    <>
      <div className="w-full min-h-[95vh] md:min-h-screen bg-indigo-500">
        <Header city={city} updateCity={updateCity} />
        <Hero city={city} />
        <SelectLocate city={city} updateCity={updateCity} />
        <CardSchedule city={city} />
      </div>
    </>
  );
};

export default App;
