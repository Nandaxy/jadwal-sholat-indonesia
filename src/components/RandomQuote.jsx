import { useEffect, useState } from "react";

const RandomQuote = () => {
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const quotes = [
      "Hidup itu indah!",
      "Jangan pernah menyerah pada mimpi-mimpi Anda.",
      "Lakukan yang terbaik dan biarkan Tuhan yang menentukan.",
      "Setiap hari adalah kesempatan baru untuk menjadi lebih baik dari sebelumnya.",
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    setRandomQuote(selectedQuote);
  }, []);

  return (
    <div className="mb-2 py-3">
      <p className="text-white text-light max-w-80 text-[13px] text-center opacity-80">
        <q>{randomQuote}</q>
      </p>
    </div>
  );
};

export default RandomQuote;
