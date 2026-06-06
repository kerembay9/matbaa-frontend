/* ============================================================
   checkout.jsx — Sepet, Ödeme, Teklif Al
   ============================================================ */

function CartPage() {
  const store = useStore();
  const { cart, cartTotal, updateQty, removeItem, nav } = store;
  const [promo, setPromo] = useState("");
  const shipping = 0;
  const kdv = Math.round(cartTotal * 0.2);

  if (!cart.length) {
    return (
      <div className="page">
        <PageHead crumb="Sepetim" title="Sepetim" sub="Siparişe hazır ürünleriniz burada görünür." />
        <section className="section-sm"><div className="wrap">
          <div className="card empty-state">
            <div className="eic"><Icon name="cart" w={40} /></div>
            <h2>Sepetiniz henüz boş</h2>
            <p>Baskı ürünlerimize göz atın ve siparişinizi oluşturmaya başlayın.</p>
            <button className="btn btn-primary btn-lg" onClick={() => nav("products")}>Ürünleri İncele <Icon name="arrow" w={17} /></button>
          </div>
        </div></section>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead crumb="Sepetim" title="Sepetim" sub={`${cart.length} üründe toplam ${store.cartCount} adet baskı işi.`} />
      <section className="section-sm"><div className="wrap">
        <div className="cart-layout">
          <div>
            {cart.map(item => (
              <div className="card cart-item" key={item.lineKey}>
                <div className="ci-media"><ProductMedia kind={item.kind} tone={item.tone} /></div>
                <div>
                  <h3>{item.name}</h3>
                  <div className="ci-opts">{item.opts}</div>
                  <div style={{ marginTop: 12 }}>
                    <span className="qty-stepper" style={{ display: "inline-flex", borderWidth: 1 }}>
                      <button onClick={() => updateQty(item.lineKey, -1)} aria-label="Azalt"><Icon name="minus" w={16} /></button>
                      <input value={item.qty} readOnly style={{ width: 48, height: 40, fontSize: 15 }} />
                      <button onClick={() => updateQty(item.lineKey, 1)} aria-label="Arttır"><Icon name="plus" w={16} /></button>
                    </span>
                    <span style={{ marginLeft: 12, fontSize: 13, color: "var(--muted)" }}>× {item.unit}</span>
                  </div>
                </div>
                <div className="ci-right">
                  <span className="ci-price">{tl(item.lineTotal * item.qty)}</span>
                  <a className="ci-remove" onClick={() => removeItem(item.lineKey)}><Icon name="trash" w={14} /> Kaldır</a>
                </div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => nav("products")}><Icon name="chevR" w={16} style={{ transform: "rotate(180deg)" }} /> Alışverişe devam et</button>
          </div>

          <div className="card summary-card">
            <h3>Sipariş Özeti</h3>
            <div className="srow"><span>Ara toplam</span><span>{tl(cartTotal - kdv)}</span></div>
            <div className="srow"><span>KDV (%20)</span><span>{tl(kdv)}</span></div>
            <div className="srow"><span>Kargo</span><span style={{ color: "var(--ok)", fontWeight: 700 }}>Ücretsiz</span></div>
            <div className="promo">
              <input placeholder="İndirim kodu" value={promo} onChange={e => setPromo(e.target.value)} />
              <button className="btn btn-ink btn-sm" onClick={() => store.toast(promo ? "Kod uygulandı (demo)" : "Kod girin")}>Uygula</button>
            </div>
            <div className="srow total"><span>Toplam</span><b>{tl(cartTotal)}</b></div>
            <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 18 }} onClick={() => nav("checkout")}>
              Ödemeye Geç <Icon name="arrow" w={17} />
            </button>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16, fontSize: 12.5, color: "var(--muted)" }}>
              <span style={{ display: "flex", gap: 5, alignItems: "center" }}><Icon name="shieldC" w={15} /> Güvenli ödeme</span>
              <span style={{ display: "flex", gap: 5, alignItems: "center" }}><Icon name="rotate" w={15} /> Kolay iade</span>
            </div>
          </div>
        </div>
      </div></section>
    </div>
  );
}

