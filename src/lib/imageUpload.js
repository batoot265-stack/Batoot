// Reads image files picked from the device and converts them to compressed
// data URLs (base64 JPEG) so they can be stored directly on the product
// (localStorage + Cloudflare D1 TEXT column) with no external image host.

const MAX_SIDE = 900;    // px – longest edge after resize
const QUALITY = 0.8;     // JPEG quality

// Cloudflare D1 caps a single row at ~2 MB, so keep the whole gallery under that.
export const MAX_TOTAL_IMAGE_BYTES = 1_700_000;
export const totalDataUrlBytes = (urls) => urls.reduce((n, u) => n + (u ? u.length : 0), 0);

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not decode image'));
    img.src = src;
  });

export const fileToCompressedDataUrl = async (file) => {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG, WEBP…)');
  }

  const rawUrl = await readAsDataUrl(file);

  // GIFs lose animation through canvas – keep them as-is if small enough.
  if (file.type === 'image/gif' && file.size < 1.5 * 1024 * 1024) return rawUrl;

  try {
    const img = await loadImage(rawUrl);
    const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; // flatten transparency onto white
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', QUALITY);
  } catch {
    return rawUrl;
  }
};

export const filesToDataUrls = async (fileList) => {
  const files = Array.from(fileList || []);
  const out = [];
  for (const f of files) {
    out.push(await fileToCompressedDataUrl(f));
  }
  return out;
};
