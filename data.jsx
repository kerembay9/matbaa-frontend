/* ============================================================
   data.jsx — İkonlar, kategoriler, ürünler, içerik
   ============================================================ */

/* ---------- İkon seti (basit çizgi ikonlar) ---------- */
const I = {
  cart:    "M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6",
  search:  "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  user:    "M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  menu:    "M3 6h18M3 12h18M3 18h18",
  close:   "M6 6l12 12M18 6L6 18",
  arrow:   "M5 12h14M13 6l6 6-6 6",
  arrowR:  "M5 12h14M13 6l6 6-6 6",
  chevD:   "M6 9l6 6 6-6",
  chevR:   "M9 6l6 6-6 6",
  plus:    "M12 5v14M5 12h14",
  minus:   "M5 12h14",
  check:   "M20 6L9 17l-5-5",
  heart:   "M12 21s-7.5-4.6-10-9.2A5.4 5.4 0 0 1 12 5a5.4 5.4 0 0 1 10 6.8C19.5 16.4 12 21 12 21z",
  star:    "M12 3l2.6 5.7 6.2.7-4.6 4.2 1.2 6.1L12 16.9 6.6 19.7l1.2-6.1L3.2 9.4l6.2-.7L12 3z",
  truck:   "M3 6h11v9H3zM14 9h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  shield:  "M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3z",
  shieldC: "M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3zM9 12l2 2 4-4",
  bolt:    "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  tag:     "M20.6 13.4L13 21l-9-9V4h8l8.6 8.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01",
  palette: "M12 21a9 9 0 1 1 0-18c4.5 0 8 3 8 7 0 2.5-2 4-4 4h-2a2 2 0 0 0-1.6 3.2A2 2 0 0 1 12 21zM7.5 11.5h.01M11 7.5h.01M15.5 9.5h.01",
  layers:  "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  pkg:     "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  upload:  "M12 16V4M7 9l5-5 5 5M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3",
  file:    "M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5z",
  clock:   "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  phone:   "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z",
  mail:    "M3 5h18v14H3zM3 6l9 7 9-7",
  pin:     "M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  wa:      "M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zM7.5 7.2c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.6.9c-.1.2-.2.4 0 .7a8 8 0 0 0 3.5 3c.3.1.5.1.7-.1l.8-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.3.4.5 0 1-1.4 1.9-2 1.9a7 7 0 0 1-6.6-5.8c-.2-1.3.8-3.1 1.4-3.5z",
  grid:    "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  rotate:  "M21 12a9 9 0 1 1-3-6.7M21 3v5h-5",
  scissor: "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  award:   "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.2 13.5L7 22l5-3 5 3-1.2-8.5",
  smile:   "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  trash:   "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6",
  ig:      "M4 4h16v16H4zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM17.5 6.5h.01",
  fb:      "M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1z",
  in:      "M6 9v9M6 6v.01M10 18v-5a2 2 0 0 1 4 0v5M10 18v-9M14 18v-5a2 2 0 0 1 4 0v5",
  x:       "M4 4l7 8-7 8h2l6-6.8L18.5 20H22l-7.4-8.5L21.5 4h-2l-5.6 6.4L8 4z",
};

function Icon({ name, w, style }) {
  const d = I[name] || I.check;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={name === "wa" || name === "fb" ? 0 : 1.9}
      fill={name === "wa" || name === "fb" ? "currentColor" : "none"}
      strokeLinecap="round" strokeLinejoin="round"
      width={w || 20} height={w || 20} style={style} aria-hidden="true">
      <path d={d}></path>
    </svg>
  );
}

/* ---------- Renkli "kağıt" kompozisyon (placeholder yerine) ---------- */
function ProductMedia({ kind, tone, label, tall, className }) {
  // tone: brand tint per category
  const tones = {
    navy:   ["#11203a", "#233f63"],
    orange: ["#df5a29", "#c7491c"],
    cyan:   ["#1fa8c9", "#157e99"],
    magenta:["#d23f8a", "#a82d6c"],
    gold:   ["#e2a615", "#b9870f"],
    green:  ["#2c8c64", "#1f6b4b"],
    plum:   ["#6b4ea8", "#503a82"],
    slate:  ["#41597d", "#2c3e57"],
  };
  const [c1, c2] = tones[tone] || tones.navy;
  return (
    <div className={"media crop-marks " + (tall ? "tall " : "") + (className || "")}
      style={{ background: "var(--paper-3)" }}>
      <MediaArt kind={kind} c1={c1} c2={c2} />
      {label && <span className="mlabel">{label}</span>}
    </div>
  );
}

