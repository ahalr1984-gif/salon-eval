import { useState, useEffect, useCallback } from "react";

const SECTIONS = [
  {
    id: "welcome", icon: "🤝", name: "الترحيب والاستقبال الأولي", sub: "الانطباع الأول عند دخول العميل",
    criteria: [
      { label: "سرعة الترحيب بالعميل عند الدخول", hint: "هل يتم الترحيب خلال 30 ثانية؟" },
      { label: "اللغة المستخدمة والأسلوب الودود", hint: "حسن التعبير والابتسامة" },
      { label: "التعرف على العملاء المتكررين", hint: "تذكر الأسماء والتفضيلات" },
      { label: "الإرشاد والتوجيه داخل الصالون", hint: "توضيح أماكن الانتظار والخدمات" },
      { label: "المظهر العام لموظفي الاستقبال", hint: "الزي الرسمي والنظافة" },
    ]
  },
  {
    id: "communication", icon: "💬", name: "التواصل والاتصال", sub: "مهارات الإصغاء والتعبير",
    criteria: [
      { label: "الإجابة على المكالمات الهاتفية بسرعة", hint: "الرد خلال 3 رنات" },
      { label: "وضوح المعلومات المقدمة عن الخدمات", hint: "الأسعار والمدة والتفاصيل" },
      { label: "التعامل مع الاستفسارات والشكاوى", hint: "الحلول والمرونة" },
      { label: "التواصل عبر الواتساب/الرسائل", hint: "الردود السريعة والمهنية" },
      { label: "التنسيق مع باقي أقسام الصالون", hint: "التنسيق الداخلي الفعّال" },
    ]
  },
  {
    id: "booking", icon: "📅", name: "إدارة الحجوزات والمواعيد", sub: "دقة الجدولة وتجنب الانتظار",
    criteria: [
      { label: "سهولة عملية الحجز والتأكيد", hint: "هل هي بسيطة وسريعة؟" },
      { label: "دقة إدارة المواعيد وتجنب التضارب", hint: "لا تأخير ولا ازدواجية" },
      { label: "إرسال تذكيرات للعملاء", hint: "رسائل تأكيد قبل الموعد" },
      { label: "التعامل مع الإلغاء وإعادة الجدولة", hint: "المرونة وسياسة واضحة" },
      { label: "إدارة الانتظار وإبلاغ العملاء بالوقت", hint: "الشفافية في وقت الانتظار" },
    ]
  },
  {
    id: "environment", icon: "✨", name: "بيئة الاستقبال والراحة", sub: "النظافة والديكور وتجربة الانتظار",
    criteria: [
      { label: "نظافة وترتيب منطقة الاستقبال", hint: "لا فوضى ولا روائح غير مناسبة" },
      { label: "راحة مقاعد الانتظار والإضاءة", hint: "بيئة مريحة وجذابة" },
      { label: "توافر المشروبات والضيافة", hint: "قهوة، شاي، ماء" },
      { label: "الموسيقى والأجواء العامة", hint: "هل تناسب الصالون؟" },
      { label: "المواد الترويجية وقوائم الخدمات", hint: "واضحة، محدثة وجذابة" },
    ]
  },
  {
    id: "sales", icon: "💰", name: "المبيعات وتجربة الخروج", sub: "الإيرادات والانطباع الأخير",
    criteria: [
      { label: "الترويج للخدمات الإضافية والعروض", hint: "upselling بأسلوب غير مزعج" },
      { label: "سرعة ودقة عملية الدفع", hint: "لا انتظار عند الكاشير" },
      { label: "تعدد خيارات الدفع", hint: "هل كل الوسائل متاحة؟" },
      { label: "تشجيع العملاء على الحجز القادم", hint: "إعادة الحجز قبل المغادرة" },
      { label: "توديع العميل وشكره على زيارته", hint: "الانطباع الأخير مهم" },
    ]
  },
  {
    id: "operations", icon: "⚙️", name: "الكفاءة التشغيلية", sub: "الأنظمة والإجراءات والأداء العام",
    criteria: [
      { label: "استخدام برنامج إدارة الصالون", hint: "نظام رقمي متكامل" },
      { label: "حفظ بيانات العملاء وتاريخ خدماتهم", hint: "قاعدة بيانات منظمة" },
      { label: "الالتزام بالإجراءات والسياسات", hint: "اتساق الأداء دائماً" },
      { label: "التعامل مع المواقف الطارئة", hint: "هدوء وحل سريع" },
      { label: "التقارير اليومية ومتابعة الأداء", hint: "تتبع المبيعات والمواعيد" },
    ]
  },
];

