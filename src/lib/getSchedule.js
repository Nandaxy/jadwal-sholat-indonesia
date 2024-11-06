/* eslint-disable no-unused-vars */
export const getSchedule = async (kota) => {
    const time = new Date()
    const tahun = time.getFullYear()
    const bulan = time.getMonth()
    const kotanya = kota.toLowerCase()
    try {
    const res = await fetch(`https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/refs/heads/master/adzan/${kotanya}/${tahun}/${bulan + 1}.json`)
    const data = await res.json()
    return data
    } catch (error) {
        return []
    }
}