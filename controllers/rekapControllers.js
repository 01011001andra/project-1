const PelangganModel = require("../models/PelangganModels");
const RekapModel = require("../models/RekapModels");
const ExcelJS = require("exceljs");
const { Op } = require("sequelize");
const { DataTypes, literal } = require("sequelize");
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
    // Menghitung total data yang sesuai dengan kondisi pencarian
    const totalCount = await RekapModel.count({ where: condition });

    // Hitung total halaman berdasarkan jumlah total data dan ukuran halaman
    const totalPages = Math.ceil(totalCount / pageSize);

    // Mendapatkan data berdasarkan halaman dan kondisi pencarian
    const get = await RekapModel.findAll({
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

// EXPORT KE EXCEL
exports.exportToExcel = async (req, res, next) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Bulan dimulai dari 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "-" + mm + "-" + yyyy;
  try {
    // Mengambil semua data dari model Rekap
    const get = await RekapModel.findAll();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");
    // Menetapkan kolom-kolom di worksheet Excel
    worksheet.columns = [
      { header: "Tanggal", key: "tanggal", width: 15 },
      { header: "No_telp", key: "no_telp", width: 15 },
      { header: "Total_Kg", key: "totalKg", width: 15 },
      { header: "Harga", key: "harga", width: 15 },
    ];
    get.forEach((item) => {
      worksheet.addRow(item.dataValues);
    });

    // Menetapkan nama file yang akan diunduh
    const namaFile = `filename=Data-(${formattedToday}).xlsx`;
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; ${namaFile}`);

    // Menulis workbook Excel ke respons
    await workbook.xlsx.write(res);

    // Mengirimkan respons sukses jika file berhasil diunduh
    res.status(200).json({ success: true, msg: "Data Berhasil di download!" });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// CARI NOMOR TELPON
exports.searchTelp = async (req, res, next) => {
  try {
    // Memeriksa apakah nomor telepon ada dalam basis data
    const check = await RekapModel.count({
      where: { no_telp: req.body.no_telp },
    });

    // Jika nomor telepon ditemukan, kirimkan data pelanggan
    const get = await RekapModel.findOne({
      where: { no_telp: req.body.no_telp },
    });
    // Jika nomor telepon tidak ditemukan, kirimkan pesan kesalahan
    if (check === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Data tidak ditemukan!" });
    }
    // Mengirimkan data pelanggan jika ditemukan

    res.status(200).json({ success: true, data: get });
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// GRAFIK
exports.grafik = async (req, res) => {
  try {
    const { hari, bulan, tahun } = req.body;
    let get;

    // Menentukan pilihan berdasarkan filter yang diberikan
    if (hari !== "" && bulan !== "" && tahun !== "") {
      // Jika filter hari, bulan, dan tahun diatur
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
      // Jika filter bulan dan tahun diatur
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
      // Jika filter hari dan tahun diatur
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
      // Jika filter hari dan bulan diatur
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
      // Jika filter tahun diatur
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
    // Mengirimkan respons dengan data grafik dan warna yang dihasilkan
    if (get && get.length > 0) {
      return res.status(200).json({ success: true, data: get, colors: colors });
    } else {
      return res.status(200).json({ success: true, data: get, colors: colors });
    }
  } catch (error) {
    // Mengirimkan respons jika terjadi kesalahan server
    console.error("Error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};
