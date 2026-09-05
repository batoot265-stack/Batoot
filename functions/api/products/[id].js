import { json, err, rowToProduct, productToRow, PRODUCT_UPSERT } from '../../_shared.js';

export async function onRequestGet({ params, env }) {
  try {
    const row = await env.DB.prepare('SELECT * FROM products WHERE id = ?')
      .bind(params.id).first();
    if (!row) return err('Product not found', 404);
    return json(rowToProduct(row));
  } catch (e) {
    return err(e.message);
  }
}

export async function onRequestPut({ params, request, env }) {
  try {
    const existing = await env.DB.prepare('SELECT * FROM products WHERE id = ?')
      .bind(params.id).first();
    if (!existing) return err('Product not found', 404);

    const merged = { ...rowToProduct(existing), ...(await request.json()), id: params.id };
    await env.DB.prepare(PRODUCT_UPSERT)
      .bind(...productToRow(merged, existing.sort_order)).run();
    return json(merged);
  } catch (e) {
    return err(e.message);
  }
}

export async function onRequestDelete({ params, env }) {
  try {
    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(params.id).run();
    return json({ ok: true, id: params.id });
  } catch (e) {
    return err(e.message);
  }
}
