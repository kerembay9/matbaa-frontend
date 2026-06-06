/* ============================================================
   shop.jsx — Ürünler listesi + Ürün Detay
   ============================================================ */

/* ---------- Ürünler sayfası ---------- */
function ProductsPage() {
  const store = useStore();
  const { route, searchResults, clearSearch } = store;
  const [active, setActive] = useState("hepsi");
  const [sort, setSort] = useState("populer");
  const isSearch = !!(route.search && searchResults);

  const source = isSearch ? searchResults : PRODUCTS;
  const filtered = source.filter(p => active === "hepsi" || p.catId === active);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "ucuz") return a.price - b.price;
    if (sort === "pahali") return b.price - a.price;
    if (sort === "puan") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <div className="page">
      <div className="page-head">
        <div className="wrap">
          <div className="crumb"><a onClick={() => store.nav("home")}>Ana Sayfa</a> <Icon name="chevR" w={13} /> <span>Ürünler</span></div>
          <h1>Tüm Baskı Ürünleri</h1>
          <p>İhtiyacınız olan ürünü seçin, özelleştirin ve dakikalar içinde online sipariş verin.</p>
        </div>
      </div>

      <section className="section-sm">
        <div className="wrap">
          <div className="shop-layout">
            <aside className="filter-panel">
              <div className="filter-group">
                <h4>Kategori</h4>
                <FilterOpt label="Tüm Ürünler" on={active === "hepsi"} count={source.length} onClick={() => setActive("hepsi")} />
                {CATEGORIES.slice(0, 8).map(c => {
                  const cnt = source.filter(p => p.catId === c.id).length;
                  return <FilterOpt key={c.id} label={c.name} on={active === c.id} count={cnt} onClick={() => setActive(c.id)} />;
                })}
              </div>
              <div style={{ paddingTop: 18 }}>
                <button className="btn btn-ink btn-block" onClick={() => store.nav("quote")}><Icon name="tag" w={16} /> Özel Teklif Al</button>
              </div>
            </aside>

            <div>
              <div className="shop-toolbar">
                <span className="res"><b>{sorted.length}</b> ürün listeleniyor</span>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div className="select">
                    <Icon name="sliders" w={16} />
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                      <option value="populer">Popülerlik</option>
                      <option value="ucuz">Artan fiyat</option>
                      <option value="pahali">Azalan fiyat</option>
                      <option value="puan">En yüksek puan</option>
                    </select>
                  </div>
                </div>
              </div>

              {isSearch && (
                <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
                  <span className="chip ink">Arama: {route.search}</span>
                  <button className="btn btn-ghost btn-sm" onClick={clearSearch}>Aramayı temizle</button>
                </div>
              )}

              {/* category quick chips */}
              <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 22 }}>
                {["hepsi", ...CATEGORIES.slice(0, 7).map(c => c.id)].map(id => {
                  const c = CATEGORIES.find(x => x.id === id);
                  return (
                    <button key={id} className={"chip" + (active === id ? " ink" : "")} onClick={() => setActive(id)}>
                      {id === "hepsi" ? "Tümü" : c.name}
                    </button>
                  );
                })}
              </div>

              <div className="grid cols-3">
                {sorted.map(p => <ProductCard key={p.id} p={p} onAdd={(pp) => quickAdd(store, pp)} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterOpt({ label, on, count, onClick }) {
  return (
    <div className={"filter-opt" + (on ? " on" : "")} onClick={onClick}>
      <span className="box"><Icon name="check" w={12} /></span>
      {label}
      {count != null && <span className="cnt">{count}</span>}
    </div>
  );
}

/* ---------- Ürün seçenek konfigürasyonu ---------- */
const OPTION_SETS = {
  default: {
    ebat: { label: "Ebat", opts: [["8.5×5 cm", 0], ["A6", 0.4], ["A5", 1], ["A4", 2.2]] },
    kagit: { label: "Kağıt Tipi", opts: [["300gr Kuşe", 0], ["350gr Kuşe", 0.12], ["Bristol", 0.2], ["Geri Dönüşümlü", 0.08]] },
    kaplama: { label: "Kaplama", opts: [["Yok", 0], ["Mat Selefon", 0.15], ["Parlak Selefon", 0.15], ["Soft Touch", 0.3]] },
    yon: { label: "Baskı Yönü", opts: [["Tek Yön", 0], ["Çift Yön", 0.25]] },
  },
};
const QTY_TIERS = [
  [100, 1], [250, 2.1], [500, 3.4], [1000, 5.6], [2500, 11.5], [5000, 19],
];

function resolveProduct(id) {
  let p = PRODUCTS.find(x => x.id === id || x.slug === id);
  if (p) return p;
  const c = CATEGORIES.find(x => x.id === id || x.slug === id);
  if (c) return { id: c.id, slug: c.slug || c.id, name: c.name, cat: c.name, catId: c.id, kind: c.kind, tone: c.tone, price: c.from, unit: "/ baskı", rating: 4.8, reviews: 120, desc: c.desc };
  return PRODUCTS[0];
}

/* ---------- Ürün Detay ---------- */
function ProductDetailPage({ id }) {
  const store = useStore();
  const p = resolveProduct(id);
  const cfg = OPTION_SETS.default;
  const [sel, setSel] = useState({ ebat: 0, kagit: 0, kaplama: 0, yon: 1 });
  const [tier, setTier] = useState(2);
  const [thumb, setThumb] = useState(0);
  const [tab, setTab] = useState("aciklama");
  const [needDesign, setNeedDesign] = useState(false);
  const [artwork, setArtwork] = useState(null);
  const { toast } = store;

  const unitBase = p.price / 3.4; // normalize to per-100 baseline
  const optMult = 1 + cfg.ebat.opts[sel.ebat][1] + cfg.kagit.opts[sel.kagit][1] + cfg.kaplama.opts[sel.kaplama][1] + cfg.yon.opts[sel.yon][1];
  const qtyMult = QTY_TIERS[tier][1];
  const designFee = needDesign ? 750 : 0;
  const subtotal = Math.round(unitBase * optMult * qtyMult);
  const total = subtotal + designFee;
  const qtyCount = QTY_TIERS[tier][0];

  const tones = ["navy", "magenta", "green", "orange"];

  const addToCart = () => {
    const optStr = `${cfg.ebat.opts[sel.ebat][0]} · ${cfg.kagit.opts[sel.kagit][0]} · ${qtyCount} adet`;
    const baseKey = `${p.id}|${sel.ebat}-${sel.kagit}-${sel.kaplama}-${sel.yon}-${tier}-${needDesign ? 1 : 0}`;
    const lineKey = artwork?.name ? `${baseKey}-f${artworkFileSlug(artwork.name)}` : baseKey;
    const optionsJson = {
      ebat: sel.ebat, kagit: sel.kagit, kaplama: sel.kaplama, yon: sel.yon, tier, needDesign,
      ...(artwork ? { fileUrl: artwork.url, fileName: artwork.name } : {}),
    };
    let optionsLabel = optStr + (needDesign ? " · + Tasarım" : "");
    if (artwork?.name) optionsLabel += ` · ${artwork.name}`;
    store.addToCart({
      productId: p.id,
      lineKey,
      name: p.name,
      optionsJson,
      optionsLabel,
      qty: 1,
      unitPrice: total,
      lineTotal: total,
      unit: `${qtyCount} adet`,
    });
  };
  const buyNow = () => { addToCart(); store.nav("checkout"); };

  return (
    <div className="page">
      <section className="section-sm">
        <div className="wrap">
          <div className="pdp">
            <div className="pdp-gallery">
              <div className="pdp-main">
                <ProductMedia kind={p.kind} tone={tones[thumb]} label={p.kind} />
              </div>
              <div className="pdp-thumbs">
                {tones.map((t, i) => (
                  <div key={i} className={"pdp-thumb" + (thumb === i ? " on" : "")} onClick={() => setThumb(i)}>
                    <ProductMedia kind={p.kind} tone={t} />
                  </div>
                ))}
              </div>
            </div>

            <div className="pdp-info">
              <div className="crumb">
                <a onClick={() => store.nav("home")}>Ana Sayfa</a> <Icon name="chevR" w={13} />
                <a onClick={() => store.nav("products")}>Ürünler</a> <Icon name="chevR" w={13} />
                <span style={{ color: "var(--ink)" }}>{p.cat}</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                {p.tag && <span className={"chip " + (p.tagType || "accent")}>{p.tag}</span>}
                <span className="chip"><span className="badge-dot"></span> Stokta</span>
              </div>
              <h1>{p.name}</h1>
              <p className="sub">{p.desc} Baskıya hazır dosyanızı yükleyin ya da tasarım desteği alın; gerisini biz halledelim.</p>
              <div className="pdp-meta">
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Stars value={p.rating} size={15} /> <b style={{ fontFamily: "var(--font-head)" }}>{p.rating}</b> <span className="text-muted">({p.reviews} değerlendirme)</span></span>
                <span className="text-muted" style={{ display: "flex", gap: 7, alignItems: "center" }}><Icon name="truck" w={16} /> 1–3 iş günü</span>
              </div>

              {/* options */}
              <OptionBlock label={cfg.ebat.label} opts={cfg.ebat.opts} sel={sel.ebat} onSel={i => setSel(s => ({ ...s, ebat: i }))} />
              <OptionBlock label={cfg.kagit.label} opts={cfg.kagit.opts} sel={sel.kagit} onSel={i => setSel(s => ({ ...s, kagit: i }))} />
              <OptionBlock label={cfg.kaplama.label} opts={cfg.kaplama.opts} sel={sel.kaplama} onSel={i => setSel(s => ({ ...s, kaplama: i }))} />
              <OptionBlock label={cfg.yon.label} opts={cfg.yon.opts} sel={sel.yon} onSel={i => setSel(s => ({ ...s, yon: i }))} />

              <div className="opt-block">
                <div className="olab"><span>Adet</span><small>çok alana avantajlı fiyat</small></div>
                <div className="opt-pills">
                  {QTY_TIERS.map((q, i) => (
                    <button key={i} className={"opt-pill" + (tier === i ? " on" : "")} onClick={() => setTier(i)}>{fmt(q[0])}</button>
                  ))}
                </div>
              </div>

              <div className="opt-block">
                <label className="filter-opt" onClick={() => { setNeedDesign(v => { if (!v) setArtwork(null); return !v; }); }}>
                  <span className={"box" + (needDesign ? "" : "")} style={needDesign ? { background: "var(--accent)", borderColor: "var(--accent)", color: "#fff" } : null}><Icon name="check" w={12} /></span>
                  Dosyam yok, tasarım desteği istiyorum <span className="cnt">+{tl(750)}</span>
                </label>
              </div>

              {!needDesign && (
                <div className="opt-block">
                  <div className="olab"><span>Baskı Dosyası</span><small>CMYK, 300 DPI önerilir</small></div>
                  <ArtworkUpload
                    value={artwork}
                    onChange={setArtwork}
                    disabled={needDesign}
                    onError={(msg) => toast(msg, "error")}
                  />
                </div>
              )}

              {/* price summary */}
              <div className="price-summary">
                <div className="prow"><span>{fmt(qtyCount)} adet × birim</span><span>{tl(subtotal)}</span></div>
                {needDesign && <div className="prow"><span>Grafik tasarım hizmeti</span><span>{tl(designFee)}</span></div>}
                <div className="prow"><span>Kargo</span><span style={{ color: "var(--ok)", fontWeight: 700 }}>Ücretsiz</span></div>
                <div className="prow total"><span>Toplam (KDV dahil)</span><b>{tl(total)}</b></div>
              </div>

              <div className="pdp-actions">
                <button className="btn btn-primary btn-lg btn-block" onClick={addToCart}><Icon name="cart" w={18} /> Sepete Ekle</button>
                <button className="btn btn-ink btn-lg btn-block" onClick={buyNow}>Siparişi Tamamla</button>
              </div>

              <div className="trust-row">
                <span className="ti"><Icon name="shieldC" w={18} /> Kalite garantisi</span>
                <span className="ti"><Icon name="check" w={18} /> Ücretsiz dijital prova</span>
                <span className="ti"><Icon name="truck" w={18} /> Hızlı teslimat</span>
              </div>

              {/* tabs */}
              <div className="pdp-tabs">
                <div className="tab-heads">
                  {[["aciklama", "Açıklama"], ["ozellik", "Teknik Özellikler"], ["teslimat", "Teslimat & İade"]].map(([k, l]) => (
                    <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
                  ))}
                </div>
                <div className="tab-body">
                  {tab === "aciklama" && <p>{p.name}, yüksek çözünürlüklü baskı teknolojisiyle canlı renkler ve keskin detaylar sunar. Bireysel kullanım için tekli, işletmeler için toplu adetlerde sipariş verebilirsiniz. Tüm işler baskı öncesi kalite kontrolünden geçer ve onayınız alınmadan baskıya girmez.</p>}
                  {tab === "ozellik" && (
                    <ul>
                      <li><Icon name="check" w={17} /> CMYK ofset & dijital baskı seçeneği</li>
                      <li><Icon name="check" w={17} /> 300–350gr kuşe ve özel kağıt alternatifleri</li>
                      <li><Icon name="check" w={17} /> Mat, parlak ve soft touch selefon kaplama</li>
                      <li><Icon name="check" w={17} /> Özel ebat ve kesim talebi mümkün</li>
                    </ul>
                  )}
                  {tab === "teslimat" && (
                    <ul>
                      <li><Icon name="check" w={17} /> Standart üretim süresi: 1–3 iş günü</li>
                      <li><Icon name="check" w={17} /> Acil işler için aynı gün baskı seçeneği</li>
                      <li><Icon name="check" w={17} /> Türkiye geneli kargo ile teslimat</li>
                      <li><Icon name="check" w={17} /> Baskı hatalarında ücretsiz yeniden üretim</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* related */}
          <div style={{ marginTop: 70 }}>
            <SectionHead eyebrow="Benzer Ürünler" title="Bunlar da ilginizi çekebilir" />
            <div className="grid cols-4" style={{ marginTop: 30 }}>
              {PRODUCTS.filter(x => x.id !== p.id).slice(0, 4).map(x => <ProductCard key={x.id} p={x} onAdd={(pp) => quickAdd(store, pp)} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OptionBlock({ label, opts, sel, onSel }) {
  return (
    <div className="opt-block">
      <div className="olab"><span>{label}</span><small>{opts[sel][0]}</small></div>
      <div className="opt-pills">
        {opts.map((o, i) => (
          <button key={i} className={"opt-pill" + (sel === i ? " on" : "")} onClick={() => onSel(i)}>
            {o[0]}{o[1] > 0 && <span className="pp">+{Math.round(o[1] * 100)}%</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ProductsPage, ProductDetailPage, resolveProduct });
