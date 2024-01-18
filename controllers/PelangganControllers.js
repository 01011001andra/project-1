const { Sequelize } = require("sequelize");
const PelangganModel = require("../models/PelangganModels");
const RekapModel = require("../models/RekapModels");

// exports.get = async (req, res, next) => {
//   try {
//     const get = await PelangganModel.findAll({
//       order: [["status", "ASC"]],
//     });
//     res.status(200).json({ success: true, data: get, total: get.length });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

exports.get = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const searchTerm = req.query.searchTerm || "";

  try {
    let condition = {};

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
          {
            totalKg: {
              [Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
        ],
      };
    }

    const totalCount = await PelangganModel.count({ where: condition });

    // Hitung total halaman berdasarkan jumlah total data dan ukuran halaman
    const totalPages = Math.ceil(totalCount / pageSize);

    const get = await PelangganModel.findAll({
      order: [["status", "ASC"]],
      where: condition,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      total: totalCount,
      data: get,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const get = await PelangganModel.findOne({ where: { id: req.params.id } });
    res.status(200).json({ success: true, data: get });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
exports.create = async (req, res, next) => {
  try {
    await PelangganModel.create({
      nama: req.body.nama,
      alamat: req.body.alamat,
      no_telp: req.body.no_telp,
      status: 0,
    });
    res
      .status(200)
      .json({ success: true, msg: "Pelanggan Berhasil ditambah!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
exports.update = async (req, res, next) => {
  try {
    await PelangganModel.update(
      {
        nama: req.body.nama,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res
      .status(200)
      .json({ success: true, msg: "Data Pelanggan Berhasil diubah!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
exports.remove = async (req, res, next) => {
  try {
    await PelangganModel.destroy({ where: { id: req.params.id } });
    res.status(200).json({ success: true, msg: "Pelanggan Berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
exports.complete = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, msg: "" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
