
const express = require('express');
const router = express.Router();
const pool = require('../config/db');



router.get('/api/employee/names', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nombre from NOMBRES;");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/api/weekly_payroll/total', async (req, res) => {
  try {
    const [rows] = await pool.query("call get_last_week_payroll_total();");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/api/weekly_payroll/employees', async (req, res) => {
  try {
    const [rows] = await pool.query("call get_last_week_payroll();");
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
    res.status(500).json({ error: 'Error en clockout' });
  }
});



router.post('/api/clockin/id', async (req, res) => {
  try {
    console.log(req.body);
    const { empleado, hora } = req.body;

    // Buscar usuario
    await pool.query('call clockin_id(?, ?)', [empleado, hora]);

    res.status(200).json({
      success: true,
      message: 'Entrada registrada'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en clockin' });
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
    const { full_name, birthday, id_maquila } = req.body;

    console.log(full_name, birthday, id_maquila);
    // Buscar usuario
    const [user] = await pool.query('call registrar_empleado_regular_id(?,?,?)', [full_name, birthday, id_maquila]);

    console.log(user);

    res.status(200).json({
      success: true,
      message: 'Usuario registrado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en login' });
  }
});

module.exports = router;
