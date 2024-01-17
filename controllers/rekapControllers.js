const PelangganModel = require('../models/PelangganModels');
const RekapModel = require('../models/RekapModels');

exports.get = async (req, res, next) => {
    try {
        const get = await RekapModel.findAll({ order: [['createdAt', 'ASC']] });
        res.status(200).json({ success: true, total: get.length, data: get })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}

exports.exportToExcel = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, msg: '' })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}

exports.searchTelp = async (req, res, next) => {
    try {
        const check = await RekapModel.count({ where: { no_telp: req.body.no_telp } })
        const get = await RekapModel.findOne({ where: { no_telp: req.body.no_telp } })
        if (check !== 0) {
            return res.status(400).json({ success: false, msg: 'Data tidak ditemukan!' });
        }
        res.status(200).json({ success: true, data: get })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}