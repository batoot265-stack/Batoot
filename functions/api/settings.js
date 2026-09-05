import { json, err } from '../_shared.js';

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare('SELECT key, value FROM settings').all();
    const out = {};
    for (const r of results || []) {
      try { out[r.key] = JSON.parse(r.value); } catch { out[r.key] = r.value; }
    }
    return json(out);
  } catch (e) {
    return err(e.message);
  }
}

export async function onRequestPut({ request, env }) {
  try {
    const body = await request.json();
    const stmt = env.DB.prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    );
    const batch = Object.entries(body).map(([k, v]) => stmt.bind(k, JSON.stringify(v)));
    if (batch.length) await env.DB.batch(batch);
    return json(body);
  } catch (e) {
    return err(e.message);
  }
}