/* Abstract geometric compositions — simple rects/circles only */
function MediaArt({ kind, c1, c2 }) {
  const sheet = (extra) => ({
    position: "absolute", borderRadius: 7, background: "#fff",
    boxShadow: "0 12px 28px -10px rgba(17,32,58,.45), 0 2px 6px rgba(17,32,58,.12)",
    border: "1px solid rgba(17,32,58,.06)", ...extra,
  });
  const band = (col, extra) => ({ position: "absolute", background: col, ...extra });

  switch (kind) {
    case "kartvizit": return (
      <div style={{ position: "relative", width: "70%", height: "62%" }}>
        <div style={sheet({ inset: 0, transform: "rotate(-7deg)", opacity: .55 })}></div>
        <div style={sheet({ inset: 0, transform: "rotate(-3deg)", opacity: .8 })}></div>
        <div style={sheet({ inset: 0 })}>
          <div style={band(c1, { left: 0, top: 0, bottom: 0, width: "34%" })}></div>
          <div style={band(c2, { right: "14%", top: "30%", width: "44%", height: 6, borderRadius: 3 })}></div>
          <div style={band("rgba(17,32,58,.18)", { right: "14%", top: "48%", width: "30%", height: 4, borderRadius: 3 })}></div>
          <div style={band("rgba(17,32,58,.12)", { right: "14%", top: "60%", width: "38%", height: 4, borderRadius: 3 })}></div>
        </div>
      </div>
    );
    case "brosur": return (
      <div style={{ position: "relative", width: "66%", height: "70%", display: "flex", gap: 6 }}>
        <div style={sheet({ flex: 1, position: "relative", overflow: "hidden" })}>
          <div style={band(c1, { top: 0, left: 0, right: 0, height: "38%" })}></div>
          <div style={band("rgba(17,32,58,.12)", { left: "16%", right: "16%", top: "52%", height: 4 })}></div>
          <div style={band("rgba(17,32,58,.1)", { left: "16%", right: "30%", top: "64%", height: 4 })}></div>
        </div>
        <div style={sheet({ flex: 1, position: "relative", overflow: "hidden" })}>
          <div style={band(c2, { bottom: 0, left: 0, right: 0, height: "30%" })}></div>
          <div style={band("rgba(17,32,58,.12)", { left: "16%", right: "20%", top: "24%", height: 4 })}></div>
        </div>
      </div>
    );
    case "afis": return (
      <div style={sheet({ width: "44%", height: "82%", position: "relative", overflow: "hidden" })}>
        <div style={band(c1, { inset: 0, height: "55%" })}></div>
        <div style={band(c2, { left: "18%", bottom: "22%", width: "64%", height: 10, borderRadius: 5 })}></div>
        <div style={band("rgba(17,32,58,.16)", { left: "18%", bottom: "13%", width: "44%", height: 6, borderRadius: 3 })}></div>
        <div style={{ position: "absolute", right: "12%", top: "12%", width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,.9)" }}></div>
      </div>
    );
    case "etiket": return (
      <div style={{ position: "relative", width: "62%", height: "62%" }}>
        <div style={{ ...sheet({ inset: "0 30% 30% 0" }), borderRadius: 999, display: "grid", placeItems: "center", background: c1 }}>
          <div style={{ width: "55%", height: "55%", borderRadius: 999, border: "2px solid rgba(255,255,255,.7)" }}></div>
        </div>
        <div style={sheet({ right: 0, bottom: 0, width: "60%", height: "60%", borderRadius: 8, background: "#fff", overflow: "hidden" })}>
          <div style={band(c2, { top: 0, left: 0, right: 0, height: "40%" })}></div>
        </div>
      </div>
    );
    case "davetiye": return (
      <div style={sheet({ width: "50%", height: "74%", position: "relative", overflow: "hidden", background: "#fff" })}>
        <div style={{ position: "absolute", inset: 9, border: `1.5px solid ${c1}`, borderRadius: 4 }}></div>
        <div style={band(c1, { left: "26%", right: "26%", top: "30%", height: 5, borderRadius: 3 })}></div>
        <div style={band(c2, { left: "34%", right: "34%", top: "44%", height: 4, borderRadius: 3 })}></div>
        <div style={{ position: "absolute", left: "42%", right: "42%", top: "58%", height: 16, background: c1, clipPath: "polygon(50% 0,100% 100%,0 100%)" }}></div>
      </div>
    );
    case "branda": return (
      <div style={sheet({ width: "82%", height: "52%", position: "relative", overflow: "hidden" })}>
        <div style={band(c1, { inset: 0, width: "40%" })}></div>
        <div style={band(c2, { right: "12%", top: "34%", width: "40%", height: 9, borderRadius: 4 })}></div>
        <div style={band("rgba(17,32,58,.14)", { right: "12%", top: "52%", width: "28%", height: 6, borderRadius: 3 })}></div>
        {[0, 1].map(i => <div key={i} style={{ position: "absolute", top: 8, left: i ? "auto" : 8, right: i ? 8 : "auto", width: 8, height: 8, borderRadius: "50%", border: "2px solid rgba(17,32,58,.25)" }}></div>)}
      </div>
    );
    case "katalog": return (
      <div style={{ position: "relative", width: "60%", height: "72%" }}>
        <div style={sheet({ inset: "0 0 0 8%", transform: "rotate(3deg)", opacity: .6 })}></div>
        <div style={sheet({ inset: 0, position: "relative", overflow: "hidden" })}>
          <div style={band(c1, { top: 0, left: 0, right: 0, height: "46%" })}></div>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(17,32,58,.12)" }}></div>
          <div style={band("rgba(17,32,58,.14)", { left: "12%", right: "55%", top: "60%", height: 4 })}></div>
          <div style={band("rgba(17,32,58,.1)", { left: "12%", right: "60%", top: "72%", height: 4 })}></div>
        </div>
      </div>
    );
    case "ambalaj": return (
      <div style={{ position: "relative", width: "56%", height: "62%" }}>
        <div style={{ position: "absolute", inset: 0, background: c1, borderRadius: 8, transform: "skewX(-10deg) translateX(8%)", boxShadow: "0 14px 30px -10px rgba(17,32,58,.5)" }}></div>
        <div style={{ position: "absolute", inset: 0, background: c2, borderRadius: 8, width: "62%", transform: "skewX(-10deg) translateX(-10%)" }}></div>
        <div style={{ position: "absolute", left: "30%", top: "40%", width: "36%", height: 6, background: "rgba(255,255,255,.85)", borderRadius: 3, transform: "skewX(-10deg)" }}></div>
      </div>
    );
    case "promosyon": return (
      <div style={{ position: "relative", width: "62%", height: "62%" }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "46%", height: "78%", background: c1, borderRadius: "40px 40px 8px 8px" }}></div>
        <div style={{ position: "absolute", left: "8%", top: "4%", width: "26%", height: "20%", border: `3px solid ${c1}`, borderRadius: "999px 999px 0 0", borderBottom: "none" }}></div>
        <div style={{ position: "absolute", right: 0, bottom: 0, width: "44%", height: "44%", background: c2, borderRadius: "50%" }}></div>
      </div>
    );
    case "grafik": return (
      <div style={sheet({ width: "72%", height: "64%", position: "relative", overflow: "hidden", background: "#fff" })}>
        <div style={band(c1, { left: 0, top: 0, bottom: 0, width: "30%" })}></div>
        <div style={{ position: "absolute", right: "14%", top: "20%", width: 34, height: 34, borderRadius: "50%", border: `3px solid ${c2}` }}></div>
        <div style={band(c2, { right: "12%", top: "58%", width: "40%", height: 6, borderRadius: 3 })}></div>
        <div style={{ position: "absolute", left: "38%", bottom: "16%", display: "flex", gap: 4 }}>
          {[c1, c2, "rgba(17,32,58,.2)"].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }}></div>)}
        </div>
      </div>
    );
    default: return <div style={sheet({ width: "60%", height: "64%" })}></div>;
  }
}

