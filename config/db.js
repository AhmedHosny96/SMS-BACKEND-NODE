const mysql = require("mysql");
const winston = require("winston");
module.exports = connection = mysql.createConnection({
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

connection.connect((error) => {
  if (error) return console.log("error connecting to db" + error.stack);

  winston.info("DB onnected successfully");
});
