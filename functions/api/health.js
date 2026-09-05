import { json } from '../_shared.js';

// GET /api/health — diagnose the D1 connection from the browser.
// Open https://<your-site>.pages.dev/api/health to see exactly what's wrong:
//
//  { "ok": true, "db": true, "tables": {...}, "counts": {...} }
//  means the database is bound, the schema exists, and everything works.
//
//  Common failures:
//  - "D1 binding DB is missing"        -> attach the D1 binding in the
//    Cloudflare dashboard (Pages project > Settings > Bindings > D1, name: DB)
//    for the Production environment, then redeploy.
//  - "no such table: products"         -> the schema was never applied to the
//    remote DB. Run:  npx wrangler d1 execute batoot --remote --file=./schema.sql
//  - counts.products === 0             -> tables exist but are empty.
//    Seed once:  curl -X POST https://<your-site>.pages.dev/api/seed
//    (or use the "seed catalog" button in the Admin Portal).
const REQUIRED_TABLES = ['products', 'orders', 'custom_requests', 'settings'];

export async function onRequestGet({ env }) {
  const out = {
    ok: false,
    db: false,
    tables: {},
    counts: {},
    error: null,
    hint: null,
    time: new Date().toISOString()
  };

  try {
    if (!env.DB) {
      out.error = 'D1 binding "DB" is missing (env.DB is undefined).';
      out.hint = 'Attach the D1 database in the Cloudflare dashboard: Pages project > Settings > Bindings > Add > D1 database, variable name DB, for the Production environment — then redeploy.';
      return json(out, 500);
    }
    out.db = true;

    const { results } = await env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table'"
    ).all();
    const existing = new Set((results || []).map((r) => r.name));

    for (const t of REQUIRED_TABLES) {
      out.tables[t] = existing.has(t);
      if (existing.has(t)) {
        // Table names come from a hardcoded allow-list, so this is safe.
        const row = await env.DB.prepare(`SELECT COUNT(*) AS c FROM ${t}`).first();
        out.counts[t] = row ? row.c : 0;
      }
    }

    const missing = REQUIRED_TABLES.filter((t) => !out.tables[t]);
    if (missing.length > 0) {
      out.error = `Missing tables in D1: ${missing.join(', ')}.`;
      out.hint = 'Apply the schema to the REMOTE database: npx wrangler d1 execute batoot --remote --file=./schema.sql';
      return json(out, 500);
    }

    if ((out.counts.products ?? 0) === 0) {
      out.ok = true;
      out.error = null;
      out.hint = 'Database is connected but the catalog is empty. POST /api/seed once (or use the Admin Portal seed button) to load the default products.';
      return json(out);
    }

    out.ok = true;
    return json(out);
  } catch (e) {
    out.error = e.message || 'Unknown database error.';
    if (/no such table/i.test(out.error)) {
      out.hint = 'Apply the schema to the REMOTE database: npx wrangler d1 execute batoot --remote --file=./schema.sql';
    }
    return json(out, 500);
  }
}
