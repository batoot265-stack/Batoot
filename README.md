# Batoot 🪿 | Handmade Crochet Art Studio

A modern, cozy, yellow & white themed e-commerce website for **Batoot 🪿** handmade crochet creations.

---

## ☁️ Cloudflare D1 Database (`batoot`)

Products, orders, custom requests, and settings are stored in **Cloudflare D1** and
served through **Pages Functions** under `/api/*`.

### One-time setup

1. Get your database id and paste it into `wrangler.toml`:
   ```bash
   npx wrangler d1 list
   ```
2. Create the tables on the cloud database:
   ```bash
   npm run db:seed:remote
   ```
3. Load the default catalog (once deployed, or via local dev):
   ```bash
   curl -X POST https://<your-site>.pages.dev/api/seed
   ```

### Local development with the real database

```bash
npm run dev:cf     # builds + serves on :8788 with a local D1 binding
npm run db:seed    # create tables in the local D1
```

`npm run dev` (plain Vite) still works — if the API isn't reachable the app
falls back to the bundled catalog and localStorage, so the site never breaks.

### API endpoints

| Method | Route | Purpose |
| --- | --- | --- |
| GET / POST | `/api/products` | List / create products |
| GET / PUT / DELETE | `/api/products/:id` | Read / update / delete a product |
| GET / POST | `/api/orders` | List / record orders |
| PUT / DELETE | `/api/orders/:id` | Update status / delete |
| GET / POST | `/api/custom-requests` | List / record custom requests |
| GET / PUT | `/api/settings` | Read / save store settings |
| POST | `/api/seed` | Load the default catalog + settings |

---

## 🌟 Key Features

1. **Yellow & White Cozy Aesthetic**:
   - Palette inspired by warm butter yellow, sunny gold, and crisp clean white.
   - 100% Free Shipping announcement banner on top of every page.
   - Duck & Goose mascot branding with signature logo and cozy typography.

2. **Handmade Catalog (10 Real Products)**:
   - **A Lily Flower 🌺** (490 EGP) - Hero bloom in ceramic vase with photo gallery.
   - **A Tiny Hero 🕷️** (130 EGP) - Spider-Man crochet amigurumi doll.
   - **A Lavender Coaster 🪻** (150 EGP) - Circular flower bud coaster.
   - **Hand-Made Amigurumi Duck 🦆👒** (235 EGP) - Cute duck in brown bonnet with color selector (Yellow / White / Bestie Duo).
   - **Handmade Amigurumi Star ⭐️** (120 EGP) - Glowing star charm with color selector (Yellow / Blue).
   - **A Crescent Keychain / Bag Charm 🌙** (120 EGP) - Golden crescent moon.
   - **A Small Ocean Friend (Mini Whale) 💕** (145 EGP) - Tiny blue whale.
   - **Coquette Ribbed Bow Charm 🎀** (125 EGP) - Ribbed bows in dusty rose, baby pink, and pearl white.
   - **A Pepper to Spice Up Your Life! 🌶️** (120 EGP) - With dynamic image switching for Red 🌶️, Green 🫑, and Yellow 🟡 peppers!
   - **Spider-Man Tapestry & Mask 🕸️** (130 EGP) - Multipurpose decorative coaster / sleep mask.

3. **Shopping Bag & WhatsApp Checkout**:
   - Real-time cart calculations with Free Shipping (0 EGP).
   - Instant WhatsApp checkout redirecting to `+201093536058` (`01093536058`) with greeting, customer address, product names, and totals.

4. **Custom Orders (تنفيذ خاص)**:
   - Form for custom crochet ideas, color preferences, and dimensions dispatching straight to WhatsApp.

5. **Admin Portal 🔒**:
   - Passcode protected (Default PIN: `1234` or `batoot2026`).
   - Add/Edit products, 1-click stock status toggle (In Stock / Sold Out), and delete items.
   - View recent customer orders and custom inquiries.
   - Update WhatsApp hotline number and social accounts.

6. **Official Social Media Accounts**:
   - **Instagram**: [@your.fav.crochet.gurly](https://www.instagram.com/your.fav.crochet.gurly?igsh=Z3c2Nmd0Z2k5azNx)
   - **TikTok**: [@your.fav.crochet.gurly](https://www.tiktok.com/your.fav.crochet.gurly?_r=1&_t=ZS-99NMdUnCZWP)
   - **Facebook**: [Batoot Crochet](https://www.facebook.com/share/1DYjDCmeen/?mibextid=wwXIfr)
   - **WhatsApp**: [01093536058](https://wa.me/201093536058)
