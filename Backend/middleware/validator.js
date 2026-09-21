/**
 * Security & Input Validation Helper Middleware
 */

export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags
    .trim();
}

export function validateNik(nik) {
  if (!nik || typeof nik !== 'string') return false;
  return /^\d{16}$/.test(nik.trim());
}

export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.replace(/[\s-]/g, '');
  return /^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(clean);
}