/* ---------- Kategoriler ---------- */
const CATEGORIES_FALLBACK = [
  { id: "kartvizit", name: "Kartvizit", kind: "kartvizit", tone: "navy", desc: "Mat, parlak, lakeli ve özel kesim seçenekleriyle.", from: 149, slug: "kartvizit" },
  { id: "brosur", name: "Broşür", kind: "brosur", tone: "orange", desc: "Tek/çift kırım, A4–A5 ebatlarında canlı baskı.", from: 380, slug: "brosur" },
  { id: "katalog", name: "Katalog", kind: "katalog", tone: "slate", desc: "Tel dikiş veya amerikan cilt, kuşe kağıt.", from: 1250, slug: "katalog" },
  { id: "afis", name: "Afiş", kind: "afis", tone: "magenta", desc: "A3’ten 70×100’e yüksek çözünürlüklü baskı.", from: 95, slug: "afis" },
  { id: "branda", name: "Branda", kind: "branda", tone: "cyan", desc: "Dış mekana dayanıklı, metrekare bazlı.", from: 65, slug: "branda" },
  { id: "etiket", name: "Etiket", kind: "etiket", tone: "green", desc: "Rulo veya tabaka, su geçirmez seçenekler.", from: 220, slug: "etiket" },
  { id: "davetiye", name: "Davetiye", kind: "davetiye", tone: "plum", desc: "Düğün, nişan ve kurumsal özel tasarımlar.", from: 18, slug: "davetiye" },
  { id: "ambalaj", name: "Ambalaj", kind: "ambalaj", tone: "gold", desc: "Kutu, poşet ve özel ambalaj çözümleri.", from: 12, slug: "ambalaj" },
  { id: "promosyon", name: "Promosyon Ürünleri", kind: "promosyon", tone: "orange", desc: "Kupa, kalem, çanta ve baskılı hediyelikler.", from: 35, slug: "promosyon" },
  { id: "grafik", name: "Grafik Tasarım", kind: "grafik", tone: "navy", desc: "Logo, kurumsal kimlik ve baskıya hazır tasarım.", from: 750, slug: "grafik-tasarim" },
];

