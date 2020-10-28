const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "parking_locator",
});

connection.connect((err) => {
  if (err) {
    console.log("koneksi " + err);
    return;
  }
  console.log("db: success");
});

const app = express();
app.listen(4000, () => console.log("listening at http://127.0.0.1:4000"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("", (req, res) => {
  res.render("index.ejs");
});

app.post("/simpan", (req, res) => {
  if (req.body.nama === "" || req.body.nopol === "") {
    res.redirect("/");
  } else {
    let lat = req.body.lat;
    let lon = req.body.lon;
    lat = lat.toString();
    lon = lon.toString();
    let query =
      "insert into parking (nama, nopol, lat, lon) values (?, ?, ?, ?)";
    connection.query(
      query,
      [req.body.nama, req.body.nopol, lat, lon],
      (error, result) => {
        res.redirect("/");
        console.log(error);
      }
    );
  }
});

app.get("/parkiran", (req, res) => {
  let query = "select * from parking";
  // res.send()
  connection.query(query, (error, result) => {
    res.render("parkiran.ejs", { data: result });
    // res.send(result);
  });
});

app.get("/api", cors(), (req, res) => {
  let query = "select * from parking";
  connection.query(query, (e, result) => {
    res.json(result);
  });
});
