export const NONCE_HEADER = "x-nonce";
export const UMAMI_SCRIPT_PATH = "/api/umami/script";
export const UMAMI_API_HOST = "https://api-gateway.umami.dev";
export const UMAMI_UPSTREAM_SCRIPT_URL = "https://cloud.umami.is/script.js";

export function createCspNonce() {
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));

  return btoa(String.fromCharCode(...randomBytes));
}

export function buildContentSecurityPolicy(nonce: string) {
  const nonceSource = `'nonce-${nonce}'`;
  const directives = [
    "default-src 'self'",
    `script-src 'self' ${nonceSource}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' ${UMAMI_API_HOST}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'self'",
    "manifest-src 'self'",
  ];

  if (process.env.NODE_ENV === "production") {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export function normalizeSecurityHeader(value: string) {
  return value.replaceAll(/\s{2,}/g, " ").trim();
}
