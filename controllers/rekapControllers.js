const PelangganModel = require("../models/PelangganModels");
const RekapModel = require("../models/RekapModels");
const ExcelJS = require("exceljs");
const { Op } = require("sequelize");
const { DataTypes, literal } = require("sequelize");
const db = require("../config/db");
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
            tanggal: {
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
            harga: {
              [Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
        ],
      };
    }

    const totalCount = await RekapModel.count({ where: condition });

    // Hitung total halaman berdasarkan jumlah total data dan ukuran halaman
    const totalPages = Math.ceil(totalCount / pageSize);

    const get = await RekapModel.findAll({
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

exports.exportToExcel = async (req, res, next) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "-" + mm + "-" + yyyy;
  try {
    const get = await RekapModel.findAll();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");
    worksheet.columns = [
      { header: "Tanggal", key: "tanggal", width: 15 },
      { header: "No_telp", key: "no_telp", width: 15 },
      { header: "Total_Kg", key: "totalKg", width: 15 },
      { header: "Harga", key: "harga", width: 15 },
    ];
    get.forEach((item) => {
      worksheet.addRow(item.dataValues);
    });
    const namaFile = `filename=Data-(${formattedToday}).xlsx`;
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; ${namaFile}`);
    await workbook.xlsx.write(res);
    res.status(200).json({ success: true, msg: "Data Berhasil di download!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.searchTelp = async (req, res, next) => {
  try {
    const check = await RekapModel.count({
      where: { no_telp: req.body.no_telp },
    });
    const get = await RekapModel.findOne({
      where: { no_telp: req.body.no_telp },
    });
    if (check === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Data tidak ditemukan!" });
    }
    res.status(200).json({ success: true, data: get });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.grafik = async (req, res) => {
  try {
    const { hari, bulan, tahun } = req.body;
    let get;

    if (hari !== "" && bulan !== "" && tahun !== "") {
      get = await RekapModel.findAll({
        attributes: [
          "tanggal",
          [db.fn("SUM", db.cast(db.col("harga"), "INTEGER")), "total_harga"],
        ],
        where: {
          tanggal: {
            [Op.like]: `${hari.padStart(2, "0")}-${bulan.padStart(
              2,
              "0"
            )}-${tahun}`,
          },
        },
        group: ["tanggal"],
      });
    } else if (bulan !== "" && tahun !== "") {
      get = await RekapModel.findAll({
        attributes: [
          "tanggal",
          [db.fn("SUM", db.cast(db.col("harga"), "INTEGER")), "total_harga"],
        ],
        where: {
          tanggal: {
            [Op.like]: `__-${bulan.padStart(2, "0")}-${tahun}`,
          },
        },
        group: ["tanggal"],
      });
    } else if (hari !== "" && tahun !== "") {
      get = await RekapModel.findAll({
        attributes: [
          "tanggal",
          [db.fn("SUM", db.cast(db.col("harga"), "INTEGER")), "total_harga"],
        ],
        where: {
          tanggal: {
            [Op.like]: `${hari.padStart(2, "0")}-__-${tahun}`,
          },
        },
        group: ["tanggal"],
      });
    } else if (hari !== "" && bulan !== "") {
      get = await RekapModel.findAll({
        attributes: [
          "tanggal",
          [db.fn("SUM", db.cast(db.col("harga"), "INTEGER")), "total_harga"],
        ],
        where: {
          tanggal: {
            [Op.like]: `${hari.padStart(2, "0")}-${bulan.padStart(
              2,
              "0"
            )}-____`,
          },
        },
        group: ["tanggal"],
      });
    } else if (tahun !== "") {
      get = await RekapModel.findAll({
        attributes: [
          "tanggal",
          [db.fn("SUM", db.cast(db.col("harga"), "INTEGER")), "total_harga"],
        ],
        where: {
          tanggal: {
            [Op.like]: `__-__-${tahun}`,
          },
        },
        group: ["tanggal"],
      });
    }

    // Membuat array warna hexa acak sebanyak jumlah objek dalam array 'get'
    const colors = Array.from(
      { length: get.length },
      () => "#" + Math.floor(Math.random() * 16777215).toString(16)
    );

    if (get && get.length > 0) {
      return res.status(200).json({ success: true, data: get, colors: colors });
    } else {
      return res.status(200).json({ success: true, data: get, colors: colors });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};
