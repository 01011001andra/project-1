const { Sequelize } = require("sequelize");

// db aku
const db = new Sequelize("loundry", "sa", "123456", {
  host: "localhost",
  dialect: "mssql",
});

// db
// const db = new Sequelize("loundry", "01011001andra", "muslim", {
//   host: "localhost",
//   dialect: "mssql",
// });

module.exports = db;