const USERS = [
  { id: "admin", name: "المدير العام", role: "admin", password: "admin123", avatar: "👑" },
  { id: "supervisor", name: "المشرف", role: "supervisor", password: "super123", avatar: "🎯" },
  { id: "evaluator", name: "المقيّم", role: "evaluator", password: "eval123", avatar: "📋" },
];

const RECS = {
  welcome: "تدريب موظفي الاستقبال على بروتوكولات الترحيب وتحديد معيار الترحيب خلال 30 ثانية.",
  communication: "تطوير سياسة الاتصال وتطبيق نظام موحد للرد على الاستفسارات عبر كل القنوات.",
  booking: "الاستثمار في برنامج إدارة مواعيد متكامل مع تفعيل التذكيرات التلقائية للعملاء.",
  environment: "وضع جدول يومي لفحص نظافة منطقة الانتظار وتجديد مواد الضيافة.",
  sales: "تدريب الفريق على تقنيات البيع التصاعدي وتبسيط إجراءات الدفع عند الخروج.",
  operations: "مراجعة وتوثيق الإجراءات التشغيلية وتفعيل التقارير اليومية لمتابعة الأداء.",
};

const STORAGE_KEY = "salon-eval-data";

function loadEvals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveEvals(evals) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(evals)); } catch {}
}

function getGrade(pct) {
  if (pct >= 90) return { label: "ممتاز",     sub: "A+", color: "#4CAF85" };
  if (pct >= 80) return { label: "جيد جداً",  sub: "A",  color: "#7EC85A" };
  if (pct >= 70) return { label: "جيد",        sub: "B",  color: "#C9B84C" };
  if (pct >= 60) return { label: "مقبول",      sub: "C",  color: "#E8933A" };
  if (pct >= 40) return { label: "ضعيف",       sub: "D",  color: "#E86A3A" };
  return             { label: "غير مقبول",  sub: "F",  color: "#E85A5A" };
}

const G = {
  gold: "#C9A84C", goldLight: "#E8C97A", dark: "#1A1208",
  cream: "#FAF6EF", muted: "#7A6A50", border: "#EDE8DC",
};

// ── Stars ─────────────────────────────────────────────────────────────────
function Stars({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}>
      {[5,4,3,2,1].map(v => (
        <span key={v}
          onClick={() => onChange(v === value ? 0 : v)}
          onMouseEnter={() => setHover(v)}
          onMouseLeave={() => setHover(0)}
          style={{
            fontSize: 22, cursor: "pointer", userSelect: "none", display: "inline-block",
            color: v <= (hover || value) ? G.gold : "#DDD",
            transform: hover === v ? "scale(1.25)" : "scale(1)",
            transition: "color .15s, transform .1s",
          }}>★</span>
      ))}
    </div>
  );
}

// ── Bar ───────────────────────────────────────────────────────────────────
function Bar({ pct, color }) {
  return (
    <div style={{ height: 8, background: "#EEE", borderRadius: 4, overflow: "hidden", marginTop: 6 }}>
      <div style={{
        height: "100%", width: `${pct}%`, borderRadius: 4, transition: "width .6s ease",
        background: `linear-gradient(90deg, ${color || G.gold}, ${G.goldLight})`,
      }} />
    </div>
  );
}

