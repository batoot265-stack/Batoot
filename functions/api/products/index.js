import { json, err, rowToProduct, productToRow, PRODUCT_UPSERT } from '../../_shared.js';

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM products ORDER BY sort_order ASC, created_at DESC'
    ).all();
    return json((results || []).map(rowToProduct));
  } catch (e) {
    return err(e.message);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const product = {
      ...body,
      id: body.id || 'prod-' + Date.now().toString(36)
    };
    await env.DB.prepare(PRODUCT_UPSERT).bind(...productToRow(product)).run();
    return json(product, 201);
  } catch (e) {
    return err(e.message);
  }
}
