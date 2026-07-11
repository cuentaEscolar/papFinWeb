
const express = require('express');
const router = express.Router();
const pool = require('../config/db');



router.get('/api/weekly_payroll', async (req, res) => {
  try {
    const [rows] = await pool.query("call get_last_week_payroll()");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/api/current_payroll', async (req, res) => {
  try {
    const [rows] = await pool.query(" call get_cur_week_payroll();");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/api/maquilas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id,nombre FROM MAQUILA;');
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/api/clockin', async (req, res) => {
  try {
    console.log(req.body);
    const { empleado, hora } = req.body;

    // Buscar usuario
    await pool.query('call clockin(?, ?)', [empleado, hora]);

    res.status(200).json({
      success: true,
      message: 'Entrada registrada'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en clockin' });
  }
});


router.post('/api/clockout', async (req, res) => {
  try {
    console.log(req.body);
    const { empleado, hora } = req.body;

    // Buscar usuario
    await pool.query('call clockout(?, ?)', [empleado, hora]);

    res.status(200).json({
      success: true,
      message: 'Entrada registrada'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en clockin' });
  }
});


module.exports = router;

router.post('/api/register_regular_user', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario
    const [user] = await pool.query('call registrar_empleado_regular ?', [username]);

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

module.exports = router;
