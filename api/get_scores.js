const { ensureSchema, getSql, json, requireSession } = require('../lib/server');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return json(res, 405, { success: false, message: 'Metode tidak diizinkan.' });
  if (!requireSession(req, res)) return;
  try {
    await ensureSchema();
    const sql = getSql();
    const data = await sql`SELECT nama_anak, permainan, skor, total_soal, waktu_main FROM scores ORDER BY waktu_main DESC LIMIT 50`;
    return json(res, 200, { success: true, data });
  } catch (error) {
    console.error('get_scores', error);
    return json(res, 503, { success: false, message: 'Database belum siap. Coba lagi sebentar.' });
  }
};
