const { json, setSessionCookie } = require('../lib/server');

module.exports = (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { success: false, message: 'Metode tidak diizinkan.' });
  const { username = '', password = '' } = req.body || {};
  if (username.trim() !== 'admin' || password !== 'admin123') {
    return json(res, 401, { success: false, message: 'Username atau password salah.' });
  }
  const user = { username: 'admin', nama: 'Administrator' };
  setSessionCookie(res, user);
  return json(res, 200, { success: true, user });
};
