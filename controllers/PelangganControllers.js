const { Sequelize } = require("sequelize");
const PelangganModel = require("../models/PelangganModels");
const RekapModel = require("../models/RekapModels");
const db = require("../config/db");

// MENAMPILKAN SEMUA DISKON
exports.get = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const searchTerm = req.query.searchTerm || "";

  try {
    let condition = {};

    // Membuat kondisi pencarian jika ada 'searchTerm'
    if (searchTerm) {
      condition = {
        [Sequelize.Op.or]: [
          {
            nama: {
              [Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
          {
            alamat: {
              [Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
          {
            no_telp: {
              [Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
        ],
      };
    }
    // Menghitung total data yang sesuai dengan kondisi pencarian
    const totalCount = await PelangganModel.count({ where: condition });

    // Hitung total halaman berdasarkan jumlah total data dan ukuran halaman
    const totalPages = Math.ceil(totalCount / pageSize);

    // Mendapatkan data pelanggan berdasarkan halaman dan kondisi pencarian
    const get = await PelangganModel.findAll({
      order: [["createdAt", "ASC"]],
      where: condition,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    // Mengirimkan respons dengan data yang ditemukan
    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      total: totalCount,
      data: get,
    });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// MENAMPILKAN 1 DISKON
exports.getOne = async (req, res, next) => {
  try {
    // Mendapatkan detail satu pelanggan berdasarkan ID
    const get = await PelangganModel.findOne({ where: { id: req.params.id } });
    // Mengirimkan respons dengan detail pelanggan
    res.status(200).json({ success: true, data: get });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// MEMBUAT DISKON
exports.create = async (req, res, next) => {
  try {
    // Membuat pelanggan baru berdasarkan data yang diberikan
    await PelangganModel.create({
      nama: req.body.nama,
      alamat: req.body.alamat,
      no_telp: req.body.no_telp,
      totalKg: req.body.totalKg,
      status: 0,
    });
    // Mengirimkan respons sukses setelah pelanggan berhasil dibuat
    res
      .status(200)
      .json({ success: true, msg: "Pelanggan Berhasil ditambah!" });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// MENGUBAH DISKON
exports.update = async (req, res, next) => {
  try {
    // Mengubah data pelanggan berdasarkan ID
    await PelangganModel.update(
      {
        nama: req.body.nama,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        totalKg: req.body.totalKg,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // Mengirimkan respons sukses setelah data pelanggan berhasil diubah
    res
      .status(200)
      .json({ success: true, msg: "Data Pelanggan Berhasil diubah!" });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// MENGHAPUS DISKON
exports.remove = async (req, res, next) => {
  try {
    // Menghapus pelanggan berdasarkan ID
    await PelangganModel.destroy({ where: { id: req.params.id } });
    // Mengirimkan respons sukses setelah pelanggan berhasil dihapus
    res.status(200).json({ success: true, msg: "Pelanggan Berhasil dihapus!" });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// TOMBOL WHATSAPP
exports.complete = async (req, res, next) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "-" + mm + "-" + yyyy;
  try {
    // Mendapatkan detail pelanggan berdasarkan ID
    const get = await PelangganModel.findOne({ where: { id: req.params.id } });
    // Membuat catatan pemesanan di model Rekap
    await RekapModel.create({
      nama: get.nama,
      tanggal: formattedToday,
      totalKg: get.totalKg,
      alamat: get.alamat,
      no_telp: get.no_telp,
      harga: req.body.harga,
    });
    // Melanjutkan eksekusi berikutnya
    next();
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};
