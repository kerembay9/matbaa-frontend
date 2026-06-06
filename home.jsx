/* ============================================================
   home.jsx — Ana Sayfa
   ============================================================ */

function Hero() {
  const { nav } = useStore();
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow">Online Baskı Platformu</span>
          <h1 style={{ marginTop: 18 }}>Baskı Çözümlerinde<br />Kalite, Hız ve <span className="hl">Güven</span></h1>
          <p className="lead">Kartvizitten afişe, broşürden ambalaja kadar tüm baskı ihtiyaçlarınızı kolayca online sipariş verin. Dosyanızı yükleyin, biz basıp kapınıza getirelim.</p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => nav("products")}>Hemen Sipariş Ver <Icon name="arrow" w={17} /></button>
            <button className="btn btn-ghost btn-lg" onClick={() => nav("products")}>Ürünleri İncele</button>
          </div>
          <div className="hero-trust">
            <div className="ht"><b>12+</b><span>Ürün Kategorisi</span></div>
            <div className="vr"></div>
            <div className="ht"><b>20.000+</b><span>Tamamlanan Sipariş</span></div>
            <div className="vr"></div>
            <div className="ht"><b>1–3 gün</b><span>Hızlı Teslimat</span></div>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual">
      <PressAnimation />
      <div className="hv-float f1">
        <span className="ic" style={{ background: "var(--accent-tint)", color: "var(--accent-700)" }}><Icon name="bolt" w={20} /></span>
        <div><b>Aynı gün baskı</b><small>acil işleriniz için</small></div>
      </div>
      <div className="hv-float f2">
        <span className="ic" style={{ background: "rgba(44,140,100,.12)", color: "var(--ok)" }}><Icon name="shieldC" w={20} /></span>
        <div><b>Kalite garantisi</b><small>onaysız baskı yok</small></div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["Kartvizit", "Dijital Baskı", "Broşür", "Katalog", "Afiş", "Branda", "Etiket", "Davetiye", "Kurumsal Kimlik", "Promosyon", "Ambalaj", "Grafik Tasarım"];
  const row = (
    <span>{items.map((t, i) => <React.Fragment key={i}>{t}</React.Fragment>).reduce((a, b) => a)}</span>
  );
  return (
    <div className="strip">
      <div className="strip-track">
        {[0, 1].map(k => (
          <span key={k} style={{ display: "inline-flex" }}>
            {items.map((t, i) => <span key={i}>{t}</span>)}
          </span>
        ))}
      </div>
    </div>
  );
}

function Categories() {
  const { nav } = useStore();
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
          <SectionHead eyebrow="Öne Çıkan Kategoriler" title="Ne basmak istersiniz?" sub="İhtiyacınız olan ürünü seçin, dakikalar içinde siparişinizi oluşturun." />
          <button className="btn btn-ghost" onClick={() => nav("products")}>Tüm Ürünler <Icon name="arrow" w={16} /></button>
        </div>
        <div className="grid cols-5">
          {CATEGORIES.slice(0, 10).map(c => <CategoryCard key={c.id} cat={c} />)}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section why">
      <div className="wrap">
        <SectionHead eyebrow="Neden Bayramoğlu Matbaa?" title="Baskı işiniz emin ellerde" sub="Binlerce bireysel ve kurumsal müşterinin tercih ettiği güvenilir baskı partneri." center light />
        <div className="grid cols-3 feat-grid">
          {FEATURES.map((f, i) => (
            <div className="feat" key={i}>
              <span className="ic"><Icon name={f.icon} w={25} /></span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Popular() {
  const store = useStore();
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
          <SectionHead eyebrow="Popüler Ürünler" title="En çok sipariş edilenler" sub="Müşterilerimizin en sevdiği baskı ürünleri, hazır fiyatlarla." />
          <button className="btn btn-ghost" onClick={() => store.nav("products")}>Tümünü Gör <Icon name="arrow" w={16} /></button>
        </div>
        <div className="grid cols-4">
          {PRODUCTS.slice(0, 8).map(p => <ProductCard key={p.id} p={p} onAdd={(pp) => quickAdd(store, pp)} />)}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="section" style={{ background: "var(--paper)" }}>
      <div className="wrap">
        <SectionHead eyebrow="Sipariş Süreci" title="4 adımda baskıya hazır" sub="Online sipariş vermek hiç bu kadar kolay olmamıştı." center />
        <div className="steps steps-line" style={{ marginTop: 56 }}>
          {STEPS.map((s, i) => (
            <div className="step" key={i}>
              <div className="num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignHelp() {
  const { nav } = useStore();
  return (
    <section className="section-sm" style={{ background: "var(--paper)" }}>
      <div className="wrap">
        <div className="designhelp">
          <div className="inner">
            <div>
              <span className="chip" style={{ background: "rgba(255,255,255,.2)", color: "#fff", border: "none", marginBottom: 18 }}>
                <Icon name="palette" w={15} /> Grafik Tasarım Hizmeti
              </span>
              <h2>Tasarımınız hazır değil mi?</h2>
              <p>Profesyonel grafik tasarım ekibimizle logo, kurumsal kimlik ve baskıya hazır tüm tasarımlarınızı sizin için hazırlayalım. Fikrinizi anlatın, gerisini bize bırakın.</p>
              <button className="btn btn-light btn-lg" onClick={() => nav("quote")}>Tasarım Desteği Al <Icon name="arrow" w={17} /></button>
            </div>
            <div className="dh-visual">
              <div className="dh-tool"><Icon name="palette" w={27} /></div>
              <div className="dh-tool"><Icon name="layers" w={27} /></div>
              <div className="dh-tool"><Icon name="sparkle" w={27} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <SectionHead eyebrow="Müşteri Yorumları" title="Bizi tercih edenler ne diyor?" center />
        <div className="grid cols-3" style={{ marginTop: 48 }}>
          {TESTIMONIALS.map((t, i) => (
            <div className="card testi" key={i} style={{ padding: 26 }}>
              <Stars value={5} size={15} />
              <p className="quote">“{t.quote}”</p>
              <div className="who">
                <span className="av">{t.av}</span>
                <div><b>{t.name}</b><small>{t.role}</small></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const { nav } = useStore();
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div className="cta-banner">
          <span className="cmyk-dots" style={{ justifyContent: "center", marginBottom: 22, position: "relative" }}><i></i><i></i><i></i><i></i></span>
          <h2>Baskı siparişinizi şimdi oluşturun</h2>
          <p>Toplu siparişler ve özel işler için hemen teklif alın. Uzman ekibimiz size en uygun çözümü sunsun.</p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => nav("products")}>Sipariş Oluştur <Icon name="arrow" w={17} /></button>
            <button className="btn btn-outline-light btn-lg" onClick={() => nav("quote")}>Teklif Al</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="page">
      <Hero />
      <Marquee />
      <Categories />
      <Why />
      <Popular />
      <Steps />
      <DesignHelp />
      <Testimonials />
      <CTABanner />
    </div>
  );
}

Object.assign(window, { HomePage });
