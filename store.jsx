/* ============================================================
   store.jsx — Sepet + yönlendirme (backend-backed)
   ============================================================ */
const { createContext, useContext, useState, useEffect, useCallback, useRef } = React;

const StoreCtx = createContext(null);
const useStore = () => useContext(StoreCtx);

function StoreProvider({ children }) {
  const [route, setRoute] = useState({ page: "home", param: null });
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const tid = useRef(0);

  const refreshCart = useCallback(async () => {
    try {
      const raw = await MatbaaApi.getCart();
      setCart(MatbaaApi.mapCartItems(raw));
    } catch (e) {
      console.error('Cart sync failed', e);
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog().finally(() => setCatalogLoading(false));
    refreshCart();
  }, [refreshCart]);

  const nav = useCallback((page, param = null) => {
    setRoute({ page, param });
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    try { window.scrollTo(0, 0); } catch (e) {}
  }, []);

  const toast = useCallback((msg) => {
    const id = ++tid.current;
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(async (item) => {
    try {
      await MatbaaApi.addToCart({
        productId: item.productId || item.id,
        qty: item.qty || 1,
        lineKey: item.lineKey,
        unitPrice: item.unitPrice ?? item.lineTotal,
        optionsJson: item.optionsJson,
        optionsLabel: item.optionsLabel || item.opts,
      });
      await refreshCart();
      toast((item.name || 'Ürün') + " sepete eklendi");
    } catch (e) {
      toast(e.message || 'Sepete eklenemedi');
    }
  }, [refreshCart, toast]);

  const updateQty = useCallback(async (lineKey, delta) => {
    const row = cart.find(x => x.lineKey === lineKey);
    if (!row) return;
    const qty = Math.max(1, row.qty + delta);
    try {
      await MatbaaApi.updateCartQty(lineKey, qty);
      await refreshCart();
    } catch (e) {
      toast(e.message || 'Adet güncellenemedi');
    }
  }, [cart, refreshCart, toast]);

  const removeItem = useCallback(async (lineKey) => {
    try {
      await MatbaaApi.removeFromCart(lineKey);
      await refreshCart();
    } catch (e) {
      toast(e.message || 'Kaldırılamadı');
    }
  }, [refreshCart, toast]);

  const clearCart = useCallback(async () => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((n, x) => n + x.qty, 0);
  const cartTotal = cart.reduce((n, x) => n + x.lineTotal * x.qty, 0);

  const value = {
    route, nav, cart, cartCount, cartTotal, cartLoading, catalogLoading,
    addToCart, updateQty, removeItem, clearCart, refreshCart,
    toast, toasts, drawerOpen, setDrawerOpen,
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

const fmt = (n) => new Intl.NumberFormat("tr-TR").format(Math.round(n));
const tl = (n) => "₺" + fmt(n);

Object.assign(window, { StoreCtx, StoreProvider, useStore, fmt, tl });
