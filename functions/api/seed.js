import { json, err, productToRow, PRODUCT_UPSERT } from '../_shared.js';
import { initialProducts, initialSettings } from '../../src/data/initialProducts.js';

// POST /api/seed — loads the default catalog + settings into D1.
// Safe to re-run: products are upserted by id.
export async function onRequestPost({ env }) {
  try {
    const pStmt = env.DB.prepare(PRODUCT_UPSERT);
    await env.DB.batch(
      initialProducts.map((p, i) => pStmt.bind(...productToRow(p, i)))
    );

    const sStmt = env.DB.prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    );
    await env.DB.batch(
      Object.entries(initialSettings).map(([k, v]) => sStmt.bind(k, JSON.stringify(v)))
    );

    return json({ ok: true, products: initialProducts.length });
  } catch (e) {
    return err(e.message);
  }
}
