const db = require('../config/db');
const { DataTypes } = require('sequelize');
const PelangganModel = require('./PelangganModels');

const RekapModel = db.define('rekapData', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tanggal: {
        type: DataTypes.STRING
    },
    totalKg: {
        type: DataTypes.FLOAT
    },
    no_telp: {
        type: DataTypes.STRING
    },
    harga: {
        type: DataTypes.STRING
    },
});

PelangganModel.hasMany(RekapModel);
RekapModel.belongsTo(PelangganModel);

module.exports = RekapModel;