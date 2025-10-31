// =========================
// server.js — BACKEND ElectroShop
// =========================

const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// 🔧 CONFIGURACIÓN DE CONEXIÓN
// ⚠️ Reemplazá "12345" por la contraseña real del usuario 'sa'
// =========================
const dbConfig = {
  user: 'sa',                     // usuario SQL
  password: '12345',              // contraseña de tu SQL Server
  server: 'localhost',            // si tu SSMS dice sólo "localhost", dejalo así
  port: 1433,                     // puerto fijo
  database: 'ElectroShop',        // nombre exacto de tu base
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// =========================
// 🔍 RUTA PARA PROBAR CONEXIÓN
// =========================
app.get('/api/health', async (_req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT 1 AS ok');
    res.json({ ok: result.recordset[0].ok === 1 });
  } catch (err) {
    console.error('❌ ERROR CONEXIÓN DB:', {
      message: err.message,
      code: err.code,
      info: err.originalError?.info || err.originalError
    });
    res.status(500).json({ error: err.message });
  } finally {
    await sql.close();
  }
});

// =========================
// 📦 PRODUCTOS CON BAJO STOCK
// (menor a 15, orden ascendente)
// =========================
app.get('/api/bajo-stock', async (_req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT nombre, marca, color, cantidad
      FROM dbo.productos
      WHERE cantidad < 15
      ORDER BY cantidad ASC, nombre ASC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Error al conectar o consultar:', err);
    res.status(500).json({ error: 'DB error' });
  } finally {
    await sql.close();
  }
});

// =========================
// 📋 TODOS LOS PRODUCTOS (opcional)
// =========================
app.get('/api/stock', async (_req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT nombre, marca, color, cantidad
      FROM dbo.productos
      ORDER BY cantidad ASC, nombre ASC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Error /api/stock:', err);
    res.status(500).json({ error: 'DB error' });
  } finally {
    await sql.close();
  }
});

// =========================
// 🚀 INICIAR SERVIDOR
// =========================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
