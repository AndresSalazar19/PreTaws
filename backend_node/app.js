const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
// Habilitar CORS para todas las rutas
app.use(cors());
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

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
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

app.get('/', (req, res) => {
    
    const sql = 'SELECT * FROM interlib.users;';
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
  
      console.log('Datos guardados correctamente en la base de datos');
      res.status(200).json(results);
    });
  });

app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});
