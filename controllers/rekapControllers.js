const PelangganModel = require('../models/PelangganModels');
const RekapModel = require('../models/RekapModels');
const ExcelJS = require('exceljs');

exports.get = async (req, res, next) => {
    try {
        const get = await RekapModel.findAll({ order: [['createdAt', 'ASC']] });
        res.status(200).json({ success: true, total: get.length, data: get })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}

exports.exportToExcel = async (req, res, next) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '-' + mm + '-' + yyyy;
    try {
        const get = await RekapModel.findAll();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');
        worksheet.columns = [
            { header: 'Tanggal', key: 'tanggal', width: 15 },
            { header: 'No_telp', key: 'no_telp', width: 15 },
            { header: 'Total_Kg', key: 'totalKg', width: 15 },
            { header: 'Harga', key: 'harga', width: 15 },
        ];
        get.forEach((item) => {
            worksheet.addRow(item.dataValues);
        });
        const namaFile = `filename=Data-(${formattedToday}).xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; ${namaFile}`);
        await workbook.xlsx.write(res);
        res.status(200).json({ success: true, msg: 'Data Berhasil di download!' })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}

exports.searchTelp = async (req, res, next) => {
    try {
        const check = await RekapModel.count({ where: { no_telp: req.body.no_telp } })
        const get = await RekapModel.findOne({ where: { no_telp: req.body.no_telp } })
        if (check === 0) {
            return res.status(400).json({ success: false, msg: 'Data tidak ditemukan!' });
        }
        res.status(200).json({ success: true, data: get })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}