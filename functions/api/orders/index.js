import { json, err, toISODate } from '../../_shared.js';

const rowToOrder = (r) => {
  let items = [];
  try { items = JSON.parse(r.items || '[]'); } catch {}
  return {
    id: r.id, name: r.name, phone: r.phone, address: r.address,
    governorate: r.governorate, notes: r.notes, items,
    total: r.total, status: r.status, createdAt: toISODate(r.created_at)
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
    // Accept the client-provided id so local + cloud records stay in sync,
    // and accept legacy aliases (customerName/totalAmount) defensively.
    const id = b.id || ('ORD-' + Math.floor(100000 + Math.random() * 900000));
    const name = b.name ?? b.customerName ?? null;
    const total = Number(b.total ?? b.totalAmount) || 0;
    const status = b.status || 'Pending WhatsApp Confirmation';
    await env.DB.prepare(
      `INSERT INTO orders (id, name, phone, address, governorate, notes, items, total, status)
       VALUES (?,?,?,?,?,?,?,?,?)`
    ).bind(
      id, name, b.phone ?? null, b.address ?? null, b.governorate ?? null,
      b.notes ?? null, JSON.stringify(b.items ?? []), total, status
    ).run();
    return json({ ...b, id, name, total, status, createdAt: new Date().toISOString() }, 201);
  } catch (e) {
    return err(e.message);
  }
}
