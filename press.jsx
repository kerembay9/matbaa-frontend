/* ============================================================
   press.jsx — Hero matbaa baskı animasyonu bileşeni
   ============================================================ */
function PressAnimation() {
  const [count, setCount] = useState(1284);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="press">
      <div className="press-machine">
        <div className="pm-top">
          <span className="pm-rollers">
            <span className="pm-roller"></span>
            <span className="pm-roller"></span>
          </span>
          <span className="pm-title">OFSET BASKI</span>
          <span className="pm-cmyk"><i></i><i></i><i></i><i></i></span>
        </div>

        <div className="pm-bed">
          <div className="sheet">
            <div className="ly ly-c"><span className="sh band"></span></div>
            <div className="ly ly-m"><span className="sh circ"></span></div>
            <div className="ly ly-y"><span className="sh blob"></span></div>
            <div className="ly ly-k">
              <span className="sh frame"></span>
              <span className="sh bar t1"></span>
              <span className="sh bar t2"></span>
            </div>
            <i className="reg tl"></i><i className="reg tr"></i>
            <i className="reg bl"></i><i className="reg br"></i>
          </div>
          <div className="roller-sweep"></div>
          <div className="pm-done">
            <span className="dk"><Icon name="check" w={10} /></span>
            Baskı hazır
          </div>
        </div>

        <div className="pm-foot">
          <span className="live"></span>
          Renk registration · CMYK
          <span style={{ marginLeft: "auto" }}>Bugün: <b>{fmt(count)}</b> baskı</span>
        </div>
      </div>

      <div className="out-stack">
        <div className="out-sheet"><span className="ob"></span><span className="obc"></span></div>
      </div>
    </div>
  );
}

Object.assign(window, { PressAnimation });
