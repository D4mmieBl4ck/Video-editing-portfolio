import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "About", "Testimonials", "Contact"];

const VIDEOS = [
  {
    id: 1,
    title: "The Founder's Story",
    desc: "Transformed a raw 45-min interview into a 3-part content series",
    tag: "Personal Brand",
    color: "#1A56DB",
    embed: "https://www.youtube.com/embed/shorts/cYUkHxXB3Sk?si=bvaySNaCxVQi9O33",
  },
  {
    id: 2,
    title: "Hook-First Reframe",
    desc: "Rebuilt a generic talking-head into a scroll-stopping LinkedIn clip",
    tag: "Talking-Head",
    color: "#1A56DB",
    embed: "https://www.youtube.com/embed/9bZkp7q19f0",
  },
  {
    id: 3,
    title: "The Educator Series",
    desc: "Turned a 1-hour webinar into 12 short-form educational clips",
    tag: "Educational",
    color: "#1A56DB",
    embed: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
  {
    id: 4,
    title: "Reel That Sold Out",
    desc: "A 27-second Instagram reel that drove 4,000 DMs in 48 hours",
    tag: "Short-Form",
    color: "#1A56DB",
    embed: "https://www.youtube.com/embed/M7lc1UVf-VE",
  },
  {
    id: 5,
    title: "Brand Voice System",
    desc: "Built a repeatable content framework for a 7-figure coach",
    tag: "Strategy-Led Content",
    color: "#1A56DB",
    embed: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
];

const TESTIMONIALS = [
  {
    name: "Temitope Ajanaku",
    role: "Prompt & Chip · YouTube · 17K+ Views",
    text: "The editing completely transformed my channel. My videos now have a professional, polished look that keeps viewers watching till the end. The hook-driven approach brought in 17K+ views on my last upload alone.",
    stars: 5,
    avatar: "TA",
  },
  {
    name: "Temitope Ajanaku",
    role: "Prompt & Chip · YouTube · 17K+ Views",
    text: "What stood out most was the strategy behind every edit. It wasn't just about cuts and transitions — it was about keeping attention and delivering value. My audience grew significantly after we started working together.",
    stars: 5,
    avatar: "TA",
  },
  {
    name: "Temitope Ajanaku",
    role: "Prompt & Chip · YouTube · 17K+ Views",
    text: "I finally feel like my content represents the quality of my brand. The before-and-after difference was night and day. If you're serious about growing on YouTube, this is exactly the kind of editor you need.",
    stars: 5,
    avatar: "TA",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1A56DB">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = dark ? "#0A0A0A" : "#F8F7F4";
  const fg = dark ? "#FFFFFF" : "#0A0A0A";
  const muted = dark ? "#888" : "#666";
  const card = dark ? "#141414" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#1A56DB";
  const navBg = scrolled
    ? dark ? "rgba(10,10,10,0.92)" : "rgba(248,247,244,0.92)"
    : "transparent";

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,300&family=Montserrat:wght@700;800;900&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "none",
        transition: "all 0.4s",
        padding: "0 clamp(20px, 5vw, 60px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <span style={{ color: accent }}>OLUWADAMILOLA</span><span style={{ color: fg }}> DAVID</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", gap: 28 }} className="nav-links">
              {NAV_LINKS.map((l) => (
                <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                  style={{ background: "none", border: "none", cursor: "pointer", color: muted, fontSize: 14, fontWeight: 500, fontFamily: "inherit", letterSpacing: "0.02em", transition: "color 0.2s", padding: 0 }}
                  onMouseEnter={e => e.target.style.color = fg}
                  onMouseLeave={e => e.target.style.color = muted}
                >{l}</button>
              ))}
            </div>
            <button onClick={() => setDark(!dark)}
              style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", border: "none", borderRadius: 20, width: 40, height: 22, cursor: "pointer", position: "relative", transition: "background 0.3s" }}>
              <span style={{ position: "absolute", top: 3, left: dark ? 20 : 3, width: 16, height: 16, borderRadius: "50%", background: dark ? accent : "#0A0A0A", transition: "left 0.3s", display: "block" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px clamp(20px,5vw,60px) 80px", position: "relative", overflow: "hidden" }}>
        {/* Animated gradient background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: dark
            ? "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(26,86,219,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(26,86,219,0.05) 0%, transparent 60%)"
            : "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(26,86,219,0.10) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "15%", right: "8%", width: 320, height: 320,
          borderRadius: "50%", background: `radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 70%)`,
          filter: "blur(40px)", animation: "pulse 6s ease-in-out infinite",
        }} />
        <style>{`
          @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.15);opacity:1} }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
          @media(max-width:700px){ .nav-links{display:none!important} .hero-btns{flex-direction:column!important} .stats-row{gap:24px!important} }
        `}</style>

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: dark ? "rgba(26,86,219,0.1)" : "rgba(26,86,219,0.15)", border: `1px solid rgba(26,86,219,0.25)`, borderRadius: 20, padding: "6px 14px", marginBottom: 32, fontSize: 13, fontWeight: 500, color: accent, animation: "float 4s ease-in-out infinite" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, display: "inline-block" }} />
            Available for new projects · 2026
          </div>

          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(42px, 7vw, 88px)", lineHeight: 1.04, letterSpacing: "-2px", marginBottom: 28, maxWidth: 820 }}>
            Turning Talking-Head{" "}
            <span style={{
              background: `linear-gradient(90deg, ${accent}, #5B8DEF, ${accent})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
            }}>Videos</span>
            <br />Into Content That{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)" }}>Performs.</span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: muted, maxWidth: 540, lineHeight: 1.7, marginBottom: 44, fontWeight: 300 }}>
            Strategic video editing and content direction for creators, founders, and brands who want content that stops the scroll, holds attention, and actually drives results.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 72 }}>
            <button onClick={() => scrollTo("work")}
              style={{ background: accent, color: "#fff", border: "none", borderRadius: 8, padding: "15px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.01em", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: `0 0 0 0 ${accent}` }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px rgba(26,86,219,0.45)`; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 0 0"; }}
            >View My Work</button>
            <button onClick={() => scrollTo("contact")}
              style={{ background: "none", color: fg, border: `1.5px solid ${border}`, borderRadius: 8, padding: "15px 32px", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = fg; }}
            >Book a Project →</button>
          </div>

          <div className="stats-row" style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { val: "4+", label: "Years Experience" },
              { val: "30+", label: "Videos Edited" },
              { val: "∞", label: "Built for Growth" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: accent, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 13, color: muted, marginTop: 4, fontWeight: 400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: "100px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ color: accent, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Featured Work</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-1.5px", marginBottom: 16, lineHeight: 1.1 }}>Selected Projects</h2>
            <p style={{ color: muted, fontSize: 17, maxWidth: 480, marginBottom: 64, fontWeight: 300 }}>Raw footage transformed into content that earns attention and drives action.</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,340px), 1fr))", gap: 24 }}>
            {VIDEOS.map((v, i) => (
              <FadeIn key={v.id} delay={i * 0.08}>
                <VideoCard v={v} card={card} border={border} fg={fg} muted={muted} accent={accent} dark={dark}  />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px clamp(20px,5vw,60px)", background: dark ? "#0D0D0D" : "#F0EEE9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{ width: "100%", maxWidth: 400, aspectRatio: "4/5", borderRadius: 20, background: dark ? "#1A1A1A" : "#E0DDD8", border: `1px solid ${border}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #5B8DEF)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne'", fontWeight: 800, fontSize: 28, color: "#fff" }}>OD</div>
                <p style={{ color: muted, fontSize: 13, fontWeight: 400 }}>Photo Coming Soon</p>
              </div>
              <div style={{ position: "absolute", bottom: -16, right: -16, background: accent, color: "#fff", borderRadius: 12, padding: "12px 20px", fontFamily: "'Syne'", fontWeight: 800, fontSize: 13, boxShadow: "0 8px 24px rgba(26,86,219,0.4)" }}>
                4+ YRS EXPERIENCE
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p style={{ color: accent, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>About · Oluwadamilola David</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-1px", marginBottom: 24, lineHeight: 1.15 }}>
              More Than<br />
              <span style={{ color: muted, fontStyle: "italic", fontWeight: 700 }}>Just an Editor.</span>
            </h2>
            <p style={{ color: muted, fontSize: 16, lineHeight: 1.8, marginBottom: 28, fontWeight: 300, maxWidth: 480 }}>
              I help creators, founders, and brands turn raw talking-head footage into strategic content that captures attention, communicates value, and drives results. Every cut has a purpose. Every hook has a strategy.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Hook Creation", "Retention Editing", "Storytelling", "Short-Form", "Social Strategy", "Creative Direction"].map((tag) => (
                <span key={tag} style={{ background: dark ? "rgba(26,86,219,0.08)" : "rgba(26,86,219,0.12)", border: `1px solid rgba(26,86,219,0.2)`, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 500, color: fg }}>{tag}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "100px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ color: accent, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Testimonials</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-1.5px", marginBottom: 64, lineHeight: 1.1 }}>What Clients Say</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, height: "100%", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = dark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <StarRating count={t.stars} />
                  <p style={{ color: fg, fontSize: 15, lineHeight: 1.75, marginBottom: 24, fontWeight: 300, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${border}`, paddingTop: 20 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}44, ${accent}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne'", fontWeight: 800, fontSize: 13, color: accent, flexShrink: 0 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                      <div style={{ color: muted, fontSize: 12, marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px clamp(20px,5vw,60px) 120px", background: dark ? "#0D0D0D" : "#F0EEE9", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <p style={{ color: accent, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Let's Work Together</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-2px", marginBottom: 20, lineHeight: 1.05 }}>
              Let's Build Content<br />That Stands Out
            </h2>
            <p style={{ color: muted, fontSize: 17, lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }}>
              Whether you have raw footage or just an idea — let's turn it into content that performs. Inquiries answered within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <a href="mailto:davidoluwadamilola438@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: accent, color: "#fff", textDecoration: "none", borderRadius: 10, padding: "15px 36px", fontSize: 15, fontWeight: 700, letterSpacing: "0.01em", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,86,219,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                davidoluwadamilola438@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/damilola-abraham" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "none", color: fg, textDecoration: "none", border: `1.5px solid ${border}`, borderRadius: 10, padding: "15px 36px", fontSize: 15, fontWeight: 600, transition: "border-color 0.2s, color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = fg; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                linkedin.com/in/damilola-abraham
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "24px clamp(20px,5vw,60px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 15 }}><span style={{ color: accent }}>OLUWADAMILOLA</span> DAVID</span>
        <span style={{ color: muted, fontSize: 13 }}>© 2026 · Built for attention. Edited for results.</span>
      </footer>

      {/* FLOATING CTA */}
      <button onClick={() => scrollTo("contact")}
        style={{ position: "fixed", bottom: 32, right: 32, background: accent, color: "#fff", border: "none", borderRadius: 50, padding: "14px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 8px 32px rgba(26,86,219,0.45)`, zIndex: 99, transition: "transform 0.2s, box-shadow 0.2s", display: "flex", alignItems: "center", gap: 8 }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        Book a Project
      </button>
    </div>
  );
}

function VideoCard({ v, card, border, fg, muted, accent, dark }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing) {
          setPlaying(true);
        }
      },
      { threshold: 0.5 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [playing]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: card, border: `1px solid ${border}`, borderRadius: 20, overflow: "hidden",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered ? (dark ? "0 24px 60px rgba(0,0,0,0.6)" : "0 24px 60px rgba(0,0,0,0.1)") : "none",
      }}
    >
      {/* Video embed */}
      <div style={{ position: "relative", paddingBottom: "56.25%", background: dark ? "#111" : "#E8E5E0" }}>
        {playing ? (
          <iframe
            src={`${v.embed}?autoplay=1&mute=1`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen"
            title={v.title}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
            <span style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)", fontSize: 12, marginTop: 10, fontWeight: 400 }}>Loading...</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "20px 24px 24px" }}>
        <span style={{ background: `rgba(26,86,219,0.1)`, border: `1px solid rgba(26,86,219,0.2)`, color: accent, borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{v.tag}</span>
        <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 17, marginTop: 12, marginBottom: 6, letterSpacing: "-0.3px", lineHeight: 1.3 }}>{v.title}</h3>
        <p style={{ color: muted, fontSize: 13, fontWeight: 300, lineHeight: 1.6 }}>{v.desc}</p>
      </div>
    </div>
  );
}