/* ---------- Çok adımlı ödeme ---------- */
function CheckoutPage() {
  const store = useStore();
  const { cart, cartTotal, nav, clearCart } = store;
  const [step, setStep] = useState(1);
  const [orderNo] = useState(() => "BM-" + Math.floor(100000 + Math.random() * 900000));

  if (!cart.length && step < 3) {
    return (
      <div className="page">
        <PageHead crumb="Ödeme" title="Sipariş Oluştur" />
        <section className="section-sm"><div className="wrap">
          <div className="card empty-state">
            <div className="eic"><Icon name="cart" w={40} /></div>
            <h2>Sepetinizde ürün yok</h2>
            <p>Ödeme adımına geçmek için önce sepetinize ürün ekleyin.</p>
            <button className="btn btn-primary btn-lg" onClick={() => nav("products")}>Ürünleri İncele</button>
          </div>
        </div></section>
      </div>
    );
  }

  const steps = [["Teslimat", 1], ["Ödeme", 2], ["Onay", 3]];

  return (
    <div className="page">
      <PageHead crumb="Ödeme" title="Siparişi Tamamla" />
      <section className="section-sm"><div className="wrap">
        {step < 3 && (
          <div className="checkout-steps">
            {steps.map(([l, n], i) => (
              <React.Fragment key={n}>
                <div className={"cs" + (step === n ? " on" : step > n ? " done" : "")}>
                  <span className="csn">{step > n ? <Icon name="check" w={14} /> : n}</span>
                  <span>{l}</span>
                </div>
                {i < 2 && <span className="cs-line"></span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {step === 3 ? (
          <SuccessView orderNo={orderNo} total={cartTotal} onHome={() => { clearCart(); nav("home"); }} onProducts={() => { clearCart(); nav("products"); }} />
        ) : (
          <div className="cart-layout">
            <div>
              {step === 1 && <DeliveryForm />}
              {step === 2 && <PaymentForm />}
              <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
                {step === 1
                  ? <button className="btn btn-ghost" onClick={() => nav("cart")}>Sepete dön</button>
                  : <button className="btn btn-ghost" onClick={() => setStep(1)}>Geri</button>}
                <button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => setStep(step + 1)}>
                  {step === 1 ? "Ödemeye geç" : "Siparişi onayla"} <Icon name="arrow" w={17} />
                </button>
              </div>
            </div>
            <div className="card summary-card">
              <h3>Sipariş Özeti</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
                {cart.map(it => (
                  <div key={it.lineKey} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 46, height: 46, borderRadius: 9, overflow: "hidden", background: "var(--paper-3)", flexShrink: 0 }}><ProductMedia kind={it.kind} tone={it.tone} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <b style={{ fontFamily: "var(--font-head)", fontSize: 14, display: "block" }}>{it.name}</b>
                      <small style={{ color: "var(--muted)", fontSize: 12 }}>{it.qty} × {it.unit}</small>
                    </div>
                    <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14 }}>{tl(it.lineTotal * it.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="srow" style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}><span>Kargo</span><span style={{ color: "var(--ok)", fontWeight: 700 }}>Ücretsiz</span></div>
              <div className="srow total"><span>Toplam</span><b>{tl(cartTotal)}</b></div>
            </div>
          </div>
        )}
      </div></section>
    </div>
  );
}

function DeliveryForm() {
  return (
    <div className="card form-card">
      <h3><span className="fn">1</span> Teslimat Bilgileri</h3>
      <div className="field-row">
        <div className="field"><label>Ad <span className="req">*</span></label><input placeholder="Adınız" /></div>
        <div className="field"><label>Soyad <span className="req">*</span></label><input placeholder="Soyadınız" /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>E-posta <span className="req">*</span></label><input placeholder="ornek@mail.com" type="email" /></div>
        <div className="field"><label>Telefon <span className="req">*</span></label><input placeholder="0(5__) ___ __ __" /></div>
      </div>
      <div className="field"><label>Adres <span className="req">*</span></label><textarea placeholder="Mahalle, cadde, sokak, no, daire"></textarea></div>
      <div className="field-row">
        <div className="field"><label>İl</label>
          <select><option>İstanbul</option><option>Ankara</option><option>İzmir</option><option>Bursa</option><option>Antalya</option></select>
        </div>
        <div className="field"><label>Posta Kodu</label><input placeholder="34000" /></div>
      </div>
      <label className="filter-opt" style={{ marginTop: 4 }}>
        <span className="box" style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "#fff" }}><Icon name="check" w={12} /></span>
        Fatura adresim teslimat adresimle aynı
      </label>
    </div>
  );
}

function PaymentForm() {
  const [method, setMethod] = useState("kart");
  return (
    <div className="card form-card">
      <h3><span className="fn">2</span> Ödeme Yöntemi</h3>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[["kart", "Kredi/Banka Kartı"], ["havale", "Havale / EFT"], ["kapida", "Kapıda Ödeme"]].map(([k, l]) => (
          <button key={k} className={"opt-pill" + (method === k ? " on" : "")} onClick={() => setMethod(k)}>{l}</button>
        ))}
      </div>
      {method === "kart" && (
        <React.Fragment>
          <div className="field"><label>Kart Üzerindeki İsim</label><input placeholder="Ad Soyad" /></div>
          <div className="field"><label>Kart Numarası</label><input placeholder="0000 0000 0000 0000" /></div>
          <div className="field-row">
            <div className="field"><label>Son Kullanma</label><input placeholder="AA/YY" /></div>
            <div className="field"><label>CVV</label><input placeholder="123" /></div>
          </div>
          <div style={{ display: "flex", gap: 9, alignItems: "center", color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
            <Icon name="shieldC" w={16} /> 256-bit SSL ile güvenli ödeme. Kart bilgileriniz saklanmaz.
          </div>
        </React.Fragment>
      )}
      {method === "havale" && <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 12, padding: 18, fontSize: 14, color: "var(--ink-700)" }}>Sipariş onayından sonra IBAN bilgilerimiz e-posta ile paylaşılır. Ödemeniz onaylandığında işiniz baskıya alınır.</div>}
      {method === "kapida" && <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 12, padding: 18, fontSize: 14, color: "var(--ink-700)" }}>Teslimat sırasında nakit veya kartla ödeme yapabilirsiniz. Kapıda ödeme için +₺25 hizmet bedeli uygulanır.</div>}
    </div>
  );
}

