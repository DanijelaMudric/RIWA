const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: "ucka.veleri.hr", 
  user: "dmudric",
  password: "11",  
  database: "dmudric"
});


app.use(express.urlencoded({ extended: true }));
 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.get("/api/knjige", (request, response) => {
    
    connection.query("SELECT * FROM knjiga", (error, results) => {
      if (error) throw error;
      response.send(results);
    });
/*
    request - slanje zahtjeva s klijentske strane
    response - slanje odgovora sa serverske strane

    npm install -g nodemon
*/
    //response.send("popis knjiga");
});

app.get("/api/knjige/:id", (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM knjiga WHERE id = ?", id, (error, results) => {
        if (error) throw error;
        response.send(results);
      });
    //response.send("jedna knjiga "+id);
});

app.post("/api/rezerv_knjige", (request, response) => {
    const data = request.body;
    rezervacija = [[data.datum, data.id_knjiga, data.id_korisnik]]

    connection.query("INSERT INTO rezervacija (datum_rez, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
      if (error) throw error;
      response.send(results);
    });
    
    //response.send("Poslano "+data.id_knjiga);
  });
  
  app.listen(port, () => {
    console.log("Server running at port: " + port);
});