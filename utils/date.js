function getWeekNumber(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const days = Math.floor((date - firstDayOfMonth) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + firstDayOfMonth.getDay() + 1) / 7);
    return isNaN(weekNumber) ? 1 : weekNumber;
}

// Fungsi untuk mengelompokkan data per minggu dan menggabungkan harga
function groupDataByWeek(data, month, year) {
    const weeklyData = {};

    data.forEach(item => {
        const itemDate = new Date(`${item.tanggal} ${year}`);
        const weekNumber = getWeekNumber(itemDate);

        const weekKey = `Minggu ${weekNumber}`;
        if (!weeklyData[weekKey]) {
            weeklyData[weekKey] = {
                tanggal: weekKey,
                harga: 0
            };
        }

        weeklyData[weekKey].harga += parseInt(item.harga);
    });

    // Tambahkan minggu dengan harga 0 jika tidak ada data di minggu tersebut
    for (let week = 1; week <= 4; week++) {
        const weekKey = `Minggu ${week}`;
        if (!weeklyData[weekKey]) {
            weeklyData[weekKey] = {
                tanggal: weekKey,
                harga: 0
            };
        }
    }

    return Object.values(weeklyData);
}

module.exports = { groupDataByWeek }