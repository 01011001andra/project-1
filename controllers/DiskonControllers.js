const { Sequelize } = require("sequelize");
const DiskonModel = require("../models/DiskonModels");

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

    const totalCount = await DiskonModel.count({ where: condition });

    // Hitung total halaman berdasarkan jumlah total data dan ukuran halaman
    const totalPages = Math.ceil(totalCount / pageSize);

    const get = await DiskonModel.findAll({
      order: [["createdAt", "ASC"]],
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

exports.getOne = async (req, res) => {
  try {
    const get = await DiskonModel.findOne({ where: { id: req.params.id } });
    res.status(200).json({ success: true, data: get });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.create = async (req, res, next) => {
  try {
    await DiskonModel.create({
      total: req.body.total,
      persen: req.body.persen,
    });
    res.status(200).json({ success: true, msg: "Diskon Berhasil Ditambah!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
exports.update = async (req, res, next) => {
  try {
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
    res.status(200).json({ success: true, msg: "Diskon Berhasil diubah!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
exports.remove = async (req, res, next) => {
  try {
    await DiskonModel.destroy({ where: { id: req.params.id } });
    res.status(200).json({ success: true, msg: "Diskon Berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
