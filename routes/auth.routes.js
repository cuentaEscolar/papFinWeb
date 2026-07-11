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
    const [rows] = await pool.query('SELECT * FROM PASSWORDS_CAPTURISTAS WHERE id = ?', [user_id]);
    //console.log('response', rows);
    const user_p = rows[0].password;
    //console.log(rows);

    //console.log(password, user_p)
    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user_p);

    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    const [is_admin_row] = await pool.query('SELECT admin FROM CAPTURISTAS WHERE id = ?', [user_id]);
    const is_admin = is_admin_row[0];
    //console.log("is admin???", is_admin);

    // Crear token JWT
    const token = jwt.sign(
      {
        id: user_id,
        admin: is_admin.admin,
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

    res.json({ message: 'Login exitoso', user: { id: user_id, admin: is_admin.admin } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en login' });
  }
});

// GET - Verificar sesión activa
router.get('/api/check-session', authenticateToken, (req, res) => {
  // Si el middleware pasa, significa que el usuario está logeado
  res.json({ loggedIn: true, user: req.user });
});

// POST - Login

module.exports = router;
