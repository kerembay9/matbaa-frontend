/* ============================================================
   chrome.jsx — Header, Footer, Drawer, WhatsApp
   ============================================================ */

const NAV_LINKS = [
  { id: "home", label: "Ana Sayfa" },
  { id: "products", label: "Ürünler" },
  { id: "services", label: "Hizmetler" },
  { id: "about", label: "Hakkımızda" },
  { id: "quote", label: "Teklif Al" },
  { id: "contact", label: "İletişim" },
];

function Logo({ onClick, footer }) {
  return (
    <div className={"logo" + (footer ? " logo--footer" : "")} onClick={onClick}>
      <img src="simge-logo.jpeg" alt="Simge Matbaa" className="logo-img" />
    </div>
  );
}

function siteCfg() {
  return window.MATBAA_CONFIG || {};
}

function TopBar() {
  const { nav } = useStore();
  const { PHONE, PHONE_DISPLAY } = siteCfg();
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="tb-left">
          <span className="tb-item"><Icon name="truck" w={14} /> 1–3 iş gününde teslimat</span>
          <span className="tb-item tb-hide"><Icon name="shieldC" w={14} /> Baskı kalite garantisi</span>
        </div>
        <div className="tb-right">
          <a className="tb-item" href={"tel:" + (PHONE || "03262252300")}><Icon name="phone" w={14} /> {PHONE_DISPLAY || PHONE || "0326 225 23 00"}</a>
          <a className="tb-item tb-hide" onClick={() => nav("quote")}>Kurumsal Teklif</a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { route, nav, cartCount, setDrawerOpen, runSearch } = useStore();
  const [searchQ, setSearchQ] = useState(route.search || "");
  useEffect(() => { if (!route.search) setSearchQ(""); }, [route.search]);
  const active = route.page;
  return (
    <React.Fragment>
      <TopBar />
      <header className="site">
        <div className="wrap">
          <div className="bar">
            <Logo onClick={() => nav("home")} />
            <nav className="main">
              {NAV_LINKS.map(l => (
                <a key={l.id} className={active === l.id ? "active" : ""} onClick={() => nav(l.id)}>{l.label}</a>
              ))}
            </nav>
            <div className="searchbar">
              <Icon name="search" w={17} />
              <input placeholder="Kartvizit, broşür, afiş ara…" value={searchQ} onChange={e => setSearchQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runSearch(searchQ); }} />
            </div>
            <div className="head-actions">
              <button className="icon-btn" aria-label="Sepet" onClick={() => nav("cart")}>
                <Icon name="cart" w={19} />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => nav("products")} style={{ marginLeft: 4 }}>
                Online Sipariş
              </button>
              <button className="icon-btn hamburger" aria-label="Menü" onClick={() => setDrawerOpen(true)}><Icon name="menu" w={20} /></button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

function Drawer() {
  const { drawerOpen, setDrawerOpen, nav, route, cartCount } = useStore();
  return (
    <React.Fragment>
      <div className={"drawer-overlay" + (drawerOpen ? " open" : "")} onClick={() => setDrawerOpen(false)}></div>
      <aside className={"drawer" + (drawerOpen ? " open" : "")}>
        <div className="drawer-head">
          <Logo onClick={() => nav("home")} />
          <button className="icon-btn" onClick={() => setDrawerOpen(false)} aria-label="Kapat"><Icon name="close" w={20} /></button>
        </div>
        <nav>
          {NAV_LINKS.map(l => (
            <a key={l.id} className={route.page === l.id ? "active" : ""} onClick={() => nav(l.id)}>
              {l.label} <Icon name="chevR" w={16} />
            </a>
          ))}
          <a className={route.page === "cart" ? "active" : ""} onClick={() => nav("cart")}>
            Sepetim {cartCount > 0 && <span className="chip accent">{cartCount}</span>}
          </a>
          <a className={route.page === "faq" ? "active" : ""} onClick={() => nav("faq")}>SSS <Icon name="chevR" w={16} /></a>
        </nav>
        <div className="drawer-foot">
          <button className="btn btn-primary btn-block" onClick={() => nav("products")}>Online Sipariş Ver</button>
          <button className="btn btn-ghost btn-block" onClick={() => nav("quote")}>Teklif Al</button>
        </div>
      </aside>
    </React.Fragment>
  );
}

function Footer() {
  const { nav } = useStore();
  const { PHONE, PHONE_DISPLAY, EMAIL, ADDRESS, MAPS_URL } = siteCfg();
  const phoneDisplay = PHONE_DISPLAY || PHONE || "0326 225 23 00";
  return (
    <footer className="site">
      <div className="wrap">
        <div className="ftop">
          <div>
            <Logo onClick={() => nav("home")} footer />
            <p className="fdesc">Kartvizitten brandaya, davetiyeden ambalaja tüm baskı ihtiyaçlarınız için online sipariş platformu. Kalite, hız ve güven bir arada.</p>
          </div>
          <div className="fcol">
            <h4>Ürünler</h4>
            {CATEGORIES.slice(0, 6).map(c => <a key={c.id} onClick={() => nav("product", c.id)}>{c.name}</a>)}
          </div>
          <div className="fcol">
            <h4>Kurumsal</h4>
            <a onClick={() => nav("about")}>Hakkımızda</a>
            <a onClick={() => nav("services")}>Hizmetler</a>
            <a onClick={() => nav("quote")}>Teklif Al</a>
            <a onClick={() => nav("faq")}>S.S.S.</a>
            <a onClick={() => nav("contact")}>İletişim</a>
          </div>
          <div className="fcol">
            <h4>İletişim</h4>
            <a href={MAPS_URL || "#"} target="_blank" rel="noopener noreferrer"><Icon name="pin" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />{ADDRESS || "Antakya, Hatay"}</a>
            <a href={"tel:" + (PHONE || "03262252300")}><Icon name="phone" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />{phoneDisplay}</a>
            <a href={"mailto:" + (EMAIL || "antakyasimgeofset@hotmail.com")}><Icon name="mail" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />{EMAIL || "antakyasimgeofset@hotmail.com"}</a>
            <a><Icon name="clock" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />Hafta içi 09:00 – 18:30</a>
          </div>
        </div>
        <div className="fbot">
          <span>© 2026 Simge Matbaa. Tüm hakları saklıdır.</span>
          <span className="cmyk-dots" style={{ alignItems: "center" }}>
            <i></i><i></i><i></i><i></i>
            <span style={{ marginLeft: 8, fontFamily: "var(--font-head)", letterSpacing: ".04em" }}>CMYK ile basılmıştır</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function WhatsApp() {
  const { WHATSAPP_URL } = siteCfg();
  return (
    <a className="wa-float" href={WHATSAPP_URL || "https://wa.me/902120000000"} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile iletişim" title="WhatsApp ile yazın">
      <Icon name="wa" w={30} />
    </a>
  );
}

Object.assign(window, { Header, Footer, Drawer, WhatsApp, Logo, NAV_LINKS });
