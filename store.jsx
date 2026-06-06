/* ============================================================
   store.jsx — Sepet + yönlendirme context'i
   ============================================================ */
const { createContext, useContext, useState, useEffect, useCallback, useRef } = React;

const StoreCtx = createContext(null);
const useStore = () => useContext(StoreCtx);

function StoreProvider({ children }) {
  const [route, setRoute] = useState({ page: "home", param: null });
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bm_cart") || "[]"); } catch (e) { return []; }
  });
  const [toasts, setToasts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const tid = useRef(0);

  useEffect(() => { localStorage.setItem("bm_cart", JSON.stringify(cart)); }, [cart]);

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

  const addToCart = useCallback((item) => {
    setCart(c => {
      const key = item.lineKey;
      const exist = c.find(x => x.lineKey === key);
      if (exist) return c.map(x => x.lineKey === key ? { ...x, qty: x.qty + item.qty } : x);
      return [...c, item];
    });
    toast(item.name + " sepete eklendi");
  }, [toast]);

  const updateQty = useCallback((lineKey, delta) => {
    setCart(c => c.map(x => x.lineKey === lineKey ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  }, []);

  const removeItem = useCallback((lineKey) => {
    setCart(c => c.filter(x => x.lineKey !== lineKey));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((n, x) => n + x.qty, 0);
  const cartTotal = cart.reduce((n, x) => n + x.lineTotal * x.qty, 0);

  const value = {
    route, nav, cart, cartCount, cartTotal,
    addToCart, updateQty, removeItem, clearCart,
    toast, toasts, drawerOpen, setDrawerOpen,
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

/* helpers */
const fmt = (n) => new Intl.NumberFormat("tr-TR").format(Math.round(n));
const tl = (n) => "₺" + fmt(n);

Object.assign(window, { StoreCtx, StoreProvider, useStore, fmt, tl });
