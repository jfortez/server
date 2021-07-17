const util = require("util");
const mysql = require("mysql");
const { database } = require("./models/key");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) console.log("Something went wrong during connection attempt", err);
  if (connection) connection.release(), console.log("DB CONNECTED...");
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
