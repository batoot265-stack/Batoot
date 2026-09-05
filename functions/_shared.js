export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });

export const err = (message, status = 500) => json({ error: message }, status);

const parse = (raw, fallback) => {
  try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};

// D1 row -> shape used by the React app
export const rowToProduct = (r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  price: r.price,
  originalPrice: r.original_price ?? undefined,
  image: r.image,
  gallery: parse(r.gallery, []),
  colors: parse(r.colors, []),
  colorImages: parse(r.color_images, {}),
  badge: r.badge ?? undefined,
  inStock: !!r.in_stock,
  rating: r.rating,
  reviewsCount: r.reviews_count,
  shortDescription: r.short_description,
  description: r.description,
  dimensions: r.dimensions,
  yarnType: r.yarn_type,
  careGuide: r.care_guide,
  isFeatured: !!r.is_featured
});

// React shape -> D1 bind values
export const productToRow = (p, sortOrder = 0) => ([
  p.id,
  p.name ?? '',
  p.category ?? null,
  Number(p.price) || 0,
  p.originalPrice != null ? Number(p.originalPrice) : null,
  p.image ?? null,
  JSON.stringify(p.gallery ?? []),
  JSON.stringify(p.colors ?? []),
  JSON.stringify(p.colorImages ?? {}),
  p.badge ?? null,
  p.inStock === false ? 0 : 1,
  Number(p.rating) || 5,
  Number(p.reviewsCount) || 0,
  p.shortDescription ?? null,
  p.description ?? null,
  p.dimensions ?? null,
  p.yarnType ?? null,
  p.careGuide ?? null,
  p.isFeatured ? 1 : 0,
  sortOrder
]);

export const PRODUCT_UPSERT = `
INSERT INTO products (
  id, name, category, price, original_price, image, gallery, colors, color_images,
  badge, in_stock, rating, reviews_count, short_description, description,
  dimensions, yarn_type, care_guide, is_featured, sort_order
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
ON CONFLICT(id) DO UPDATE SET
  name=excluded.name, category=excluded.category, price=excluded.price,
  original_price=excluded.original_price, image=excluded.image, gallery=excluded.gallery,
  colors=excluded.colors, color_images=excluded.color_images, badge=excluded.badge,
  in_stock=excluded.in_stock, rating=excluded.rating, reviews_count=excluded.reviews_count,
  short_description=excluded.short_description, description=excluded.description,
  dimensions=excluded.dimensions, yarn_type=excluded.yarn_type,
  care_guide=excluded.care_guide, is_featured=excluded.is_featured`;

// SQLite datetime('now') -> ISO 8601 (UTC) so `new Date()` parses it in every browser.
export const toISODate = (sqliteDatetime) => {
  if (!sqliteDatetime) return new Date().toISOString();
  if (sqliteDatetime instanceof Date) return sqliteDatetime.toISOString();
  const s = String(sqliteDatetime).trim();
  if (/T/.test(s)) return s.endsWith('Z') ? s : `${s}Z`;
  return `${s.replace(' ', 'T')}Z`;
};
