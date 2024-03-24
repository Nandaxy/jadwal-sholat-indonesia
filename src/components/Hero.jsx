/* eslint-disable react/prop-types */
const Hero = ({ city }) => {

    const now = new Date()
    const bulan = now.getMonth()
    const tahun = now.getFullYear()

    const namaBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

  return (
    <div className="flex items-center justify-center">
      <div className="text-white mt-8 text-center">
        <h1 className="text-xl font-bold">Jadwal Sholat untuk {city}</h1>
        <p>{namaBulan[bulan]} - {tahun}</p>
      </div>
    </div>
  );
};

export default Hero;