// ── Btn ───────────────────────────────────────────────────────────────────
function Btn({ onClick, children, variant = "primary", style = {}, disabled }) {
  const base = {
    borderRadius: 8, padding: "9px 18px", cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'Tajawal', sans-serif", fontSize: 13, fontWeight: 700,
    border: "1px solid", transition: "all .2s", opacity: disabled ? 0.6 : 1,
  };
  const variants = {
    primary: { background: G.dark,  color: G.gold,  borderColor: G.gold },
    gold:    { background: G.gold,  color: G.dark,  borderColor: G.gold },
    ghost:   { background: "none",  color: G.muted, borderColor: G.border },
    danger:  { background: "none",  color: "#E85A5A", borderColor: "#FFE0E0" },
  };
  return (
    <button onClick={!disabled ? onClick : undefined} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [uid, setUid] = useState("admin");
  const [pw,  setPw]  = useState("");
  const [err, setErr] = useState("");

  const iStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 8, outline: "none",
    boxSizing: "border-box", border: "1px solid rgba(201,168,76,0.3)",
    background: "rgba(255,255,255,0.06)", color: "white",
    fontFamily: "'Tajawal', sans-serif", fontSize: 14,
  };

  const go = () => {
    const u = USERS.find(u => u.id === uid && u.password === pw);
    u ? onLogin(u) : setErr("كلمة المرور غير صحيحة");
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg,#1A1208 0%,#2D2416 60%,#1A1208 100%)",
      fontFamily: "'Tajawal', sans-serif", direction: "rtl",
    }}>
      <div style={{
        width: 360, background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(201,168,76,0.25)", borderRadius: 20,
        padding: "40px 32px", backdropFilter: "blur(12px)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>✂️</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", color: G.gold, fontSize: 20, margin: 0 }}>
            تقييم الاستقبال
          </h1>
          <p style={{ color: "rgba(201,168,76,0.45)", fontSize: 11, marginTop: 4, letterSpacing: 2 }}>
            SALON RECEPTION SYSTEM
          </p>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ color: G.gold, fontSize: 13, display: "block", marginBottom: 7 }}>المستخدم</label>
          <select value={uid} onChange={e => setUid(e.target.value)} style={{ ...iStyle, appearance: "auto" }}>
            {USERS.map(u => <option key={u.id} value={u.id}>{u.avatar} {u.name}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ color: G.gold, fontSize: 13, display: "block", marginBottom: 7 }}>كلمة المرور</label>
          <input type="password" value={pw} placeholder="••••••••" style={iStyle}
            onChange={e => { setPw(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && go()} />
          {err && <p style={{ color: "#E85A5A", fontSize: 12, marginTop: 6 }}>{err}</p>}
        </div>

        <button onClick={go} style={{
          width: "100%", padding: 14, borderRadius: 10, border: `1px solid ${G.gold}`,
          background: G.gold, color: G.dark, fontFamily: "'Tajawal', sans-serif",
          fontSize: 16, fontWeight: 700, cursor: "pointer",
        }}>دخول</button>

        <div style={{
          marginTop: 20, padding: 14, background: "rgba(201,168,76,0.06)",
          borderRadius: 10, fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 2,
        }}>
          👑 مدير: admin123<br/>
          🎯 مشرف: super123<br/>
          📋 مقيّم: eval123
        </div>
      </div>
    </div>
  );
}

