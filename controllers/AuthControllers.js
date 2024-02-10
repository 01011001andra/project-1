const UserModel = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// FITUR LOGIN
exports.login = async (req, res, next) => {
  try {
    // Cari pengguna berdasarkan username dan password yang diberikan
    const get = await UserModel.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    // Jika tidak ada pengguna yang ditemukan, kirim respons error
    if (!get) {
      return res
        .status(404)
        .json({ success: false, message: "Username/password tidak ditemukan" });
    }

    // Buat token JWT
    const jwtToken = jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    // Konfigurasi opsi cookie
    option = {
      httpOnly: true,
      maxAge: 3600000 * 24,
    };
    // Kirim respons sukses dengan token JWT dalam cookie
    res
      .status(200)
      .cookie("token_key", jwtToken, option)
      .json({ success: true, msg: `Login Berhasil!`, data: get });
  } catch (error) {
    // Kirim respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};

// FITUR MEMBUAT ADMIN OTOMATIS
exports.autoAdmin = async (req, res, next) => {
  try {
    // Hitung jumlah pengguna
    const get = await UserModel.count();
    // Jika tidak ada pengguna, buat pengguna admin baru
    if (get === 0) {
      await UserModel.create({
        nama: "Admin",
        username: "admin",
        password: "112233",
      });
    }
    // Kirim respons sukses
    res.status(200).json({ success: true, msg: "Selamat Datang!" });
  } catch (error) {
    // Kirim respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.stack });
  }
};

// FITUR LOGOUT
exports.logout = async (req, res, next) => {
  try {
    // Bersihkan cookie token_key
    res
      .status(200)
      .clearCookie("token_key")
      .json({ success: true, msg: `Logout Berhasil!` });
  } catch (error) {
    // Kirim respons jika terjadi kesalahan server
    res.status(500).json({ success: false, msg: error.message });
  }
};
