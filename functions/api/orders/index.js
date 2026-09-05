import { json, err } from '../../_shared.js';

const rowToOrder = (r) => {
  let items = [];
  try { items = JSON.parse(r.items || '[]'); } catch {}
  return {
    id: r.id, name: r.name, phone: r.phone, address: r.address,
    governorate: r.governorate, notes: r.notes, items,
    total: r.total, status: r.status, createdAt: r.created_at
  };
};

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 200'
    ).all();
    return json((results || []).map(rowToOrder));
  } catch (e) {
    return err(e.message);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const b = await request.json();
    const id = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const status = b.status || 'Pending WhatsApp Confirmation';
    await env.DB.prepare(
      `INSERT INTO orders (id, name, phone, address, governorate, notes, items, total, status)
       VALUES (?,?,?,?,?,?,?,?,?)`
    ).bind(
      id, b.name ?? null, b.phone ?? null, b.address ?? null, b.governorate ?? null,
      b.notes ?? null, JSON.stringify(b.items ?? []), Number(b.total) || 0, status
    ).run();
    return json({ ...b, id, status, createdAt: new Date().toISOString() }, 201);
  } catch (e) {
    return err(e.message);
  }
}