// ── EVAL FORM ─────────────────────────────────────────────────────────────
function EvalForm({ user, onSave, onCancel }) {
  const [ratings, setRatings] = useState({});
  const [notes,   setNotes]   = useState({});
  const [general, setGeneral] = useState("");
  const [openSec, setOpenSec] = useState(SECTIONS[0].id);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  const total  = Object.values(ratings).reduce((a, b) => a + b, 0);
  const filled = Object.keys(ratings).length;
  const pct    = Math.round((total / 150) * 100);
  const grade  = getGrade(pct);

  const secScore = sid =>
    SECTIONS.find(s => s.id === sid).criteria
      .reduce((a, _, ci) => a + (ratings[`${sid}-${ci}`] || 0), 0);

  const save = () => {
    if (filled < 30) { alert(`يتبقى ${30 - filled} معيار لم يُقيَّم بعد`); return; }
    setSaving(true);
    onSave({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      evaluator: user.name,
      evaluatorId: user.id,
      ratings, notes, general,
      totalScore: total, pct, grade: grade.label,
    });
    setSaving(false);
    setSaved(true);
  };

  if (saved) return (
    <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "'Tajawal',sans-serif", direction: "rtl" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <h2 style={{ color: G.gold, fontSize: 24, marginBottom: 8 }}>تم حفظ التقييم!</h2>
      <p style={{ color: G.muted, marginBottom: 28 }}>النتيجة: {total}/150 — {grade.label} ({pct}%)</p>
      <Btn onClick={onCancel}>← العودة للرئيسية</Btn>
    </div>
  );

  return (
    <div style={{ direction: "rtl", fontFamily: "'Tajawal',sans-serif" }}>
      {/* Sticky header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50, background: G.dark,
        padding: "12px 20px", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid rgba(201,168,76,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: G.gold, cursor: "pointer", fontSize: 18 }}>←</button>
          <span style={{ color: G.gold, fontWeight: 700 }}>تقييم جديد</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", color: G.gold, fontSize: 26 }}>
            {total}<span style={{ fontSize: 14, opacity: 0.5 }}>/150</span>
          </div>
          <div style={{ color: "rgba(201,168,76,0.5)", fontSize: 11 }}>{filled}/30 معيار</div>
        </div>
        <Btn onClick={save} variant="gold" disabled={saving}>
          {saving ? "جاري الحفظ..." : "💾 حفظ"}
        </Btn>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {/* Progress */}
        <div style={{ background: "white", borderRadius: 12, padding: "16px 20px", marginBottom: 20, border: `1px solid ${G.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: G.muted, marginBottom: 8 }}>
            <span>تقدم التقييم — {filled}/30 معيار</span>
            <span style={{ color: grade.color, fontWeight: 700 }}>{pct}% — {grade.label}</span>
          </div>
          <Bar pct={Math.round((filled / 30) * 100)} />
        </div>

        {/* Sections */}
        {SECTIONS.map(section => {
          const sc     = secScore(section.id);
          const max    = section.criteria.length * 5;
          const sp     = Math.round((sc / max) * 100);
          const sg     = getGrade(sp);
          const isOpen = openSec === section.id;

          return (
            <div key={section.id} style={{
              background: "white", borderRadius: 14, marginBottom: 14,
              border: `1px solid ${G.border}`, overflow: "hidden",
              boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
            }}>
              <div onClick={() => setOpenSec(isOpen ? null : section.id)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 20px", cursor: "pointer",
                background: isOpen ? "#FFFAF0" : "white",
                borderBottom: isOpen ? `1px solid ${G.border}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, background: G.dark, borderRadius: 9,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
                  }}>{section.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: G.dark, fontSize: 14 }}>{section.name}</div>
                    <div style={{ fontSize: 11, color: G.muted }}>{section.sub}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: `${sg.color}22`, color: sg.color,
                  }}>{sc}/{max}</span>
                  <span style={{
                    color: "#BBB", fontSize: 12, display: "inline-block",
                    transform: isOpen ? "rotate(180deg)" : "none", transition: ".2s",
                  }}>▼</span>
                </div>
              </div>

              {isOpen && (
                <div style={{ padding: "10px 20px 20px" }}>
                  <Bar pct={sp} color={sg.color} />
                  <div style={{ marginTop: 16 }}>
                    {section.criteria.map((c, ci) => (
                      <div key={ci} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: ci < section.criteria.length - 1 ? "1px solid #F5F0E8" : "none",
                      }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#2D2416" }}>{c.label}</div>
                          <div style={{ fontSize: 11, color: "#AAA", marginTop: 2 }}>{c.hint}</div>
                        </div>
                        <Stars
                          value={ratings[`${section.id}-${ci}`] || 0}
                          onChange={v => setRatings(r => ({ ...r, [`${section.id}-${ci}`]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <label style={{ fontSize: 12, color: "#AAA", display: "block", marginBottom: 6 }}>📝 ملاحظات هذا المحور</label>
                    <textarea
                      value={notes[section.id] || ""} placeholder="أضف ملاحظات..."
                      onChange={e => setNotes(n => ({ ...n, [section.id]: e.target.value }))}
                      style={{
                        width: "100%", border: `1px solid ${G.border}`, borderRadius: 8,
                        padding: "9px 13px", fontFamily: "'Tajawal',sans-serif", fontSize: 13,
                        color: G.dark, background: "#FFFDF8", resize: "vertical",
                        minHeight: 56, outline: "none", boxSizing: "border-box",
                      }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* General notes */}
        <div style={{ background: "white", borderRadius: 14, padding: 20, border: `1px solid ${G.border}`, marginBottom: 20 }}>
          <label style={{ fontSize: 14, fontWeight: 700, color: G.dark, display: "block", marginBottom: 10 }}>📋 ملاحظات عامة</label>
          <textarea value={general} placeholder="ملاحظات شاملة عن جلسة التقييم..."
            onChange={e => setGeneral(e.target.value)}
            style={{
              width: "100%", border: `1px solid ${G.border}`, borderRadius: 8,
              padding: "11px 14px", fontFamily: "'Tajawal',sans-serif", fontSize: 13,
              color: G.dark, background: "#FFFDF8", resize: "vertical",
              minHeight: 80, outline: "none", boxSizing: "border-box",
            }} />
        </div>

        <Btn onClick={save} variant="primary" disabled={saving}
          style={{ width: "100%", padding: 16, fontSize: 16, textAlign: "center" }}>
          {saving ? "جاري الحفظ..." : "💾 حفظ التقييم"}
        </Btn>
      </div>
    </div>
  );
}

// ── REPORT ────────────────────────────────────────────────────────────────
function Report({ rec, onBack }) {
  const g    = getGrade(rec.pct);
  const weak = SECTIONS.filter(s => {
    const sc = s.criteria.reduce((a, _, ci) => a + (rec.ratings[`${s.id}-${ci}`] || 0), 0);
    return sc / (s.criteria.length * 5) < 0.7;
  });

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px", direction: "rtl", fontFamily: "'Tajawal',sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <Btn onClick={onBack} variant="ghost">← رجوع</Btn>
        <h2 style={{ color: G.dark, fontSize: 18, margin: 0 }}>تفاصيل التقييم</h2>
      </div>

      {/* Score card */}
      <div style={{ background: G.dark, borderRadius: 20, padding: 32, marginBottom: 20, border: "1px solid rgba(201,168,76,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 60, color: G.gold, lineHeight: 1 }}>
              {rec.totalScore}<span style={{ fontSize: 22, color: "rgba(201,168,76,0.45)" }}>/150</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 4 }}>
              {new Date(rec.date).toLocaleDateString("ar-SA")} · {rec.evaluator}
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: g.color }}>{g.label}</div>
            <div style={{ fontSize: 16, color: g.color, opacity: 0.7 }}>{g.sub} — {rec.pct}%</div>
          </div>
        </div>

        {SECTIONS.map(s => {
          const sc = s.criteria.reduce((a, _, ci) => a + (rec.ratings[`${s.id}-${ci}`] || 0), 0);
          const max = s.criteria.length * 5;
          const sp  = Math.round((sc / max) * 100);
          const sg  = getGrade(sp);
          return (
            <div key={s.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>
                <span>{s.icon} {s.name}</span>
                <span style={{ color: sg.color }}>{sc}/{max} ({sp}%)</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${sp}%`, borderRadius: 4, transition: "width .6s", background: `linear-gradient(90deg,${sg.color},#E8C97A)` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div style={{ background: "white", borderRadius: 14, padding: "20px 22px", border: `1px solid ${G.border}`, marginBottom: 16 }}>
        <h3 style={{ color: G.gold, fontSize: 15, marginBottom: 14 }}>💡 التوصيات</h3>
        {weak.length === 0
          ? <p style={{ color: "#4CAF85", fontWeight: 600 }}>✅ أداء ممتاز في جميع المحاور!</p>
          : weak.map(s => (
            <div key={s.id} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: "#2D2416", lineHeight: 1.7 }}>
              <span style={{ color: G.gold, marginTop: 4, flexShrink: 0 }}>◆</span>
              <span>{RECS[s.id]}</span>
            </div>
          ))
        }
      </div>

      {rec.general && (
        <div style={{ background: "#FFFDF8", borderRadius: 14, padding: "18px 22px", border: `1px solid ${G.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: G.dark, marginBottom: 8 }}>📋 ملاحظات المقيّم</h3>
          <p style={{ color: G.muted, fontSize: 14, lineHeight: 1.7 }}>{rec.general}</p>
        </div>
      )}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function Dashboard({ evals, user, onNew, onView, onDelete }) {
  const avg  = evals.length ? Math.round(evals.reduce((a, e) => a + e.pct, 0) / evals.length) : 0;
  const last  = evals[0];
  const trend = evals.length >= 2 ? evals[0].pct - evals[1].pct : null;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px", direction: "rtl", fontFamily: "'Tajawal',sans-serif" }}>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { icon: "📊", val: evals.length,           lbl: "إجمالي التقييمات" },
          { icon: "📈", val: avg + "%",               lbl: "متوسط الأداء" },
          { icon: "🏅", val: last ? last.grade : "—", lbl: "آخر تقييم" },
          { icon: "📉",
            val: trend === null ? "—" : trend > 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`,
            lbl: "الاتجاه",
            color: trend > 0 ? "#4CAF85" : trend < 0 ? "#E85A5A" : "#AAA" },
        ].map((s, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: "18px 14px", border: `1px solid ${G.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: s.color || G.gold }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#AAA", marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      {evals.length >= 2 && (
        <div style={{ background: "white", borderRadius: 14, padding: "20px 22px", border: `1px solid ${G.border}`, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: G.dark, marginBottom: 16 }}>📈 منحنى الأداء</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
            {[...evals].reverse().slice(-8).map((e, i) => {
              const sg = getGrade(e.pct);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: 10, color: sg.color, fontWeight: 700 }}>{e.pct}%</div>
                  <div style={{ width: "100%", background: sg.color, borderRadius: "4px 4px 0 0", height: `${(e.pct / 100) * 64}px`, opacity: .85 }} />
                  <div style={{ fontSize: 9, color: "#AAA" }}>
                    {new Date(e.date).toLocaleDateString("ar-SA", { month: "numeric", day: "numeric" })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ background: "white", borderRadius: 14, border: `1px solid ${G.border}`, overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: G.dark, margin: 0 }}>سجل التقييمات</h3>
          <Btn onClick={onNew} variant="primary">+ تقييم جديد</Btn>
        </div>

        {evals.length === 0
          ? (
            <div style={{ textAlign: "center", padding: "56px 24px", color: "#AAA" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <p>لا يوجد تقييمات بعد. ابدأ بإضافة أول تقييم!</p>
            </div>
          )
          : evals.map((e, i) => {
            const sg = getGrade(e.pct);
            return (
              <div key={e.id} style={{
                padding: "14px 22px",
                borderBottom: i < evals.length - 1 ? "1px solid #F5F0E8" : "none",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, background: `${sg.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display',serif", fontSize: 15, color: sg.color, fontWeight: 700,
                  }}>{e.totalScore}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: G.dark, fontSize: 14 }}>{e.grade}</div>
                    <div style={{ fontSize: 12, color: "#AAA" }}>
                      {new Date(e.date).toLocaleDateString("ar-SA")} · {e.evaluator}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ padding: "4px 12px", borderRadius: 20, background: `${sg.color}20`, color: sg.color, fontSize: 12, fontWeight: 700 }}>
                    {e.pct}%
                  </span>
                  <Btn onClick={() => onView(e)} variant="ghost" style={{ fontSize: 12, padding: "5px 12px" }}>عرض</Btn>
                  {(user.role === "admin" || e.evaluatorId === user.id) && (
                    <Btn onClick={() => onDelete(e.id)} variant="danger" style={{ fontSize: 12, padding: "5px 12px" }}>حذف</Btn>
                  )}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [user,     setUser]     = useState(null);
  const [evals,    setEvals]    = useState([]);
  const [page,     setPage]     = useState("dashboard");
  const [selected, setSelected] = useState(null);

  useEffect(() => { setEvals(loadEvals()); }, []);

  const handleSave = useCallback(rec => {
    const updated = [rec, ...evals.filter(e => e.id !== rec.id)];
    setEvals(updated);
    saveEvals(updated);
    setPage("dashboard");
  }, [evals]);

  const handleDelete = useCallback(id => {
    if (!confirm("هل أنت متأكد من حذف هذا التقييم؟")) return;
    const updated = evals.filter(e => e.id !== id);
    setEvals(updated);
    saveEvals(updated);
  }, [evals]);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div style={{ minHeight: "100vh", background: G.cream, direction: "rtl" }}>

      {/* Header */}
      <div style={{
        background: G.dark, borderBottom: `2px solid ${G.gold}`,
        padding: "13px 22px", display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>✂️</span>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", color: G.gold, fontSize: 16 }}>تقييم الاستقبال</div>
            <div style={{ color: "rgba(201,168,76,0.4)", fontSize: 9, letterSpacing: 1.5 }}>SALON RECEPTION SYSTEM</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {page !== "dashboard" && (
            <button onClick={() => setPage("dashboard")}
              style={{ background: "none", border: "none", color: G.gold, cursor: "pointer", fontSize: 13 }}>
              ← الرئيسية
            </button>
          )}
          <span style={{ fontSize: 16 }}>{user.avatar}</span>
          <span style={{ color: "rgba(201,168,76,0.7)", fontSize: 13 }}>{user.name}</span>
          <button onClick={() => setUser(null)} style={{
            background: "none", border: "1px solid rgba(201,168,76,0.25)",
            color: "rgba(201,168,76,0.55)", borderRadius: 6, padding: "4px 10px",
            cursor: "pointer", fontSize: 11,
          }}>خروج</button>
        </div>
      </div>

      {page === "dashboard" && (
        <Dashboard evals={evals} user={user}
          onNew={() => setPage("new")}
          onView={r => { setSelected(r); setPage("report"); }}
          onDelete={handleDelete} />
      )}
      {page === "new" && (
        <EvalForm user={user} onSave={handleSave} onCancel={() => setPage("dashboard")} />
      )}
      {page === "report" && selected && (
        <Report rec={selected} onBack={() => setPage("dashboard")} />
      )}
    </div>
  );