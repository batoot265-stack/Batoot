-- Batoot 🪿 — Cloudflare D1 schema
-- Apply locally:  npx wrangler d1 execute batoot --local  --file=./schema.sql
-- Apply remote:   npx wrangler d1 execute batoot --remote --file=./schema.sql

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  category        TEXT,
  price           REAL NOT NULL DEFAULT 0,
  original_price  REAL,
  image           TEXT,
  gallery         TEXT NOT NULL DEFAULT '[]',   -- JSON array
  colors          TEXT NOT NULL DEFAULT '[]',   -- JSON array
  color_images    TEXT NOT NULL DEFAULT '{}',   -- JSON object
  badge           TEXT,
  in_stock        INTEGER NOT NULL DEFAULT 1,
  rating          REAL DEFAULT 5,
  reviews_count   INTEGER DEFAULT 0,
  short_description TEXT,
  description     TEXT,
  dimensions      TEXT,
  yarn_type       TEXT,
  care_guide      TEXT,
  is_featured     INTEGER NOT NULL DEFAULT 0,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(is_featured);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id           TEXT PRIMARY KEY,
  name         TEXT,
  phone        TEXT,
  address      TEXT,
  governorate  TEXT,
  notes        TEXT,
  items        TEXT NOT NULL DEFAULT '[]',  -- JSON array
  total        REAL NOT NULL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'Pending WhatsApp Confirmation',
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

DROP TABLE IF EXISTS custom_requests;
CREATE TABLE custom_requests (
  id               TEXT PRIMARY KEY,
  name             TEXT,
  phone            TEXT,
  item_type        TEXT,
  color_preference TEXT,
  size             TEXT,
  deadline         TEXT,
  description      TEXT,
  status           TEXT NOT NULL DEFAULT 'Inquiry Sent',
  created_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_custom_created ON custom_requests(created_at DESC);

DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Default store settings (WhatsApp is reached by username, not by number).
INSERT INTO settings (key, value) VALUES
  ('storeName',        '"Batoot 🪿"'),
  ('tagline',          '"Handmade Crochet with Love"'),
  ('whatsappUsername', '"nooryxbatoot"'),
  ('announcementText', '"✨ 100% HANDMADE WITH LOVE 🪿 • FAST DIRECT WHATSAPP CHECKOUT 💬"'),
  ('instagramUrl',     '"https://www.instagram.com/your.fav.crochet.gurly?igsh=Z3c2Nmd0Z2k5azNx"'),
  ('instagramHandle',  '"@your.fav.crochet.gurly"'),
  ('facebookUrl',      '"https://www.facebook.com/share/1DYjDCmeen/?mibextid=wwXIfr"'),
  ('tiktokUrl',        '"https://www.tiktok.com/@your.fav.crochet.gurly?_r=1&_t=ZS-99NMdUnCZWP"'),
  ('tiktokHandle',     '"@your.fav.crochet.gurly"'),
  ('adminPin',         '"109212"'),
  ('currency',         '"EGP"')
ON CONFLICT(key) DO UPDATE SET value = excluded.value;

-- The WhatsApp number is retired: never keep it in the settings table.
DELETE FROM settings WHERE key IN ('whatsappNumber', 'whatsappDisplay', 'phone');
