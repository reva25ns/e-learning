const { ensureSchema, getSql, json, requireSession } = require('../lib/server');

const allowedGames = new Set(['huruf', 'berhitung', 'petualangan_angka', 'kuis']);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { success: false, message: 'Metode tidak diizinkan.' });
  if (!requireSession(req, res)) return;
  const { nama_anak: name = '', permainan: game = '', skor: rawScore = 0, total_soal: rawTotal = 0 } = req.body || {};
  const score = Number(rawScore);
  const total = Number(rawTotal);
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100 || !allowedGames.has(game) || !Number.isInteger(score) || !Number.isInteger(total) || score < 0 || total < 0) {
    return json(res, 422, { success: false, message: 'Data nilai tidak valid.' });
  }
  try {
    await ensureSchema();
    const sql = getSql();
    await sql`INSERT INTO scores (nama_anak, permainan, skor, total_soal) VALUES (${name.trim()}, ${game}, ${score}, ${total})`;
    return json(res, 201, { success: true });
  } catch (error) {
    console.error('save_score', error);
    return json(res, 503, { success: false, message: 'Database belum siap. Coba lagi sebentar.' });
  }
};
