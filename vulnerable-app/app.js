const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.db');
if (!fs.existsSync(DB_FILE)) {
  const db = new sqlite3.Database(DB_FILE);
  const initSql = fs.readFileSync(path.join(__dirname, 'init_db.sql'),'utf8');
  db.exec(initSql);
  db.close();
}

const db = new sqlite3.Database(DB_FILE);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`<h2>App vulnerable - login</h2>
    <form method="post" action="/login">
      Usuario: <input name="username"><br>
      Contraseña: <input name="password" type="password"><br>
      <input type="submit" value="Login">
    </form>`);
});

app.post('/login', (req, res) => {
  const user = req.body.username || '';
  const pwd = req.body.password || '';
  // SQL Injection
  const query = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pwd + "'";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('DB error', err);
      return res.status(500).send('Error de DB');
    }
    if (rows.length > 0) {
      res.send('Login exitoso. Bienvenido ' + rows[0].username);
    } else {
      res.send('Credenciales incorrectas');
    }
  });
});

app.listen(3001, () => console.log('App escuchando en puerto 3001'));
