const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "dmudric",
  password: "11",
  database: "dmudric"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Ruta za dohvat svih knjiga
app.get("/api/knjige", (request, response) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

// Ruta za dohvat knjige po ID-u
app.get("/api/knjige/:id", (request, response) => {
  const id = request.params.id;
  connection.query("SELECT * FROM knjiga WHERE id = ?", [id], (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

// Dodavanje rezervacije
app.post("/api/rezerv_knjige", (request, response) => {
  const data = request.body;
  const rezervacija = [[data.datum, data.id_knjiga, data.id_korisnik]];
  connection.query(
    "INSERT INTO rezervacija (datum_rez, knjiga, korisnik) VALUES ?",
    [rezervacija],
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});

app.get("/api/korisnik/:id/broj-knjiga", (request, response) => {
  const idKorisnik = request.params.id;
  connection.query(
    "SELECT COUNT(*) AS brojKnjiga FROM rezervacija WHERE korisnik = ?",
    [idKorisnik],
    (error, results) => {
      if (error) throw error;
      response.send(results[0]);
    }
  );
});

app.get("/api/knjige/:id/slobodne", (request, response) => {
  const idKnjiga = request.params.id;
  connection.query(
    `SELECT knjiga.stanje - COUNT(rezervacija.id) AS slobodno 
     FROM knjiga 
     LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga 
     WHERE knjiga.id = ?`,
    [idKnjiga],
    (error, results) => {
      if (error) throw error;
      response.send(results[0]);
    }
  );
});
app.get("/api/knjige/:id/rezervirano", (request, response) => {
  const idKnjiga = request.params.id;
  connection.query(
    "SELECT COUNT(*) AS rezervirano FROM rezervacija WHERE knjiga = ?",
    [idKnjiga],
    (error, results) => {
      if (error) throw error;
      response.send(results[0]);
    }
  );
});

app.get("/api/knjige/:id/korisnici", (request, response) => {
  const idKnjiga = request.params.id;
  connection.query(
    `SELECT korisnik.id, korisnik.ime, korisnik.prezime, korisnik.korime 
     FROM korisnik 
     INNER JOIN rezervacija ON korisnik.id = rezervacija.korisnik 
     WHERE rezervacija.knjiga = ?`,
    [idKnjiga],
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});
app.get("/api/knjige/ukupno", (request, response) => {
  connection.query(
    "SELECT SUM(stanje) AS ukupnoKnjiga FROM knjiga",
    (error, results) => {
      if (error) throw error;
      response.send(results[0]);
    }
  );
});

app.get("/api/rezervacije/ukupno", (request, response) => {
  connection.query(
    "SELECT COUNT(*) AS ukupnoRezervirano FROM rezervacija",
    (error, results) => {
      if (error) throw error;
      response.send(results[0]);
    }
  );
});

app.get("/api/knjige/slobodne", (request, response) => {
  connection.query(
    `SELECT SUM(knjiga.stanje) - COUNT(rezervacija.id) AS ukupnoSlobodno 
     FROM knjiga 
     LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga`,
    (error, results) => {
      if (error) throw error;
      response.send(results[0]);
    }
  );
});

app.get("/api/knjige/nedostatne", (request, response) => {
  connection.query(
    "SELECT * FROM knjiga WHERE stanje < 3",
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});

app.get("/api/rezervacije/starije-od-mjesec-dana", (request, response) => {
  connection.query(
    `SELECT korisnik.id, korisnik.ime, korisnik.prezime, knjiga.naslov, rezervacija.datum_rez 
     FROM korisnik 
     INNER JOIN rezervacija ON korisnik.id = rezervacija.korisnik 
     INNER JOIN knjiga ON knjiga.id = rezervacija.knjiga 
     WHERE rezervacija.datum_rez < NOW() - INTERVAL 1 MONTH`,
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});
app.get("/api/podsjetnik", (request, response) => {
  connection.query(
    `SELECT korisnik.email, korisnik.broj_telefona, knjiga.naslov, rezervacija.datum_rez 
     FROM korisnik 
     INNER JOIN rezervacija ON korisnik.id = rezervacija.korisnik 
     INNER JOIN knjiga ON knjiga.id = rezervacija.knjiga 
     WHERE rezervacija.datum_rez < NOW() - INTERVAL 1 MONTH`,
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});
app.get("/api/korisnik/:id/duple-rezervacije", (request, response) => {
  const idKorisnik = request.params.id;
  connection.query(
    `SELECT knjiga, COUNT(*) AS broj_rezervacija 
     FROM rezervacija 
     WHERE korisnik = ? 
     GROUP BY knjiga 
     HAVING broj_rezervacija >= 2`,
    [idKorisnik],
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});

app.put("/api/korisnik/:id", (request, response) => {
  const idKorisnik = request.params.id;
  const { ime, prezime, email, broj_telefona } = request.body;

  connection.query(
    `UPDATE korisnik 
     SET ime = ?, prezime = ?, email = ?, broj_telefona = ? 
     WHERE id = ?`,
    [ime, prezime, email, broj_telefona, idKorisnik],
    (error, results) => {
      if (error) throw error;
      response.send({ message: "Podaci uspješno ažurirani.", affectedRows: results.affectedRows });
    }
  );
});
// Ruta za dohvat svih rezervacija
app.get("/api/rezervirane_knjige", (request, response) => {
  const query = `
    SELECT knjiga.naslov, knjiga.autor, korisnik.ime, korisnik.prezime, rezervacija.datum_rez
    FROM rezervacija
    JOIN knjiga ON rezervacija.knjiga = knjiga.id
    JOIN korisnik ON rezervacija.korisnik = korisnik.id;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška u SQL upitu:", error); // Logiramo grešku
      return response.status(500).json({ message: "Greška prilikom dohvaćanja podataka" }); // Pošaljemo grešku klijentu i prekidamo izvršavanje
    }
    response.json(results); // Pošaljemo rezultate ako nema greške
  });
});

app.post("/api/unos_knjige", (req, res) => {
  const data = req.body;
  //naslo, autor, opis, slika, stanje
  knjiga = [[data.naslov, data.autor, data.opis, data.stanje, data.slika]]
  connection.query("INSERT INTO knjiga (naslov, autor, opis, stanje, slika) VALUES ?",
    [knjiga], (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
})



app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});