function SuccessView({ orderNo, total, onHome, onProducts }) {
  return (
    <div className="card success">
      <div className="sic"><Icon name="check" w={46} /></div>
      <h1>Siparişiniz alındı! 🎉</h1>
      <p>Teşekkür ederiz. Siparişiniz baskı kuyruğuna eklendi ve onay e-postası gönderildi.</p>
      <div className="order-no"><Icon name="file" w={16} /> Sipariş No: {orderNo}</div>
      <p style={{ marginBottom: 4 }}><b style={{ color: "var(--ink)" }}>Ödenen tutar: {tl(total)}</b></p>
      <p style={{ fontSize: 14 }}>Dosyanız kalite kontrolden geçtikten sonra dijital prova paylaşılacak. Onayınızın ardından baskı başlar.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 26 }}>
        <button className="btn btn-primary btn-lg" onClick={onProducts}>Alışverişe Devam Et</button>
        <button className="btn btn-ghost btn-lg" onClick={onHome}>Ana Sayfa</button>
      </div>
    </div>
  );
}

/* ---------- Teklif Al ---------- */
function QuotePage() {
  const store = useStore();
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("Kartvizit");

  if (sent) {
    return (
      <div className="page">
        <PageHead crumb="Teklif Al" title="Teklif Talebiniz Alındı" />
        <section className="section-sm"><div className="wrap">
          <div className="card success">
            <div className="sic"><Icon name="check" w={46} /></div>
            <h1>Teşekkürler!</h1>
            <p>Teklif talebiniz ekibimize ulaştı. Uzmanlarımız en geç 1 iş günü içinde size özel fiyat teklifiyle dönüş yapacak.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 26 }}>
              <button className="btn btn-primary btn-lg" onClick={() => store.nav("products")}>Ürünleri İncele</button>
              <button className="btn btn-ghost btn-lg" onClick={() => store.nav("home")}>Ana Sayfa</button>
            </div>
          </div>
        </div></section>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead crumb="Teklif Al" title="Özel Teklif Alın" sub="Toplu siparişler, kurumsal işler ve özel projeleriniz için size özel fiyat hazırlayalım." />
      <section className="section-sm"><div className="wrap">
        <div className="cart-layout">
          <div className="card form-card">
            <h3><span className="fn"><Icon name="tag" w={15} /></span> Teklif Formu</h3>
            <div className="field-row">
              <div className="field"><label>Ad Soyad <span className="req">*</span></label><input placeholder="Adınız Soyadınız" /></div>
              <div className="field"><label>Firma (opsiyonel)</label><input placeholder="Firma adı" /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>E-posta <span className="req">*</span></label><input placeholder="ornek@mail.com" /></div>
              <div className="field"><label>Telefon <span className="req">*</span></label><input placeholder="0(5__) ___ __ __" /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>Ürün</label>
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="field"><label>Tahmini Adet</label><input placeholder="Örn. 1000" /></div>
            </div>
            <div className="field"><label>Proje Detayı <span className="req">*</span></label><textarea placeholder="Ebat, kağıt, kaplama, teslim tarihi gibi detayları yazın…"></textarea></div>
            <div className="field">
              <label>Dosya / Örnek (opsiyonel)</label>
              <label className={"upload" + (file ? " has" : "")}>
                <input type="file" hidden onChange={e => setFile(e.target.files[0] ? e.target.files[0].name : null)} />
                <div className="uic"><Icon name={file ? "check" : "upload"} w={23} /></div>
                {file ? <b style={{ color: "var(--ok)" }}>{file}</b> : <React.Fragment><b>Dosya yükle</b><small>PDF, AI, PSD, JPG, PNG</small></React.Fragment>}
              </label>
            </div>
            <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 8 }} onClick={() => setSent(true)}>Teklif Talebi Gönder <Icon name="arrow" w={17} /></button>
          </div>

          <div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, marginBottom: 16 }}>Neden teklif alın?</h3>
              {[["tag", "Avantajlı toplu fiyat", "Adet arttıkça birim fiyatınız düşer."], ["palette", "Ücretsiz tasarım danışmanlığı", "Projenize en uygun çözümü öneririz."], ["clock", "1 iş günü içinde dönüş", "Hızlı ve net fiyatlandırma."], ["shieldC", "Bağlayıcı olmayan teklif", "Onaylamadan hiçbir ücret yok."]].map(([ic, t, d], i) => (
                <div key={i} style={{ display: "flex", gap: 13, padding: "13px 0", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                  <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--accent-tint)", color: "var(--accent-700)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={ic} w={19} /></span>
                  <div><b style={{ fontFamily: "var(--font-head)", fontSize: 14.5, display: "block" }}>{t}</b><small style={{ color: "var(--muted)", fontSize: 13 }}>{d}</small></div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 24, marginTop: 16, background: "var(--ink)", color: "#fff" }}>
              <h3 style={{ color: "#fff", fontSize: 17, marginBottom: 8 }}>Acele mi ediyorsunuz?</h3>
              <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14, marginBottom: 16 }}>WhatsApp hattımızdan anında bilgi alın.</p>
              <button className="btn btn-block" style={{ background: "#25d366", color: "#fff" }}><Icon name="wa" w={18} /> WhatsApp ile Yazın</button>
            </div>
          </div>
        </div>
      </div></section>
    </div>
  );
}

function PageHead({ crumb, title, sub }) {
  const { nav } = useStore();
  return (
    <div className="page-head">
      <div className="wrap">
        <div className="crumb"><a onClick={() => nav("home")}>Ana Sayfa</a> <Icon name="chevR" w={13} /> <span>{crumb}</span></div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

Object.assign(window, { CartPage, CheckoutPage, QuotePage, PageHead });
