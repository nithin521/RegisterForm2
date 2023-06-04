const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: "localhost",
  database: "chantdb1",
  user: process.env.USER_KEY,
  password: process.env.USER_PASSWORD,
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection Sucessfully Completed");
});
module.exports = connection;
