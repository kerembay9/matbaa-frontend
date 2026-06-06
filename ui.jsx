/* ============================================================
   ui.jsx — Paylaşılan sunum bileşenleri
   ============================================================ */

function Stars({ value, size }) {
  return (
    <span className="stars" style={{ fontSize: size || 13 }} aria-label={value + " yıldız"}>
      {"★★★★★".split("").map((s, i) => (
        <span key={i} style={{ opacity: i < Math.round(value) ? 1 : .26 }}>★</span>
      ))}
    </span>
  );
}

function SectionHead({ eyebrow, title, sub, center, light }) {
  return (
    <div className="section-head" style={center ? { margin: "0 auto", textAlign: "center" } : null}>
      <span className={"eyebrow" + (center ? " center" : "")}>{eyebrow}</span>
      <h2 style={center ? { textWrap: "balance" } : null}>{title}</h2>
      {sub && <p style={center ? { margin: "14px auto 0" } : null}>{sub}</p>}
    </div>
  );
}

function CategoryCard({ cat }) {
  const { nav } = useStore();
  return (
    <div className="card cat-card" onClick={() => nav("product", cat.slug || cat.id)}>
      <ProductMedia kind={cat.kind} tone={cat.tone} label={cat.name.toLowerCase().replace(/ /g, "-")} />
      <div className="cat-body">
        <h3>{cat.name}</h3>
        <p>{cat.desc}</p>
        <div className="cat-foot">
          <span className="price">başlangıç <b>{tl(cat.from)}</b></span>
          <span className="cat-go">İncele <Icon name="arrow" w={15} /></span>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ p, onAdd }) {
  const { nav } = useStore();
  const go = () => nav("product", p.slug || p.id);
  return (
    <div className="card prod-card">
      <div className="cursor-pointer" style={{ position: "relative" }} onClick={go}>
        <ProductMedia kind={p.kind} tone={p.tone} label={p.kind} />
        {p.tag && <span className={"prod-tag chip " + (p.tagType || "accent")}>{p.tag}</span>}
      </div>
      <div className="prod-body">
        <span className="prod-cat">{p.cat}</span>
        <h3 className="cursor-pointer" onClick={go}>{p.name}</h3>
        <div className="prod-rate"><Stars value={p.rating} /> <span>{p.rating} ({p.reviews})</span></div>
        <p className="pdesc">{p.desc}</p>
        <div className="prod-foot">
          <div className="prod-price">
            <small>başlangıç</small>
            <b>{tl(p.price)} <span>{p.unit}</span></b>
          </div>
          <button className="add-btn" aria-label="Sepete ekle" onClick={() => onAdd ? onAdd(p) : go()}>
            <Icon name="cart" w={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReferencesSection({ center }) {
  return (
    <section className="section" style={{ background: center ? "var(--paper-2)" : "var(--paper)" }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Referanslarımız"
          title="Güvenen markalar"
          sub="Yıllar içinde birlikte çalıştığımız kurum ve işletmelerden bazıları."
          center={center}
        />
        <div className="ref-grid" style={{ marginTop: center ? 48 : 40 }}>
          {REFERENCES.map((r, i) => (
            <div className="ref-item card" key={i} title={r.name}>
              <img src={r.src} alt={r.name + " referans"} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toasts() {
  const { toasts } = useStore();
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div className="toast" key={t.id}>
          <span className="tdot"><Icon name="check" w={15} /></span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* Quick add helper: build a default line from a product */
function quickAdd(store, p) {
  store.addToCart({
    productId: p.id,
    name: p.name,
    qty: 1,
  });
}

Object.assign(window, { Stars, SectionHead, CategoryCard, ProductCard, ReferencesSection, Toasts, quickAdd });
