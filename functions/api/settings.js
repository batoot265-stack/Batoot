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
    const entries = Object.entries(body);

    // A null value means "remove this setting" (used to retire old keys).
    const removed = entries.filter(([, v]) => v === null || v === undefined).map(([k]) => k);
    const kept = entries.filter(([, v]) => v !== null && v !== undefined);

    const stmt = env.DB.prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    );
    const batch = kept.map(([k, v]) => stmt.bind(k, JSON.stringify(v)));
    if (removed.length) {
      batch.push(
        env.DB.prepare(
          `DELETE FROM settings WHERE key IN (${removed.map(() => '?').join(', ')})`
        ).bind(...removed)
      );
    }
    if (batch.length) await env.DB.batch(batch);

    const saved = Object.fromEntries(kept);
    return json({ ...saved, removed });
  } catch (e) {
    return err(e.message);
  }
}
