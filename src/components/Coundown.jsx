/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import RandomQuote from "./RandomQuote";

const Countdown = ({ name, time }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeRemaining = calculateRemainingTime(time);
      if (timeRemaining === 0) {
        clearInterval(intervalId);
        setLoading(false);
      } else {
        setRemainingTime(timeRemaining);
        setLoading(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  function calculateRemainingTime(targetTime) {
    const currentTime = new Date().getTime();
    const [hours, minutes] = targetTime.split(":").map(Number);
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);
    const targetTimestamp = targetDate.getTime();

    return Math.max(0, targetTimestamp - currentTime);
  }

  function formatTime(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="pt-5 pb-1 text-center">
          {name ? (
            <h1 className="text-2xl text-white font-bold capitalize">{name}</h1>
          ) : (
            loading && (
              <div className="mt-2 h-8 w-20 mx-auto bg-white font-bold animate-pulse rounded-md"></div>
            )
          )}
          {loading ? (
            <div>
              <div className="mt-2 h-12 w-40 bg-white font-bold animate-pulse rounded-md"></div>
            </div>
          ) : (
            <div className="mt-2 text-4xl text-white font-bold">
              <p className="drop-shadow-2xl ">{formatTime(remainingTime)}</p>
            </div>
          )}
        </div>
      </div>
      <RandomQuote />
    </>
  );
};

export default Countdown;
