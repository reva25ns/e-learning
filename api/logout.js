const { clearSessionCookie, json } = require('../lib/server');

module.exports = (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { success: false });
  clearSessionCookie(res);
  return json(res, 200, { success: true });
};
