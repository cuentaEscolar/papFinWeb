const express = require('express');

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { host, database } = require('../config/db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(cookieParser());

function connectToDatabase(pool) {
  return pool
    .getConnection()
    .then(connection => {
      console.log('Connected to the database');
      connection.release();
      return true;
    })
    .catch(err => {
      console.error('Error conectando a la base de datos :', err);
      return false;
    });
}

// POST - Login
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body)
  const pool = mysql.createPool({
    host: host,
    user: username,
    password: password,
    database: database,
  });
  const connected = await connectToDatabase(pool);

  if (!connected) {
    return res.status(401).json({
      error: 'Invalid username or password'
    });
  }

  const admin_test_query = `SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES
  where TABLE_SCHEMA = 'nominas' and TABLE_NAME = 'SALARIOS';`;

  const [result] = await pool.query(admin_test_query);
  console.log("salarios", result, result != null);

  const token =
    jwt.sign({ id: username, admin: (result != null) }, process.env.JWT_SECRET || 'mi_clave_secreta', {
      expiresIn: '1h'
    });

  // Guardar token en cookie HTTP-only
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000 // 1 hora
  });

  res.json({ message: 'Login exitoso', user: { id: username } });

});

// GET - Verificar sesión activa
router.get('/api/check-session', authenticateToken, (req, res) => {
  // Si el middleware pasa, significa que el usuario está logeado
  res.json({ loggedIn: true, user: req.user });
});

module.exports = router;