/* ---------- Ürünler ---------- */
const PRODUCTS_FALLBACK = [
  { id: "p1", name: "Lüks Kartvizit", cat: "Kartvizit", catId: "kartvizit", kind: "kartvizit", tone: "navy", price: 149, unit: "/ 500 adet", rating: 4.9, reviews: 218, tag: "Çok Satan", tagType: "accent", desc: "350gr kuşe, mat selefon kaplama. 1–2 gün teslim.", badge: true },
  { id: "p2", name: "Tek Kırım Broşür", cat: "Broşür", catId: "brosur", kind: "brosur", tone: "orange", price: 380, unit: "/ 250 adet", rating: 4.8, reviews: 96, tag: "Yeni", tagType: "ink", desc: "A4 çift yön, 135gr parlak kuşe baskı." },
  { id: "p3", name: "Vitrin Afişi", cat: "Afiş", catId: "afis", kind: "afis", tone: "magenta", price: 95, unit: "/ adet", rating: 4.7, reviews: 64, desc: "70×100 cm, canlı renk, mat veya parlak." },
  { id: "p4", name: "Ürün Etiketi", cat: "Etiket", catId: "etiket", kind: "etiket", tone: "green", price: 220, unit: "/ 1000 adet", rating: 4.9, reviews: 142, tag: "Popüler", tagType: "accent", desc: "Rulo etiket, su ve yağ geçirmez yüzey." },
  { id: "p5", name: "Düğün Davetiyesi", cat: "Davetiye", catId: "davetiye", kind: "davetiye", tone: "plum", price: 18, unit: "/ adet", rating: 5.0, reviews: 301, tag: "Çok Satan", tagType: "accent", desc: "Özel kağıt, yaldız baskı, zarf dahil.", badge: true },
  { id: "p6", name: "Cephe Brandası", cat: "Branda", catId: "branda", kind: "branda", tone: "cyan", price: 65, unit: "/ m²", rating: 4.6, reviews: 48, desc: "440gr dayanıklı branda, kuşgözü montaj." },
  { id: "p7", name: "Kurumsal Katalog", cat: "Katalog", catId: "katalog", kind: "katalog", tone: "slate", price: 1250, unit: "/ 100 adet", rating: 4.8, reviews: 37, tag: "Premium", tagType: "ink", desc: "16 sayfa, amerikan cilt, kuşe kapak." },
  { id: "p8", name: "Promosyon Kupa", cat: "Promosyon", catId: "promosyon", kind: "promosyon", tone: "orange", price: 35, unit: "/ adet", rating: 4.7, reviews: 89, desc: "Beyaz porselen, dijital baskılı kupa." },
];

