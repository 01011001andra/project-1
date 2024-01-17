const PelangganModel = require("../models/PelangganModels");
const RekapModel = require("../models/RekapModels");

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
            totalKg: req.body.totalKg,
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
            totalKg: req.body.totalKg,
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
exports.complete = async (req, res, next) => {
    try {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '-' + mm + '-' + yyyy;
        const get = await PelangganModel.findOne({ where: { id: req.params.id } })
        await RekapModel.create({
            tanggal: formattedToday,
            totalKg: get.totalKg,
            no_telp: get.no_telp,
            alamat: get.alamat,
            harga: req.body.harga
        });
        next();
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    };
}