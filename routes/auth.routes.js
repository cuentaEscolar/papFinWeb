const express = require('express');

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(cookieParser());

router.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario
    const [user] = await pool.query('SELECT * FROM NOMBRES_CAPTURISTAS WHERE nombre = ?', [username]);

    if (user.length === 0) {
      return res.status(401).json(
        {
          error: 'Usuario no encontrado'
        }
      );
    }
    const user_id = user[0].id;
    console.log("user id");
    console.log(user_id);
    console.log(user_id);
    const [rows] = await pool.query('SELECT * FROM PASSWORDS_CAPTURISTAS WHERE id = ?', [user_id]);
    console.log('response', rows);
    const user_p = rows[0].password;
    console.log(rows);

    console.log(password, user_p)
    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user_p);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: user.idUsuario,
        name: user.nombre,
        email: user.email,
        phone: user.telefono,
        isprovider: user.rol
      },
      process.env.JWT_SECRET || 'mi_clave_secreta',
      { expiresIn: '1h' }
    );

    // Guardar token en cookie HTTP-only
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000 // 1 hora
    });

    res.json({ message: 'Login exitoso', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en login' });
  }
});

// POST - Login

module.exports = router;
