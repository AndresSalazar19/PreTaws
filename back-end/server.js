const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'interLib.10*',
  database: 'interlib'
});

connection.connect();

app.use(express.json()); 

app.post('/registro', (req, res) => {
  const { email, password } = req.body;

  const sql = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    console.log('Datos guardados correctamente en la base de datos');
    res.status(200).json({ mensaje: 'Registro exitoso' });
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
