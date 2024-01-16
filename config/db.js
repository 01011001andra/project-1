const { Sequelize } = require('sequelize');

// db aku
const db = new Sequelize('loundry', 'sa', '123456', {
    host: 'localhost',
    dialect: 'mssql'
});

// db kau
// const db = new Sequelize('loundry', 'sa', '141414', {
//     host: 'localhost',
//     dialect: 'mssql'
// });

module.exports = db;