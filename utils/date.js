// Fungsi untuk mendapatkan nomor minggu dari tanggal
function getWeekNumber(date) {
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 }); // week starts on Monday (1)
    const weekNumber = format(startOfWeekDate, 'w');
    return weekNumber;
}

module.exports = { getWeekNumber }