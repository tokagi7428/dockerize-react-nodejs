const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

// middleware
app.use(cors());

let host = "localhost";
// การตรวจสอบว่าถ้า host = producting => host = name-container of docker
if (process.env.NODE_ENV === "production") {
  host = "mysql-server";
}
// create the connection to database
const connection = mysql.createConnection({
  host: host,
  user: "root",
  password: "1234",
  database: "travel",
});

// routes
app.get("/attractions", (req, res) => {
  connection.query(
    `SELECT * FROM attractions`,
    function (err, results, fields) {
      res.json(results);
    }
  );
});

// express connected to port
app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
