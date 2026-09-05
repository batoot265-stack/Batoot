// Thin client for the Cloudflare D1-backed Pages Functions API.
// Relative URLs only, so it works in the sandbox preview and in production.

const req = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${url} failed (${res.status})`);
  return res.json();
};

export const api = {
  // Products
  listProducts:  ()        => req('/api/products'),
  createProduct: (p)       => req('/api/products',      { method: 'POST', body: JSON.stringify(p) }),
  updateProduct: (id, p)   => req(`/api/products/${id}`,{ method: 'PUT',  body: JSON.stringify(p) }),
  deleteProduct: (id)      => req(`/api/products/${id}`,{ method: 'DELETE' }),

  // Orders
  listOrders:   ()             => req('/api/orders'),
  createOrder:  (o)            => req('/api/orders',        { method: 'POST', body: JSON.stringify(o) }),
  updateOrder:  (id, status)   => req(`/api/orders/${id}`,  { method: 'PUT',  body: JSON.stringify({ status }) }),

  // Custom requests
  listCustomRequests:  ()  => req('/api/custom-requests'),
  createCustomRequest: (r) => req('/api/custom-requests', { method: 'POST', body: JSON.stringify(r) }),

  // Settings
  getSettings:    ()  => req('/api/settings'),
  updateSettings: (s) => req('/api/settings', { method: 'PUT', body: JSON.stringify(s) }),

  seed: () => req('/api/seed', { method: 'POST' })
};
