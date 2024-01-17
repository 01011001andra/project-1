const db = require('../config/db');
const { DataTypes } = require('sequelize');

const DiskonModel = db.define('diskon', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    total: {
        type: DataTypes.INTEGER
    },
    persen: {
        type: DataTypes.INTEGER
    },
});

module.exports = DiskonModel;