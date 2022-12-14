const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "moviedb",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlInsert = "SELECT * FROM movie_reviews;";

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);";

  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});
app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlInsert = "DELETE FROM movie_reviews WHERE movieName=?";
  db.query(sqlInsert, name, (err, res) => {
    if (err) console.log(err);
  });
});
app.put("/api/update/", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName=?";
  db.query(sqlInsert, [movieReview, movieName], (err, res) => {
    if (err) console.log(err);
  });
});
app.listen(3001, () => {
  console.log("running ..................");
});
