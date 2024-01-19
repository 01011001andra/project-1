const DiskonModel = require("../models/DiskonModels");

exports.get = async (req, res, next) => {
  try {
    const get = await DiskonModel.findAll();
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
