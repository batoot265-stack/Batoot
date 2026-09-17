// WhatsApp helpers.
//
// The store is contacted through a WhatsApp *username* (handle) instead of a
// phone number — nothing in the site exposes a number any more.
//
// WhatsApp's official click-to-chat short link accepts a username directly:
//   https://wa.me/<username>          -> opens the chat
//   https://wa.me/<username>?text=... -> opens the chat with a prefilled message

export const DEFAULT_WHATSAPP_USERNAME = 'nooryxbatoot';

// Strips a leading "@", any "wa.me/" prefix and anything that is not allowed
// in a handle, so " @NooryxBatoot " and "wa.me/nooryxbatoot" both work.
export const normalizeWhatsAppUsername = (value) =>
  String(value || '')
    .trim()
    .replace(/^@/, '')
    .replace(/^https?:\/\/wa\.me\//i, '')
    .replace(/[^A-Za-z0-9._]/g, '');

// Falls back to the default handle when settings hold nothing usable.
export const resolveWhatsAppUsername = (settings) =>
  normalizeWhatsAppUsername(settings?.whatsappUsername) || DEFAULT_WHATSAPP_USERNAME;

// "@nooryxbatoot" — what the UI shows everywhere.
export const formatWhatsAppUsername = (settings) => `@${resolveWhatsAppUsername(settings)}`;

// Full click-to-chat link for the store. `message` is optional and gets
// URL-encoded into the `text` query parameter.
export const buildWhatsAppLink = (settings, message) => {
  const username = resolveWhatsAppUsername(settings);
  const base = `https://wa.me/${username}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
