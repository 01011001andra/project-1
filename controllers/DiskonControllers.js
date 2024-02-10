const { Sequelize } = require("sequelize");
const DiskonModel = require("../models/DiskonModels");

//  GET SEMUA DISKON
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
            total: {
              [Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
          {
            persen: {
              [Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
        ],
      };
    }

    // Menghitung total data yang sesuai dengan kondisi pencarian
    const totalCount = await DiskonModel.count({ where: condition });

    // Hitung total halaman berdasarkan jumlah total data dan ukuran halaman
    const totalPages = Math.ceil(totalCount / pageSize);

    // Mendapatkan data diskon berdasarkan halaman dan kondisi pencarian
    const get = await DiskonModel.findAll({
      order: [["createdAt", "ASC"]],
      where: condition,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    // Ambil semua nilai dari atribut 'total' dan 'persen'
    const semuaTotal = await DiskonModel.findAll();

    // Ambil semua nilai dari atribut 'total' dan 'persen'
    const gabungan = semuaTotal.map((diskon) => ({
      total: diskon.total,
      persen: diskon.persen,
    }));

    // Mengirimkan respons dengan data yang ditemukan
    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      total: totalCount,
      data: get,
      gabungan,
    });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

//  GET ONE DISKON
exports.getOne = async (req, res) => {
  try {
    // Mendapatkan detail satu diskon berdasarkan ID
    const get = await DiskonModel.findOne({ where: { id: req.params.id } });
    // Mengirimkan respons dengan detail diskon
    res.status(200).json({ success: true, data: get });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// MEMBUAT DISKON
exports.create = async (req, res, next) => {
  try {
    // Membuat diskon baru berdasarkan data yang diberikan
    await DiskonModel.create({
      total: req.body.total,
      persen: req.body.persen,
    });
    // Mengirimkan respons sukses setelah diskon berhasil dibuat
    res.status(200).json({ success: true, msg: "Diskon Berhasil Ditambah!" });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// MENGUBAH DISKON
exports.update = async (req, res, next) => {
  try {
    // Mengubah data diskon berdasarkan ID
    await DiskonModel.update(
      {
        total: req.body.total,
        persen: req.body.persen,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // Mengirimkan respons sukses setelah data diskon berhasil diubah
    res.status(200).json({ success: true, msg: "Diskon Berhasil diubah!" });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// MENGHAPUS DISKON
exports.remove = async (req, res, next) => {
  try {
    // Menghapus diskon berdasarkan ID
    await DiskonModel.destroy({ where: { id: req.params.id } });
    // Mengirimkan respons sukses setelah diskon berhasil dihapus
    res.status(200).json({ success: true, msg: "Diskon Berhasil dihapus!" });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};
