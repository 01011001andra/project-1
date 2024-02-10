const UserModel = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// FITUR LOGIN
exports.login = async (req, res, next) => {
  try {
    const get = await UserModel.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    if (!get) {
      return res
        .status(404)
        .json({ success: false, message: "Username/password tidak ditemukan" });
    }

    const jwtToken = jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    option = {
      httpOnly: true,
      maxAge: 3600000 * 24,
    };
    res
      .status(200)
      .cookie("token_key", jwtToken, option)
      .json({ success: true, msg: `Login Berhasil!`, data: get });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};


// FITUR MEMBUAT ADMIN OTOMATIS
exports.autoAdmin = async (req, res, next) => {
  try {
    const get = await UserModel.count();
    if (get === 0) {
      await UserModel.create({
        nama: "Admin",
        username: "admin",
        password: "112233",
      });
    }
    res.status(200).json({ success: true, msg: "Selamat Datang!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.stack });
  }
};


// FITUR LOGOUT
exports.logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("token_key")
      .json({ success: true, msg: `Logout Berhasil!` });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
