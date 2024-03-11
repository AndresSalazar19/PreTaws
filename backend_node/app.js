const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');




function generateAccessToken(id, username) {
  try {
    // Crear un objeto literal con el nombre de usuario como carga útil
    const payload = { id: id, username: username };
    // Firmar el token con la carga útil y la clave secreta
    return jwt.sign(payload, 'SECRET');
  } catch (error) {
    console.error('Error al generar el token:', error);
    throw new Error('Error al generar el token');
  }
}



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
  const { nombre, email, password } = req.body;

  // Verificar si el email ya está en uso
  const checkEmailQuery = 'SELECT * FROM users WHERE username = ?';
  connection.query(checkEmailQuery, [email], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (results.length > 0) {
      // Si el email ya está en uso, retornar un mensaje de error
      res.status(400).json({ error: 'El email ya está en uso' });
      return;
    }

    // Si el email no está en uso, insertar el nuevo usuario
    const insertUserQuery = 'INSERT INTO users (nombre, username, password) VALUES (?, ?, ?)';
    connection.query(insertUserQuery, [nombre, email, password], (error, results) => {
      if (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      console.log('Datos guardados correctamente en la base de datos');
      res.status(200).json({ mensaje: 'Registro exitoso' });
    });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar si las credenciales son válidas consultando la base de datos
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (results.length === 1) {
      

      const username = results[0].username; // Obtener el nombre de usuario de los resultados
      const id = results[0].id;
      const accessToken = generateAccessToken(id,username);
      res.status(200).json({ success: true, accessToken: accessToken });
      console.log(accessToken);
      console.log(username);

      // Credenciales válidas
     
      
    } else {
      // Credenciales inválidas
      res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
    }
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

app.get('/obtener-usuario', (req, res) => {
  connection.query('SELECT USER() AS username', (error, results, fields) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

// Endpoint para obtener la lista de libros del usuario
app.get('/api/books/:token', (req, res) => {
  const token = req.params.token;

  // Verificar y decodificar el token
  jwt.verify(token, 'SECRET', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autorización inválido' });
    }

    const userId = decodedToken.id;

    // Consultar la base de datos para obtener los libros del usuario
    const sql = `
    SELECT *
    FROM libros
    WHERE owner_id = ? AND id NOT IN (
      SELECT id_libro FROM transacciones
    )
  `;
    connection.query(sql, [userId], (error, results) => {
      if (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      console.log({books : results});
      res.status(200).json({ books: results });
    });
  });
});

app.post('/api/add', (req, res) => {
  const { titulo, autor, genero, sinopsis, owner_id, username } = req.body;
  console.log(titulo, autor, genero, sinopsis, owner_id, username);
  // Realizar una consulta para obtener el nombre del propietario basado en el username
  const findOwnerNameQuery = 'SELECT nombre FROM users WHERE username = ?';
  connection.query(findOwnerNameQuery, [username], (error, results) => {
    if (error) {
      console.error('Error al buscar el nombre del propietario en la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Verificar si se encontró el nombre del propietario
    if (results.length === 0) {
      console.error('No se encontró el nombre del propietario en la base de datos');
      res.status(404).json({ error: 'Nombre de usuario no encontrado' });
      return;
    }

    const ownerName = results[0].nombre;

    // Insertar el nuevo libro en la tabla de libros
    const insertBookQuery = 'INSERT INTO libros (titulo, autor, genero, sinopsis, owner_id, owner) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(insertBookQuery, [titulo, autor, genero, sinopsis, owner_id, ownerName], (error, results) => {
      if (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      console.log('Libro agregado correctamente');
      res.status(200).json({ mensaje: 'Libro agregado correctamente' });
    });
  });
});




app.delete('/api/books/:id', (req, res) => {
  const bookId = req.params.id;

  // Ejecutar la consulta para eliminar el libro con el ID proporcionado
  const deleteBookQuery = 'DELETE FROM libros WHERE id = ?';
  connection.query(deleteBookQuery, [bookId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el libro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    console.log('Libro eliminado correctamente');
    res.status(200).json({ mensaje: 'Libro eliminado correctamente' });
  });
});


app.get('/api/show', (req, res) => {
  // Consultar la base de datos para obtener todos los libros
  const sql = `
    SELECT libros.*
    FROM libros
    LEFT JOIN transacciones ON libros.id = transacciones.id_libro
    WHERE transacciones.id_libro IS NULL
  `;

  console.log("CONSULTADO");
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    console.log('Lista de libros obtenida correctamente');
    res.status(200).json({ success: true, books: results }); // Enviar una respuesta "ok" junto con la lista de libros
  });
});


app.post('/api/books/:id/buy', (req, res) => {
  const bookId = req.params.id;
  const userId = req.body.userId;
  console.log(userId);
  const findOwnerNameQuery = 'SELECT nombre FROM users WHERE id = ?';
  connection.query(findOwnerNameQuery, [userId], (error, results) => {
    if (error) {
      console.error('Error al buscar el nombre del propietario en la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Verificar si se encontró el nombre del propietario
    if (results.length === 0) {
      console.error('No se encontró el nombre del propietario en la base de datos');
      res.status(404).json({ error: 'Nombre de usuario no encontrado' });
      return;
    }

    const ownerName = results[0].nombre;

    // Actualizar el owner_id y owner del libro en la base de datos con el ID del usuario y el nombre del propietario
    const updateBookQuery = 'UPDATE libros SET owner_id = ?, owner = ? WHERE id = ?';
    connection.query(updateBookQuery, [userId, ownerName, bookId], (error, results) => {
      if (error) {
        console.error('Error al comprar el libro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.status(200).json({ success: true, message: 'Libro comprado exitosamente' });
    });
  });
});


app.post("/crear-transaccion", (req, res) => {
  // Recibir los datos de la nueva transacción desde el cuerpo de la solicitud
  const nuevaTransaccion = req.body;

  // Insertar la nueva transacción en la tabla "transacciones"
  const insertTransaccionQuery = `
    INSERT INTO transacciones 
      (id_libro, id_comprador, id_vendedor, lugar, fecha, hora, monto, descripcion, confirmacion_comprador, confirmacion_vendedor, vigente) 
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    nuevaTransaccion.id_libro,
    nuevaTransaccion.id_comprador,
    nuevaTransaccion.id_vendedor,
    nuevaTransaccion.lugar,
    nuevaTransaccion.fecha,
    nuevaTransaccion.hora,
    nuevaTransaccion.monto,
    nuevaTransaccion.descripcion,
    nuevaTransaccion.confirmacion_comprador,
    nuevaTransaccion.confirmacion_vendedor,
    nuevaTransaccion.vigente
  ];

  connection.query(insertTransaccionQuery, values, (error, results) => {
    if (error) {
      console.error('Error al insertar la transacción en la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Enviar una respuesta al cliente para confirmar que la transacción fue recibida y procesada correctamente
    res.status(200).json({ message: "Transacción recibida y procesada correctamente" });
  });
});

app.get('/api/pending-transactions', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado de autorización
  jwt.verify(token, 'SECRET', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autorización inválido' });
    }

    const userId = decodedToken.id;

    // Consultar la base de datos para obtener las transacciones pendientes del usuario como vendedor o comprador
    const sql = `
      SELECT 
        transacciones.id AS transactionId,
        vendedor.nombre AS vendedor,
        comprador.nombre AS comprador,
        libros.titulo AS libro,
        transacciones.lugar,
        transacciones.fecha,
        transacciones.hora,
        transacciones.descripcion
      FROM 
        transacciones
      INNER JOIN 
        libros ON transacciones.id_libro = libros.id
      INNER JOIN 
        users AS vendedor ON transacciones.id_vendedor = vendedor.id
      INNER JOIN 
        users AS comprador ON transacciones.id_comprador = comprador.id
      WHERE 
        id_comprador = ? OR id_vendedor = ?
    `;
    connection.query(sql, [userId, userId], (error, results) => {
      if (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      console.log('Transacciones pendientes obtenidas correctamente');
      res.status(200).json({ success: true, transactions: results });
    });
  });
});
