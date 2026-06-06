/* ============================================================
   misc.jsx — Hakkımızda, Hizmetler, İletişim, SSS
   ============================================================ */

function AboutPage() {
  const { nav } = useStore();
  return (
    <div className="page">
      <PageHead crumb="Hakkımızda" title="Simge Matbaa" sub="Baskıya gönül vermiş bir ekibin, kaliteyi herkes için erişilebilir kılma hikayesi." />
      <section className="section-sm"><div className="wrap">
        <div className="about-hero">
          <div>
            <span className="eyebrow">Hikayemiz</span>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", margin: "16px 0 18px" }}>Mürekkebe ve detaya tutkuyla bağlıyız</h2>
            <p className="text-muted" style={{ fontSize: 16, marginBottom: 14 }}>Yılların matbaacılık tecrübesini modern bir online sipariş deneyimiyle birleştirdik. Amacımız basit: kartvizitten brandaya, davetiyeden ambalaja kadar her baskı işini hızlı, uygun fiyatlı ve sürprizsiz hale getirmek.</p>
            <p className="text-muted" style={{ fontSize: 16 }}>Bireysel müşterilerden büyük kurumlara kadar herkes için aynı kaliteyi sunuyoruz. Her iş, onayınız alınmadan baskıya girmez; çünkü işiniz bizim de imzamızı taşır.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
              <button className="btn btn-primary" onClick={() => nav("products")}>Ürünleri Keşfet</button>
              <button className="btn btn-ghost" onClick={() => nav("contact")}>Bize Ulaşın</button>
            </div>
          </div>
          <div className="hero-visual" style={{ height: 420 }}>
            <div className="hv-card hv-1" style={{ width: "56%", height: "66%" }}><ProductMedia kind="katalog" tone="slate" /></div>
            <div className="hv-card hv-2" style={{ width: "50%", height: "54%" }}><ProductMedia kind="kartvizit" tone="orange" /></div>
            <div className="hv-card hv-3"><ProductMedia kind="davetiye" tone="plum" /></div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 56, overflow: "hidden" }}>
          <div className="stat-grid">
            {[["20K+", "Tamamlanan iş", false], ["15", "Yıllık tecrübe", true], ["12+", "Ürün kategorisi", false], ["%98", "Memnuniyet", true]].map(([n, l], i) => (
              <div className="stat" key={i}><b>{i % 2 ? <span>{n}</span> : n}</b><small>{l}</small></div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <SectionHead eyebrow="Değerlerimiz" title="Bizi biz yapan ilkeler" center />
          <div className="grid cols-4" style={{ marginTop: 36 }}>
            {[["award", "Kalite Takıntısı", "Her işte aynı yüksek standardı koruruz, ödün vermeyiz."], ["bolt", "Hız", "Söz verdiğimiz günde teslim, acil işlerde aynı gün baskı."], ["smile", "Şeffaflık", "Net fiyat, net süreç. Sürpriz maliyet yok."], ["shieldC", "Güven", "Onaysız baskı yok, hatalı işte ücretsiz yenileme."]].map(([ic, t, d], i) => (
              <div className="card value-card" key={i}>
                <span className="ic"><Icon name={ic} w={24} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div></section>
      <CTAStrip />
    </div>
  );
}

function ServicesPage() {
  const { nav } = useStore();
  return (
    <div className="page">
      <PageHead crumb="Hizmetler" title="Hizmetlerimiz" sub="Tek noktadan tüm baskı ve tasarım çözümleri." />
      <section className="section-sm"><div className="wrap">
        <div className="grid cols-3">
          {CATEGORIES.map(c => (
            <div className="card cursor-pointer" key={c.id} style={{ padding: 26 }} onClick={() => nav("product", c.id)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ width: 50, height: 50, borderRadius: 13, background: "var(--paper-3)", display: "grid", placeItems: "center", color: "var(--accent)" }}>
                  <Icon name={serviceIcon(c.id)} w={24} />
                </span>
                <span className="cat-go">Sipariş Ver <Icon name="arrow" w={15} /></span>
              </div>
              <h3 style={{ fontSize: 19, marginBottom: 8 }}>{c.name}</h3>
              <p className="text-muted" style={{ fontSize: 14 }}>{c.desc}</p>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)", fontFamily: "var(--font-head)", fontSize: 14 }}>
                başlangıç <b style={{ color: "var(--accent)" }}>{tl(c.from)}</b>
              </div>
            </div>
          ))}
        </div>
      </div></section>
      <section className="section-sm" style={{ paddingTop: 0 }}><div className="wrap">
        <DesignHelpInline />
      </div></section>
    </div>
  );
}

function serviceIcon(id) {
  const m = { kartvizit: "tag", brosur: "file", katalog: "layers", afis: "grid", branda: "grid", etiket: "tag", davetiye: "sparkle", ambalaj: "pkg", promosyon: "award", grafik: "palette" };
  return m[id] || "file";
}

function DesignHelpInline() {
  const { nav } = useStore();
  return (
    <div className="designhelp">
      <div className="inner">
        <div>
          <h2>Tasarımınız hazır değil mi?</h2>
          <p>Profesyonel grafik ekibimiz logo, kurumsal kimlik ve baskıya hazır tasarımlarınızı hazırlasın.</p>
          <button className="btn btn-light btn-lg" onClick={() => nav("quote")}>Tasarım Desteği Al <Icon name="arrow" w={17} /></button>
        </div>
        <div className="dh-visual">
          <div className="dh-tool"><Icon name="palette" w={27} /></div>
          <div className="dh-tool"><Icon name="layers" w={27} /></div>
          <div className="dh-tool"><Icon name="sparkle" w={27} /></div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const store = useStore();
  const [sent, setSent] = useState(false);
  return (
    <div className="page">
      <PageHead crumb="İletişim" title="Bize Ulaşın" sub="Sorularınız, özel talepleriniz ve iş birlikleri için buradayız." />
      <section className="section-sm"><div className="wrap">
        <div className="contact-layout">
          <div>
            {[["pin", "Adres", "Merkez Mah. Matbaacılar Sk. No:12, İstanbul"], ["phone", "Telefon", "0212 000 00 00"], ["mail", "E-posta", "info@simgematbaa.com"], ["clock", "Çalışma Saatleri", "Hafta içi 09:00 – 18:30"]].map(([ic, t, d], i) => (
              <div className="card contact-info-card" key={i}>
                <span className="cic"><Icon name={ic} w={22} /></span>
                <div><small>{t}</small><b>{d}</b></div>
              </div>
            ))}
            <div className="map-ph">
              <span style={{ position: "relative", color: "var(--muted)", display: "flex", gap: 8, alignItems: "center", fontFamily: "var(--font-head)", fontWeight: 600 }}><Icon name="pin" w={18} /> Harita görünümü</span>
            </div>
          </div>
          <div className="card form-card">
            {sent ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <div className="sic" style={{ width: 72, height: 72, margin: "0 auto 18px" }}><Icon name="check" w={36} /></div>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Mesajınız gönderildi</h3>
                <p className="text-muted" style={{ marginBottom: 20 }}>En kısa sürede size geri dönüş yapacağız.</p>
                <button className="btn btn-ghost" onClick={() => setSent(false)}>Yeni mesaj</button>
              </div>
            ) : (
              <React.Fragment>
                <h3><span className="fn"><Icon name="mail" w={15} /></span> Mesaj Gönderin</h3>
                <div className="field-row">
                  <div className="field"><label>Ad Soyad <span className="req">*</span></label><input placeholder="Adınız" /></div>
                  <div className="field"><label>E-posta <span className="req">*</span></label><input placeholder="ornek@mail.com" /></div>
                </div>
                <div className="field"><label>Konu</label><input placeholder="Mesaj konusu" /></div>
                <div className="field"><label>Mesajınız <span className="req">*</span></label><textarea placeholder="Size nasıl yardımcı olabiliriz?"></textarea></div>
                <button className="btn btn-primary btn-lg btn-block" onClick={() => setSent(true)}>Gönder <Icon name="arrow" w={17} /></button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div></section>
    </div>
  );
}

function FaqPage() {
  const { nav } = useStore();
  const [open, setOpen] = useState(0);
  return (
    <div className="page">
      <PageHead crumb="S.S.S." title="Sıkça Sorulan Sorular" sub="Aklınıza takılanlar için hızlı yanıtlar. Aradığınızı bulamazsanız bize yazın." />
      <section className="section-sm"><div className="wrap" style={{ maxWidth: 860 }}>
        <div className="card" style={{ padding: "8px 28px" }}>
          {FAQS.map((f, i) => (
            <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
              <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <h3>{f.q}</h3>
                <span className="fq-ic"><Icon name="plus" w={16} /></span>
              </div>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 24, padding: 30, textAlign: "center", background: "var(--paper-3)" }}>
          <h3 style={{ fontSize: 20, marginBottom: 8 }}>Sorunuz mu var?</h3>
          <p className="text-muted" style={{ marginBottom: 18 }}>Ekibimiz size yardımcı olmaktan memnuniyet duyar.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => nav("contact")}>İletişime Geç</button>
            <button className="btn btn-ghost" onClick={() => nav("quote")}>Teklif Al</button>
          </div>
        </div>
      </div></section>
    </div>
  );
}

function CTAStrip() {
  const { nav } = useStore();
  return (
    <section className="section-sm"><div className="wrap">
      <div className="cta-banner" style={{ padding: 48 }}>
        <h2 style={{ fontSize: "clamp(24px,3vw,36px)" }}>Baskı işinizi bugün başlatın</h2>
        <p>Online sipariş verin ya da özel projeleriniz için teklif alın.</p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={() => nav("products")}>Sipariş Ver</button>
          <button className="btn btn-outline-light btn-lg" onClick={() => nav("quote")}>Teklif Al</button>
        </div>
      </div>
    </div></section>
  );
}

Object.assign(window, { AboutPage, ServicesPage, ContactPage, FaqPage, ServicesPageDesignHelp: DesignHelpInline });
