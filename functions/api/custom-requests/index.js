import { json, err, toISODate } from '../../_shared.js';

const rowToReq = (r) => ({
  id: r.id, name: r.name, phone: r.phone, itemType: r.item_type,
  colorPreference: r.color_preference, size: r.size, deadline: r.deadline,
  description: r.description, status: r.status, createdAt: toISODate(r.created_at)
});

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM custom_requests ORDER BY created_at DESC LIMIT 200'
    ).all();
    return json((results || []).map(rowToReq));
  } catch (e) {
    return err(e.message);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const b = await request.json();
    // Keep the client-provided id so local + cloud records stay in sync.
    const id = b.id || ('REQ-' + Math.floor(100000 + Math.random() * 900000));
    await env.DB.prepare(
      `INSERT INTO custom_requests
       (id, name, phone, item_type, color_preference, size, deadline, description, status)
       VALUES (?,?,?,?,?,?,?,?,?)`
    ).bind(
      id, b.name ?? null, b.phone ?? null, b.itemType ?? null, b.colorPreference ?? null,
      b.size ?? null, b.deadline ?? null, b.description ?? null, b.status || 'Inquiry Sent'
    ).run();
    return json({ ...b, id, status: b.status || 'Inquiry Sent', createdAt: new Date().toISOString() }, 201);
  } catch (e) {
    return err(e.message);
  }
}
