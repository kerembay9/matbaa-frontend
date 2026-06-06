/* ============================================================
   api.js — Backend client for webdeploy.horizonzeta.com
   ============================================================ */

const CART_SID_KEY = 'bm_cart_sid';

function cfg() {
  return window.MATBAA_CONFIG || { API_BASE: '', TENANT_ID: '' };
}

function getCartSession() {
  let sid = localStorage.getItem(CART_SID_KEY);
  if (!sid) {
    sid = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'cs-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    localStorage.setItem(CART_SID_KEY, sid);
  }
  return sid;
}

async function api(path, opts = {}) {
  const { API_BASE, TENANT_ID } = cfg();
  const headers = {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT_ID,
    'x-cart-session': getCartSession(),
    ...(opts.headers || {}),
  };
  const res = await fetch(API_BASE + path, {
    ...opts,
    headers,
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'request_failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function uploadArtwork(file) {
  const { API_BASE, TENANT_ID } = cfg();
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(API_BASE + '/api/upload', {
    method: 'POST',
    headers: {
      'x-tenant-id': TENANT_ID,
      'x-cart-session': getCartSession(),
    },
    body: fd,
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'upload_failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

function mapSearchItem(p) {
  const known = (window.PRODUCTS || []).find(x => x.id === p.id || x.slug === p.slug);
  if (known) return known;
  const catSlug = p.category?.slug
    || (window.CATEGORIES || []).find(c => c.id === p.categoryId)?.slug
    || 'kartvizit';
  const catMeta = (window.CATEGORY_META || {})[catSlug] || { kind: catSlug, tone: 'navy' };
  const catName = p.category?.name
    || (window.CATEGORIES || []).find(c => c.id === p.categoryId || c.slug === catSlug)?.name
    || '';
  return {
    id: p.id,
    slug: p.slug,
    name: p.title || p.name,
    cat: catName,
    catId: catSlug,
    kind: catMeta.kind,
    tone: catMeta.tone,
    price: p.price,
    unit: '/ baskı',
    rating: 4.8,
    reviews: 0,
    desc: p.description || '',
    featured: p.featured,
  };
}

function mapCartItem(i) {
  const slug = i.product?.category?.slug || 'kartvizit';
  const catMeta = (window.CATEGORY_META || {})[slug] || { kind: slug, tone: 'navy' };
  return {
    lineKey: i.lineKey,
    id: i.product?.id,
    slug: i.product?.slug,
    name: i.product?.title || i.optionsLabel || 'Ürün',
    kind: catMeta.kind,
    tone: catMeta.tone,
    opts: i.optionsLabel || 'Standart seçenekler',
    qty: i.qty,
    lineTotal: i.unitPrice ?? i.product?.price ?? 0,
    unit: i.optionsLabel?.includes('adet') ? '' : '/ baskı',
  };
}

const MatbaaApi = {
  getCategories: () => api('/api/categories'),
  getProducts: (category) => api('/api/products' + (category ? '?category=' + encodeURIComponent(category) : '')),
  getProduct: (slug) => api('/api/products/' + encodeURIComponent(slug)),
  getCart: () => api('/api/cart'),
  addToCart: (body) => api('/api/cart', { method: 'POST', body: JSON.stringify(body) }),
  updateCartQty: (lineKey, qty) => api('/api/cart', { method: 'PATCH', body: JSON.stringify({ lineKey, qty }) }),
  removeFromCart: (lineKey) => api('/api/cart', { method: 'DELETE', body: JSON.stringify({ lineKey }) }),
  checkout: (body) => api('/api/checkout', { method: 'POST', body: JSON.stringify(body) }),
  submitContact: (body) => api('/api/contact', { method: 'POST', body: JSON.stringify(body) }),
  submitQuote: (body) => api('/api/contact', { method: 'POST', body: JSON.stringify({ type: 'quote', ...body }) }),
  search: (q) => api('/api/search?q=' + encodeURIComponent(q)).then(items => items.map(mapSearchItem)),
  uploadArtwork: (file) => uploadArtwork(file),
  mapCartItems: (cart) => (cart?.items || []).map(mapCartItem),
  mapSearchItems: (items) => (items || []).map(mapSearchItem),
  cartCount: (cart) => (cart?.items || []).reduce((n, x) => n + x.qty, 0),
  cartTotal: (cart) => (cart?.items || []).reduce((n, x) => n + (x.unitPrice ?? 0) * x.qty, 0),
};

Object.assign(window, { MatbaaApi, getCartSession });
