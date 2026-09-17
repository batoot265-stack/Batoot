const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1400;
const JPEG_QUALITY = 0.84;

/**
 * Turn a selected browser image into a compact data URL.
 *
 * Product images are stored with the product record so the admin can use an
 * uploaded image even when there is no object-storage service configured.
 * Resizing here keeps localStorage and D1 records reasonably small.
 */
export const imageFileToDataUrl = (file) => new Promise((resolve, reject) => {
  if (!file) {
    reject(new Error('Please choose an image first.'));
    return;
  }

  if (!file.type || !file.type.startsWith('image/')) {
    reject(new Error('Please choose a valid image file.'));
    return;
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    reject(new Error('The image is too large. Please choose an image smaller than 4 MB.'));
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => reject(new Error('The image could not be read. Please try again.'));
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => reject(new Error('The selected file is not a readable image.'));
    image.onload = () => {
      const scale = Math.min(
        1,
        MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height)
      );
      const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
      const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');

      if (!context) {
        resolve(reader.result);
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      // WebP is supported by modern browsers and is much smaller than the
      // original upload. Browsers that do not support it return a PNG data URL.
      resolve(canvas.toDataURL('image/webp', JPEG_QUALITY));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

export const isDataImage = (value) => typeof value === 'string' && value.startsWith('data:image/');
