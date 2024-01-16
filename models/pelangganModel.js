const db = require('../config/db');
const { DataTypes } = require('sequelize');

const PelangganModel = db.define('Pelanggan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.TEXT
    },
    no_telp: {
        type: DataTypes.STRING
    },
    // 0: Pending
    // 1: Complete
    status: {
        type: DataTypes.INTEGER
    },
});

module.exports = PelangganModel;