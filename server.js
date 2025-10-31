const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: 'app_user',
  password: 'App12345!',
  server: '127.0.0.1',   // si tu SQL está en el puerto 1434, agregá: , port: 1434
  // port: 1434,          // <- descomentá esta línea si tu SQL escucha en 1434
  database: 'ElectroShop',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};


app.get('/api/health', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT 1 AS ok');
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    sql.close();
  }
});

// 📦 Bajo stock (<15), agrupado y ordenado ascendente
app.get('/api/bajo-stock', async (_req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT
        nombre,
        marca,
        color,
        SUM(cantidad) AS cantidad
      FROM dbo.productos
      GROUP BY nombre, marca, color
      HAVING SUM(cantidad) < 15
      ORDER BY SUM(cantidad) ASC, nombre ASC;
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ DB QUERY ERROR (/api/bajo-stock):', err.message);
    res.status(500).json({ error: 'DB error' });
  } finally {
    try { await sql.close(); } catch {}
  }
});
const path = require('path');
app.use(express.static(path.join(__dirname))); // sirve los HTML/CSS/JS directamente


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

