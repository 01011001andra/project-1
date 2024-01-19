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
        const get = await RekapModel.findOne({ where: { no_telp: req.params.no_telp } });
        res.status(200).json({ success: true, msg: '' })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}