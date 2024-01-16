const PelangganModel = require("../models/pelangganModel")

exports.get = async (req, res, next) => {
    try {
        const get = await PelangganModel.findAll({
            order: [['status', 'ASC']]
        });
        res.status(200).json({ success: true, data: get, total: get.length });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}
exports.getOne = async (req, res, next) => {
    try {
        const get = await PelangganModel.findOne({ where: { id: req.params.id } });
        res.status(200).json({ success: true, data: get })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}
exports.create = async (req, res, next) => {
    try {
        await PelangganModel.create({
            nama: req.body.nama,
            alamat: req.body.alamat,
            no_telp: req.body.no_telp,
            status: 0,
        });
        res.status(200).json({ success: true, msg: 'Pelanggan Berhasil ditambah!' })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}
exports.update = async (req, res, next) => {
    try {
        await PelangganModel.update({
            nama: req.body.nama,
            alamat: req.body.alamat,
            no_telp: req.body.no_telp,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ success: true, msg: 'Data Pelanggan Berhasil diubah!' })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}
exports.remove = async (req, res, next) => {
    try {
        await PelangganModel.destroy({ where: { id: req.params.id } });
        res.status(200).json({ success: true, msg: 'Pelanggan Berhasil dihapus!' })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}