const FEATURES = [
  { icon: "award", title: "Kaliteli Baskı", desc: "Endüstriyel ofset ve dijital makinelerle keskin, canlı ve tutarlı renkler." },
  { icon: "truck", title: "Hızlı Teslimat", desc: "Standart işlerde 1–3 iş günü, acil işlerde aynı gün baskı imkanı." },
  { icon: "tag", title: "Uygun Fiyat", desc: "Toplu siparişlerde kademeli indirim ve şeffaf, sürpriz olmayan fiyatlar." },
  { icon: "bolt", title: "Online Sipariş Kolaylığı", desc: "Ürünü seç, dosyanı yükle, onayla. Tüm süreç birkaç dakikada tamamlanır." },
  { icon: "palette", title: "Tasarım Desteği", desc: "Hazır dosyanız yoksa profesyonel grafik ekibimiz sizin için tasarlar." },
  { icon: "layers", title: "Geniş Ürün Yelpazesi", desc: "Kartvizitten brandaya, ambalajdan promosyona tek noktadan tüm baskı." },
];

const STEPS = [
  { n: "1", title: "Ürünü Seç", desc: "İhtiyacın olan baskı ürününü kategoriden seç ve özelliklerini belirle." },
  { n: "2", title: "Özelleştir / Yükle", desc: "Ebat, kağıt ve adet seç; baskıya hazır dosyanı yükle veya tasarım iste." },
  { n: "3", title: "Siparişi Onayla", desc: "Fiyat özetini gör, güvenli ödemeyi tamamla ve siparişini oluştur." },
  { n: "4", title: "Baskı & Teslimat", desc: "İşin baskıya girer, kalite kontrolden geçer ve adresine teslim edilir." },
];

const TESTIMONIALS = [
  { quote: "Kartvizitlerimiz inanılmaz kaliteli çıktı, renkler tam istediğimiz gibiydi. Sipariş süreci çok kolaydı, ertesi gün elimizdeydi.", name: "Elif Yıldırım", role: "Kafe Sahibi, İstanbul", av: "EY" },
  { quote: "Mağaza açılışımız için brandadan afişe her şeyi tek yerden hallettik. Tasarım desteği almak büyük kolaylıktı.", name: "Murat Demir", role: "Mağaza Müdürü", av: "MD" },
  { quote: "Kurumsal kataloğumuz çok profesyonel oldu. Fiyat avantajlı, teslimat söz verilen günde. Kesinlikle tavsiye ederim.", name: "Selin Kaya", role: "Pazarlama Uzmanı", av: "SK" },
];

const FAQS = [
  { q: "Baskıya hazır dosyamı nasıl göndermeliyim?", a: "Ürün detay sayfasındaki dosya yükleme alanından PDF, AI, PSD, JPG veya PNG formatında dosyanızı yükleyebilirsiniz. En iyi sonuç için CMYK renk modunda, 300 DPI ve taşma payı (bleed) eklenmiş dosyalar öneririz." },
  { q: "Tasarımım yok, yardımcı olabilir misiniz?", a: "Elbette. Profesyonel grafik tasarım ekibimiz logo, kurumsal kimlik ve baskıya hazır tasarımlar oluşturur. Sipariş sırasında “Tasarım Desteği” seçeneğini işaretlemeniz yeterli." },
  { q: "Teslimat ne kadar sürer?", a: "Standart ürünlerde baskı süresi 1–3 iş günüdür. Kargo süresi bölgeye göre 1–2 gün ekler. Acil işleriniz için aynı gün baskı seçeneğimiz mevcuttur." },
  { q: "Minimum sipariş adedi var mı?", a: "Ürüne göre değişir. Kartvizitlerde minimum 500 adet, davetiye ve etiketlerde daha düşük adetlerle sipariş verebilirsiniz. Her ürünün detay sayfasında minimum adet belirtilir." },
  { q: "Toplu ve kurumsal siparişlerde indirim var mı?", a: "Evet. Adet arttıkça birim fiyat düşer. Büyük hacimli ve düzenli kurumsal işler için “Teklif Al” formundan özel fiyat talep edebilirsiniz." },
  { q: "Baskı öncesi prova görebilir miyim?", a: "Talep etmeniz halinde dijital prova (PDF) paylaşırız. Onayınız alınmadan iş baskıya girmez, böylece sürpriz sonuçlarla karşılaşmazsınız." },
];

window.CATEGORIES = window.CATEGORIES || CATEGORIES_FALLBACK;
window.PRODUCTS = window.PRODUCTS || PRODUCTS_FALLBACK;
Object.assign(window, { Icon, ProductMedia, MediaArt, FEATURES, STEPS, TESTIMONIALS, FAQS });
