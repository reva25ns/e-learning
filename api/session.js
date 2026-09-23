const { getSession, json } = require('../lib/server');

module.exports = (req, res) => {
  if (req.method !== 'GET') return json(res, 405, { success: false });
  const session = getSession(req);
  return json(res, 200, { success: Boolean(session), user: session?.user || null });
};
