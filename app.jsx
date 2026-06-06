/* ============================================================
   app.jsx — Router + Tweaks + Mount
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "default",
  "radius": "regular",
  "headingFont": "Space Grotesk"
}/*EDITMODE-END*/;

function Router() {
  const { route } = useStore();
  const { page, param } = route;
  switch (page) {
    case "home": return <HomePage />;
    case "products": return <ProductsPage />;
    case "product": return <ProductDetailPage id={param} />;
    case "services": return <ServicesPage />;
    case "about": return <AboutPage />;
    case "quote": return <QuotePage />;
    case "contact": return <ContactPage />;
    case "faq": return <FaqPage />;
    case "cart": return <CartPage />;
    case "checkout": return <CheckoutPage />;
    default: return <HomePage />;
  }
}

function TweakControls() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", t.palette);
    const rad = { sharp: ["4px", "6px", "10px", "14px"], regular: ["8px", "12px", "18px", "26px"], round: ["14px", "20px", "26px", "34px"] }[t.radius] || ["8px", "12px", "18px", "26px"];
    root.style.setProperty("--r-sm", rad[0]);
    root.style.setProperty("--r", rad[1]);
    root.style.setProperty("--r-lg", rad[2]);
    root.style.setProperty("--r-xl", rad[3]);
    root.style.setProperty("--font-head", `"${t.headingFont}", "Manrope", sans-serif`);
  }, [t.palette, t.radius, t.headingFont]);

  return (
    <TweaksPanel>
      <TweakSection label="Renk Teması" />
      <TweakRadio label="Palet" value={t.palette}
        options={["default", "ink-red", "forest", "indigo"]}
        onChange={(v) => setTweak("palette", v)} />
      <TweakSection label="Biçim" />
      <TweakRadio label="Köşe" value={t.radius}
        options={["sharp", "regular", "round"]}
        onChange={(v) => setTweak("radius", v)} />
      <TweakRadio label="Başlık fontu" value={t.headingFont}
        options={["Space Grotesk", "Sora"]}
        onChange={(v) => setTweak("headingFont", v)} />
    </TweaksPanel>
  );
}

function AppShell() {
  const { catalogLoading, cartLoading } = useStore();
  if (catalogLoading || cartLoading) {
    return (
      <div className="app-root" style={{ minHeight: "60vh", display: "grid", placeItems: "center", color: "var(--muted)", fontFamily: "var(--font-head)", fontWeight: 600 }}>
        Yükleniyor…
      </div>
    );
  }
  if (window.CATALOG_ERROR) {
    return (
      <div className="app-root" style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
        <div>
          <h2 style={{ marginBottom: 8 }}>Backend bağlantısı kurulamadı</h2>
          <p className="text-muted">{window.CATALOG_ERROR}</p>
          <p className="text-muted" style={{ marginTop: 8, fontSize: 14 }}>{window.MATBAA_CONFIG?.API_BASE} · tenant: {window.MATBAA_CONFIG?.TENANT_ID}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="app-root">
      <Header />
      <Router />
      <Footer />
      <Drawer />
      <WhatsApp />
      <Toasts />
      <TweakControls />
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
