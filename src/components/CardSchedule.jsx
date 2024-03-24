/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Countdown from "./Coundown";

import Moon from "../assets/icon/moon";
import Moon2 from "../assets/icon/moon2";
import Sunrise from "../assets/icon/sunrise";
import Sun from "../assets/icon/sun";
import Sun2 from "../assets/icon/sun2";
import Sun3 from "../assets/icon/sun3";
import Sunset from "../assets/icon/sunset";
import Moon3 from "../assets/icon/moon3";

const CardSchedule = ({ city }) => {
  const [prayerSchedule, setPrayerSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDateIndex, setCurrentDateIndex] = useState();
  const [upcomingPrayer, setUpcomingPrayer] = useState("");
  const [upcomingPrayerTime, setUpcomingPrayerTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const tanggal = now.getDate();
    setCurrentDateIndex(tanggal - 1);
  }, []);

  useEffect(() => {
    const fetchPrayerSchedule = async () => {
      try {
        const response = await fetch(
          `https://my-api-tau.vercel.app/api/islami/jadwal-sholat?kota=${city}`
        );
        const data = await response.json();
        if (data.status && data.result) {
          setPrayerSchedule(data.result);
          setLoading(false);
          findUpcomingPrayer(data.result[currentDateIndex]);
        } else {
          console.log("Error fetching prayer schedule data");
        }
      } catch (error) {
        console.error("Error fetching prayer schedule data:", error);
      }
    };

    if (city) {
      fetchPrayerSchedule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const findUpcomingPrayer = (dailySchedule) => {
    if (dailySchedule) {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const nextPrayer = Object.entries(dailySchedule).find(
        // eslint-disable-next-line no-unused-vars
        ([prayerName, prayerTime]) => {
          const [hours, minutes] = prayerTime.split(":").map(Number);
          const prayerTimeInMinutes = hours * 60 + minutes;
          return prayerTimeInMinutes > currentTime;
        }
      );

      if (nextPrayer) {
        setUpcomingPrayer(nextPrayer[0]);
        setUpcomingPrayerTime(nextPrayer[1]);
      }
    }
  };

  const goToPreviousDay = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDateIndex < prayerSchedule.length - 1) {
      setCurrentDateIndex(currentDateIndex + 1);
    }
  };

  function formatDate(dateString) {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  return (
    <div className="flex flex-col items-center  pb-8">
      <Countdown name={upcomingPrayer} time={upcomingPrayerTime} />
      {loading ? (
        <div className="h-80 w-80 animate-pulse bg-gray-200 rounded-md"></div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-md min-w-80 mb-4">
            <p className="text-gray-800 font-semibold text-center">
              Date: {formatDate(prayerSchedule[currentDateIndex].tanggal)}
            </p>

            <div className=" px-2 py-3 border rounded-md mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Moon />
                  </span>
                  <p>Imsak:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].imsyak}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Moon2 />
                  </span>
                  <p>Shubuh:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].shubuh}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Sunrise />
                  </span>
                  <p>Terbit:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].terbit}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Sun />
                  </span>
                  <p>Dhuha:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].dhuha}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Sun2 />
                  </span>
                  <p>Dzuhur:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].dzuhur}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Sun3 />
                  </span>
                  <p>Ashr:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].ashr}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Sunset />
                  </span>
                  <p>Magrib:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].magrib}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <Moon3 />
                  </span>
                  <p>Isya:</p>
                </div>
                <p className="text-gray-800">
                  {prayerSchedule[currentDateIndex].isya}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-80 mt-2">
            <button
              onClick={goToPreviousDay}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md transition-colors hover:bg-indigo-700 text-sm font-semibold"
            >
              Previous
            </button>
            <button
              onClick={goToNextDay}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md transition-colors hover:bg-indigo-700 text-sm font-semibold"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSchedule;
