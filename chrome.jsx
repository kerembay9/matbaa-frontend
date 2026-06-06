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
    <div className="logo" onClick={onClick}>
      <div className={"mark" + (footer ? " fmark" : "")}>B</div>
      <div className="lname">
        <b>Bayramoğlu</b>
        <span>Matbaa</span>
      </div>
    </div>
  );
}

function TopBar() {
  const { nav } = useStore();
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="tb-left">
          <span className="tb-item"><Icon name="truck" w={14} /> 1–3 iş gününde teslimat</span>
          <span className="tb-item tb-hide"><Icon name="shieldC" w={14} /> Baskı kalite garantisi</span>
        </div>
        <div className="tb-right">
          <a className="tb-item" onClick={() => nav("contact")}><Icon name="phone" w={14} /> 0212 000 00 00</a>
          <a className="tb-item tb-hide" onClick={() => nav("quote")}>Kurumsal Teklif</a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { route, nav, cartCount, setDrawerOpen } = useStore();
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
              <input placeholder="Kartvizit, broşür, afiş ara…" onKeyDown={(e) => { if (e.key === "Enter") nav("products"); }} />
            </div>
            <div className="head-actions">
              <button className="icon-btn" aria-label="Hesabım" onClick={() => nav("contact")}><Icon name="user" w={19} /></button>
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
  return (
    <footer className="site">
      <div className="wrap">
        <div className="ftop">
          <div>
            <Logo onClick={() => nav("home")} footer />
            <p className="fdesc">Kartvizitten brandaya, davetiyeden ambalaja tüm baskı ihtiyaçlarınız için online sipariş platformu. Kalite, hız ve güven bir arada.</p>
            <div className="fsocial">
              <a aria-label="Instagram"><Icon name="ig" w={17} /></a>
              <a aria-label="Facebook"><Icon name="fb" w={17} /></a>
              <a aria-label="LinkedIn"><Icon name="in" w={17} /></a>
              <a aria-label="X"><Icon name="x" w={17} /></a>
            </div>
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
            <a><Icon name="pin" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />Merkez Mah. Matbaacılar Sk. No:12, İstanbul</a>
            <a><Icon name="phone" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />0212 000 00 00</a>
            <a><Icon name="mail" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />info@bayramoglumatbaa.com</a>
            <a><Icon name="clock" w={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />Hafta içi 09:00 – 18:30</a>
          </div>
        </div>
        <div className="fbot">
          <span>© 2026 Bayramoğlu Matbaa. Tüm hakları saklıdır.</span>
          <span className="cmyk-dots" style={{ alignItems: "center" }}>
            <i></i><i></i><i></i><i></i>
            <span style={{ marginLeft: 8, fontFamily: "var(--font-head)", letterSpacing: ".04em" }}>CMYK ile basılmıştır</span>
          </span>
          <span style={{ display: "flex", gap: 16 }}>
            <a>Gizlilik</a><a>Kullanım Koşulları</a><a>KVKK</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function WhatsApp() {
  return (
    <button className="wa-float" aria-label="WhatsApp ile iletişim" title="WhatsApp ile yazın">
      <Icon name="wa" w={30} />
    </button>
  );
}

Object.assign(window, { Header, Footer, Drawer, WhatsApp, Logo, NAV_LINKS });
