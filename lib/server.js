const crypto = require('crypto');
const { neon } = require('@neondatabase/serverless');

const COOKIE_NAME = 'paud_session';
const SESSION_SECONDS = 60 * 60 * 8;
let schemaReady;

function json(res, status, payload) {
  res.status(status)
    .setHeader('Content-Type', 'application/json; charset=utf-8')
    .setHeader('Cache-Control', 'no-store, max-age=0');
  return res.end(JSON.stringify(payload));
}

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
}

function getSql() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) throw new Error('DATABASE_NOT_CONFIGURED');
  return neon(databaseUrl);
}

async function ensureSchema() {
  if (!schemaReady) {
    const sql = getSql();
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS scores (
        id BIGSERIAL PRIMARY KEY,
        nama_anak VARCHAR(100) NOT NULL,
        permainan VARCHAR(40) NOT NULL,
        skor INTEGER NOT NULL DEFAULT 0,
        total_soal INTEGER NOT NULL DEFAULT 0,
        waktu_main TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
  }
  return schemaReady;
}

function secret() {
  return process.env.AUTH_SECRET || 'development-only-change-auth-secret';
}

function encode(value) {
  return Buffer.from(value).toString('base64url');
}

function sign(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

function createSession(user) {
  const payload = encode(JSON.stringify({ user, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS }));
  return `${payload}.${sign(payload)}`;
}

function parseCookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').map((entry) => {
    const index = entry.indexOf('=');
    return index < 0 ? [] : [entry.slice(0, index).trim(), decodeURIComponent(entry.slice(index + 1).trim())];
  }).filter((entry) => entry.length));
}

function getSession(req) {
  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return null;
  const [payload, signature] = token.split('.');
  const expectedSignature = payload ? sign(payload) : '';
  if (!payload || !signature || signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return session.exp > Math.floor(Date.now() / 1000) ? session : null;
  } catch {
    return null;
  }
}

function setSessionCookie(res, user) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${createSession(user)}; Max-Age=${SESSION_SECONDS}; Path=/; HttpOnly; SameSite=Lax${secure}`);
}

function clearSessionCookie(res) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${secure}`);
}

function requireSession(req, res) {
  const session = getSession(req);
  if (!session) {
    json(res, 401, { success: false, message: 'Silakan masuk terlebih dahulu.' });
    return null;
  }
  return session;
}

module.exports = { clearSessionCookie, ensureSchema, getSession, getSql, json, requireSession, setSessionCookie };
