/* ============================================================
   catalog.js — Load categories/products from backend API
   ============================================================ */

const CATEGORY_META = {
  kartvizit: { kind: 'kartvizit', tone: 'navy' },
  brosur: { kind: 'brosur', tone: 'orange' },
  katalog: { kind: 'katalog', tone: 'slate' },
  afis: { kind: 'afis', tone: 'magenta' },
  branda: { kind: 'branda', tone: 'cyan' },
  etiket: { kind: 'etiket', tone: 'green' },
  davetiye: { kind: 'davetiye', tone: 'plum' },
  ambalaj: { kind: 'ambalaj', tone: 'gold' },
  promosyon: { kind: 'promosyon', tone: 'orange' },
  'grafik-tasarim': { kind: 'grafik', tone: 'navy' },
};

window.CATEGORY_META = CATEGORY_META;

let catalogReady = null;

function loadCatalog() {
  if (catalogReady) return catalogReady;
  catalogReady = Promise.all([
    MatbaaApi.getCategories(),
    MatbaaApi.getProducts(),
  ]).then(([categories, products]) => {
    window.CATEGORIES = categories;
    window.PRODUCTS = products;
    return { categories, products };
  }).catch((err) => {
    console.error('Catalog load failed', err);
    window.CATALOG_ERROR = err.message || 'Katalog yüklenemedi';
    return { categories: window.CATEGORIES || [], products: window.PRODUCTS || [] };
  });
  return catalogReady;
}

Object.assign(window, { loadCatalog });
