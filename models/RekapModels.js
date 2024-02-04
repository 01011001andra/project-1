const db = require("../config/db");
const { DataTypes } = require("sequelize");
const PelangganModel = require("./PelangganModels");

const RekapModel = db.define("rekapData", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
  },
  tanggal: {
    type: DataTypes.DATE,
  },
  totalKg: {
    type: DataTypes.FLOAT,
  },
  alamat: {
    type: DataTypes.TEXT,
  },
  no_telp: {
    type: DataTypes.STRING,
  },
  harga: {
    type: DataTypes.STRING,
  },
});

module.exports = RekapModel;
