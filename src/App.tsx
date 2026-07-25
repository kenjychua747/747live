import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageGallery } from "@/components/ui/image-gallery";
import { NeoMinimalFooter } from "@/components/ui/neo-minimal-footer";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowUpRight,
  ArrowUpToLine,
  ChevronDown,
  ChevronRight,
  Crown,
  ExternalLink,
  Gift,
  Globe,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Play,
  Search,
  ShieldCheck,
  Send,
  Sparkles,
  Trophy,
  UserPlus,
  X,
} from "lucide-react";

const partnerInviteUrl = "https://www.messenger.com/j/AbakhHJ975SWCzqw/";
const facebookUrl = "https://m.me/100022590198280";

const heroImage =
  "/images/hero.jpg";

const providers = [
  { name: "Live Sports", kind: "Sports", asset: "/images/provider-live-sports.gif", hue: "#67f79d" },
  { name: "Pre-match", kind: "Sports", asset: "/images/provider-pre-match.gif", hue: "#ec6800" },
  { name: "Live Casino", kind: "Tables", asset: "/images/provider-live-casino.gif", hue: "#5c17a2" },
  { name: "Evolution", kind: "Live tables", asset: "/images/provider-evolution.gif", hue: "#e4b551" },
  { name: "JILI", kind: "Slots", asset: "/images/provider-jili.gif", hue: "#f83700" },
  { name: "Casino", kind: "Tables", asset: "/images/provider-casino.gif", hue: "#66f89c" },
  { name: "Pragmatic Play", kind: "Slots", asset: "/images/provider-pragmatic-play.gif", hue: "#ef5d2d" },
  { name: "Fachai", kind: "Arcade", asset: "/images/provider-fachai.gif", hue: "#e9bb43" },
  { name: "CreedRoomz", kind: "Live tables", asset: "/images/provider-creedroomz.gif", hue: "#5d6dff" },
  { name: "Dragon Gaming", kind: "Slots", asset: "/images/provider-dragon-gaming.gif", hue: "#d93723" },
  { name: "747 News", kind: "Updates", asset: "/images/provider-747-news.gif", hue: "#66f89c" },
  { name: "747 Hearts", kind: "Tables", asset: "/images/provider-747-hearts.gif", hue: "#f56b9a" },
  { name: "PopOK", kind: "Arcade", asset: "/images/provider-popok.gif", hue: "#75a9ff" },
  { name: "Amigo", kind: "Games", asset: "/images/provider-amigo.gif", hue: "#f1a343" },
];

const promoSlides = [
  "/images/promo-1.webp",
  "/images/promo-2.webp",
  "/images/promo-3.webp",
  "/images/promo-4.webp",
  "/images/promo-5.webp",
];

const benefitSlides = ["/images/ga.jpg", "/images/ge.jpg"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const faqData = [
  { keywords: ["what is", "747 live", "about", "platform"], q: "What is 747 Live?", a: "Ang 747 Live ay isang premium gaming platform na may live casino, sports betting, at arcade games. Ito ay independent invitation portal para ma-access mo ang platform." },
  { keywords: ["register", "sign up", "join", "create account", "how to"], q: "How do I register?", a: "Click lang ang \"Register now\" button sa page na ito. Ire-redirect ka sa official partner platform para matapos ang registration mo." },
  { keywords: ["bonus", "welcome", "promo", "cashback", "rebate"], q: "Is there a welcome bonus?", a: "Oo naman! Kapag nag-register ka through our partner link, may exclusive welcome bonuses, cashback, at promotions na àwait sa'yo." },
  { keywords: ["game", "slot", "casino", "sports", "bet", "play", "available"], q: "What games are available?", a: "Marami kang pagpipilian — live dealer tables tulad ng baccarat, blackjack, roulette, sports betting, arcade games, at slot experiences mula sa top providers." },
  { keywords: ["official", "real", "legit", "legitimate", "scam"], q: "Is this the official site?", a: "Hindi po. Independent promotional website lang ito — hindi kami ang operator ng gaming platform. Ang registration ay sa official partner link namin dumadaan." },
  { keywords: ["safe", "secure", "security", "trust", "reliable"], q: "Is it safe?", a: "Ang partner platform ay gumagamit ng industry-standard security. Laging magsugal nang responsable at siguraduhing 18 years old ka pataas." },
  { keywords: ["payment", "cash in", "deposit", "gcash", "barq", "stc", "gotyme"], q: "What payment methods are accepted?", a: "Tumatanggap kami ng GCash, GOtyme, STC Pay, at Barq. Mabilis ang cash in at cash out — walang hidden fees." },
  { keywords: ["vip", "raffle", "member", "perks", "privilege"], q: "What VIP perks are available?", a: "May 2% bonus sa first cash in, 10% loss rebates dalawang beses sa isang buwan, birthday bonus, VIP sports group access, at monthly raffle ang mga members." },
  { keywords: ["age", "18", "minor", "legal"], q: "Who can play?", a: "Dapat 18 years old or pataas para gumamit ng platform na ito. Lage naming pino-promote ang responsible gaming." },
  { keywords: ["contact", "support", "help", "customer", "message", "facebook"], q: "How do I contact support?", a: "Pwede mo kaming i-message directly sa Facebook — https://www.facebook.com/profile.php?id=100022590198280 — 24/7 ang support namin." },
];

const quickReplies = ["What is 747 Live?", "How do I register?", "What games are available?", "What payment methods are accepted?"];

function ProviderCard({ provider, index }: { provider: (typeof providers)[number]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    setTilt({ x, y });
  }

  return (
    <motion.a
      href={partnerInviteUrl}
      target="_blank"
      rel="noreferrer"
      className="provider-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.25) }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      aria-label={`Explore ${provider.name}`}
      style={
        {
          "--provider-color": provider.hue,
          "--tilt-x": `${tilt.x}deg`,
          "--tilt-y": `${tilt.y}deg`,
        } as CSSProperties
      }
    >
      <span className="provider-card__visual">
        <img
          src={provider.asset}
          alt={`${provider.name} provider animation`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="provider-card__scan" aria-hidden="true" />
      </span>
      <span className="provider-card__content">
        <span className="provider-card__kind">{provider.kind}</span>
        <span className="provider-card__title">{provider.name}</span>
      </span>
      <ArrowUpRight className="provider-card__arrow" size={18} aria-hidden="true" />
    </motion.a>
  );
}

function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setHasAnimated(true);
        const duration = 2000;
        const start = performance.now();
        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (to * eased).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix, decimals, hasAnimated]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [splashVisible, setSplashVisible] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [cursorGlow, setCursorGlow] = useState({ x: 50, y: 20 });
  const [promoIndex, setPromoIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const filteredProviders = providers.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.kind.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const [winNotif, setWinNotif] = useState<{ name: string; amount: string; game: string } | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const logoClickRef = useRef(0);
  const logoTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Supabase Auth
  const supabase = useRef(createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  )).current;
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  function handleLogoClick() {
    logoClickRef.current += 1;
    if (logoTimerRef.current) clearTimeout(logoTimerRef.current);
    if (logoClickRef.current >= 3) {
      logoClickRef.current = 0;
      setAdminModalOpen(true);
      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");
    } else {
      logoTimerRef.current = setTimeout(() => { logoClickRef.current = 0; }, 1000);
    }
  }

  async function handleAdminLogin() {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please enter email and password");
      return;
    }
    setLoginLoading(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });
    setLoginLoading(false);
    if (error) {
      setLoginError(error.message === "Invalid login credentials" ? "Invalid email or password" : error.message);
      return;
    }
    setAdminModalOpen(false);
    window.open("/admin.html", "_blank");
  }

  const winNotifications = [
    { name: "John D.", amount: "₱25,000", game: "Live Casino" },
    { name: "Maria S.", amount: "₱12,400", game: "JILI Slots" },
    { name: "Ahmed R.", amount: "SAR 3,200", game: "Sports Betting" },
    { name: "Ken J.", amount: "₱48,700", game: "Evolution" },
    { name: "Sarah L.", amount: "₱8,900", game: "Pragmatic Play" },
    { name: "Omar K.", amount: "SAR 5,500", game: "Live Casino" },
    { name: "Carlos M.", amount: "₱32,100", game: "Fachai Arcade" },
    { name: "Fatima Z.", amount: "SAR 8,000", game: "CreedRoomz" },
    { name: "Mike T.", amount: "₱15,600", game: "Sports Betting" },
    { name: "Rosa P.", amount: "₱22,300", game: "Dragon Gaming" },
  ];

  useEffect(() => {
    const show = () => {
      const pick = winNotifications[Math.floor(Math.random() * winNotifications.length)];
      setWinNotif(pick);
      setTimeout(() => setWinNotif(null), 5000);
    };
    show();
    const interval = setInterval(show, 14000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const [cookieConsent, setCookieConsent] = useState(() => localStorage.getItem("cookieConsent") === "true");
  const [lang, setLang] = useState<"en" | "tl">("en");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (contentReady) {
      const t = setTimeout(() => setShowSkeleton(false), 600);
      return () => clearTimeout(t);
    }
  }, [contentReady]);

  const [chatOpen, setChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm the 747 Live smart assistant. Ask me anything about registration, bonuses, games, or promotions!" },
  ]);
  const [typing, setTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function findBestMatch(input: string) {
    const lower = input.toLowerCase();
    let best: typeof faqData[number] | null = null;
    let bestScore = 0;
    for (const item of faqData) {
      let score = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw)) score += kw.length;
      }
      if (score > bestScore) { bestScore = score; best = item; }
    }
    return bestScore > 1 ? best : null;
  }

  function handleSend(text?: string) {
    const msg = (text || chatInput).trim();
    if (!msg) return;
    setChatMessages((prev) => [...prev, { from: "user", text: msg }]);
    setChatInput("");
    setTyping(true);
    setTimeout(() => {
      const match = findBestMatch(msg);
      const reply = match
        ? match.a
        : "Thanks for your question! For detailed assistance, you can message me directly on Facebook or register through the platform. Is there anything else I can help with?";
      setChatMessages((prev) => [...prev, { from: "bot", text: reply }]);
      setTyping(false);
      if (!chatOpen) setUnreadCount((c) => c + 1);
    }, 800);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setSplashVisible(false), 2800);
    const readyTimer = window.setTimeout(() => setContentReady(true), 3400);
    return () => { window.clearTimeout(timer); window.clearTimeout(readyTimer); };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoSlides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % benefitSlides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  function scrollToSection(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
    <AnimatePresence>
      {splashVisible && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="splash__bg" />
          <div className="splash__inner">
            <motion.img
              src="/images/logo.jpg"
              alt="747 Live"
              className="splash__logo"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="splash__tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 120, scale: 0.85, letterSpacing: "0.02em" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              747 Free Online Betting Site
            </motion.p>
            <motion.div
              className="splash__loader"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 1.5 }}
              transition={{ delay: 0.7, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      <AnimatePresence>
      {menuOpen && (
        <>
        <motion.div
          className="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMenuOpen(false)}
        />
        <motion.aside
          className="mobile-menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mobile-menu__top">
            <span className="brand brand--menu"><img src="/images/logo.jpg" alt="747 Live" className="brand__logo" onClick={handleLogoClick} /></span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <div className="mobile-menu__links">
            <button type="button" onClick={() => scrollToSection("benefits")}>Benefits</button>
            <button type="button" onClick={() => scrollToSection("discover")}>Discover</button>
            <button type="button" onClick={() => scrollToSection("sports")}>Sports</button>
            <button type="button" onClick={() => scrollToSection("promo")}>Why 747LIVE</button>
            <a href="https://www.facebook.com/profile.php?id=100022590198280" target="_blank" rel="noreferrer">Facebook</a>
          </div>
          <a className="button button--primary" href={partnerInviteUrl} target="_blank" rel="noreferrer">
            Join the invitation <ArrowUpRight size={18} />
          </a>
        </motion.aside>
        </>
      )}
      </AnimatePresence>

    <main
      className="site-shell"
      onPointerMove={(event) => {
        setCursorGlow({
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        });
      }}
      style={{ "--cursor-x": `${cursorGlow.x}%`, "--cursor-y": `${cursorGlow.y}%` } as CSSProperties}
    >
      <div className="ambient ambient--green" aria-hidden="true" />
      <div className="ambient ambient--orange" aria-hidden="true" />
      <div className="ambient ambient--purple" aria-hidden="true" />

      <header className="site-header">
        <div className="site-header__inner">
          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <button className="brand" type="button" onClick={() => scrollToSection("top")} aria-label="Back to top">
            <img src="/images/logo.jpg" alt="747 Live" className="brand__logo" onClick={handleLogoClick} />
          </button>
          <nav className="desktop-nav" aria-label="Main navigation">
            <button type="button" className={activeSection === "benefits" ? "desktop-nav--active" : ""} onClick={() => scrollToSection("benefits")}>Benefits</button>
            <button type="button" className={activeSection === "discover" ? "desktop-nav--active" : ""} onClick={() => scrollToSection("discover")}>Discover</button>
            <button type="button" className={activeSection === "sports" ? "desktop-nav--active" : ""} onClick={() => scrollToSection("sports")}>Sports</button>
            <button type="button" className={activeSection === "promo" ? "desktop-nav--active" : ""} onClick={() => scrollToSection("promo")}>Promo</button>
          </nav>
          <div className="header-actions">
            <button className="lang-switcher" type="button" onClick={() => setLang(lang === "en" ? "tl" : "en")}>
              <Globe size={12} /> {lang === "en" ? "EN" : "TL"}
            </button>

            <a className="header-social" href="https://www.facebook.com/profile.php?id=100022590198280" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero__image" style={{ backgroundImage: `url(${heroImage})` }} />

        <div className="hero__content">
          <motion.div
            className="hero__panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero__logo">
              <img src="/images/logo.jpg" alt="747 Live" />
              <span className="hero__logo-tag">
                <ShieldCheck size={11} /> Official Agent
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Play <em>747 LIVE</em> &amp; win real cash.
            </motion.h1>
            <motion.p
              className="hero__copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.75 }}
            >
              Sign up through my link for a <span className="hero__bonus">Welcome Bonus + Cashback</span>. Casino, live sports, eSports &amp; VIP rewards — Saudi Riyals accepted.
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54, duration: 0.7 }}
            >
              <a className="button button--primary button--large button--pulse" href={partnerInviteUrl} target="_blank" rel="noreferrer">
                Register through my link <ArrowUpRight size={19} />
              </a>
              <button className="button button--quiet button--large" type="button" onClick={() => scrollToSection("benefits")}>
                Why join <ChevronRight size={19} />
              </button>
            </motion.div>
            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.7 }}
            >
              <div className="hero__stat">
                <strong><CountUp to={3163} suffix="+" /></strong>
                <small>Playing now</small>
              </div>
              <div className="hero__stat-divider" aria-hidden="true" />
              <div className="hero__stat">
                <strong>₱<CountUp to={2.4} suffix="B+" decimals={1} /></strong>
                <small>Paid monthly</small>
              </div>
              <div className="hero__stat-divider" aria-hidden="true" />
              <div className="hero__stat">
                <strong>24/7</strong>
                <small>Support</small>
              </div>
            </motion.div>
            <motion.div
              className="hero__trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.7 }}
            >
              <ShieldCheck size={15} />
              <span><strong>Verified Partner</strong> — 100% secure registration</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero__form-wrap">
          {!formOpen ? (
            <motion.div
              className="hero__form-cta"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className="hero__form-trigger" onClick={() => setFormOpen(true)} type="button">
                <UserPlus size={20} />
                <span>Register Account</span>
                <ChevronDown size={16} />
              </button>
              <p className="hero__form-trigger-note">10% cash back + exclusive GCs</p>
            </motion.div>
          ) : (
            <div className="hero__form-overlay" onClick={() => setFormOpen(false)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key="form"
                  className="hero__form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="hero__form-header">
                    <div className="hero__form-icon"><UserPlus size={18} /></div>
                    <span>Player Form — 747 Account</span>
                    <button className="hero__form-close" onClick={() => setFormOpen(false)} type="button"><X size={16} /></button>
                  </div>
            <form className="hero__form-body" onSubmit={(e) => { e.preventDefault(); window.open(partnerInviteUrl, "_blank"); }}>
              <label className="hero__form-field">
                <span>Full Name</span>
                <input type="text" placeholder="Juan Dela Cruz" required />
              </label>
              <label className="hero__form-field">
                <span>Email Address</span>
                <input type="email" placeholder="juan@email.com" required />
              </label>
              <label className="hero__form-field">
                <span>Desired Username</span>
                <input type="text" placeholder="Choose your username" required />
              </label>
              <label className="hero__form-field">
                <span>Contact Number</span>
                <input type="tel" placeholder="+63 XXX XXX XXXX" required />
              </label>
              <label className="hero__form-field">
                <span>Country</span>
                <select required defaultValue="">
                  <option value="" disabled>Select your country</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Oman">Oman</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Japan">Japan</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                  <option value="Poland">Poland</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Romania">Romania</option>
                  <option value="Greece">Greece</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Austria">Austria</option>
                  <option value="Ireland">Ireland</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Peru">Peru</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
              </label>
              <button className="button button--primary button--large button--pulse" type="submit" style={{ width: "100%", marginTop: 8 }}>
                Register now <ArrowUpRight size={18} />
              </button>
            </form>
            <div className="hero__form-footer">
              <Gift size={13} /> <strong>10% CASH BACK</strong> sa total na LOSS BETS twice a month — plus exclusive access to all GCs!
            </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="hero__bottom-line" aria-hidden="true"><span /></div>
      </section>

      <section className="ticker" aria-label="Latest updates">
        <div className="ticker__label"><Sparkles size={14} /> Now in the lounge</div>
        <div className="ticker__track" aria-hidden="true">
          <div className="ticker__content">
            <span>TWICE MONTHLY CASHBACK</span><i />
            <span>SAUDI RIYALS ACCEPTED</span><i />
            <span>24/7 LIVE SPORTS TIPS</span><i />
            <span>MONTHLY VIP RAFFLE</span><i />
            <span>TWICE MONTHLY CASHBACK</span><i />
            <span>SAUDI RIYALS ACCEPTED</span><i />
            <span>24/7 LIVE SPORTS TIPS</span><i />
            <span>MONTHLY VIP RAFFLE</span><i />
          </div>
        </div>
      </section>

      <section className="benefits section-shell" id="how-it-works" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <motion.div className="section-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={fadeUp} className="section-kicker"><Play size={16} /> How it works</motion.p>
          <motion.h2 variants={fadeUp}>Get started in <em>3 easy steps</em></motion.h2>
        </motion.div>
        <div className="steps-grid">
          {[
            { num: "1", title: lang === "en" ? "Register" : "Magrehistro", desc: lang === "en" ? "Click the register button and fill in your details through our partner platform." : "I-click ang register button at punan ang iyong detalye." },
            { num: "2", title: lang === "en" ? "Deposit" : "Mag-deposito", desc: lang === "en" ? "Choose from GCash, GOtyme, STC Pay, or Barq. No hidden fees, instant processing." : "Pumili ng GCash, GOtyme, STC Pay, o Barq. Walang dagdag na bayad." },
            { num: "3", title: lang === "en" ? "Play & Win" : "Maglaro at Manalo", desc: lang === "en" ? "Access live casino, sports betting, slots, and arcade games. Start winning today!" : "Mag-access sa live casino, sports betting, slots, at arcade games. Manalo na!" },
          ].map((step) => (
            <div key={step.num} className="step-card">
              <div className="step-card__num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="benefits section-shell" id="benefits">
        <motion.div className="section-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={fadeUp} className="section-kicker"><Crown size={16} /> Invitation privileges</motion.p>
          <motion.h2 variants={fadeUp}>A more rewarding way to <em>step inside.</em></motion.h2>
          <motion.p variants={fadeUp} className="section-copy">Selected benefits to look for when you continue through the partner platform.</motion.p>
        </motion.div>
        <div className="benefits__banner-wrap">
          <AnimatePresence mode="wait">
            <motion.img
              key={bannerIndex}
              className="benefits__banner"
              src={benefitSlides[bannerIndex]}
              alt=""
              loading="lazy"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
          <div className="benefits__banner-dots">
            {benefitSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`benefits__banner-dot${i === bannerIndex ? " benefits__banner-dot--active" : ""}`}
                onClick={() => setBannerIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <a href="https://www.facebook.com/profile.php?id=100022590198280" target="_blank" rel="noopener noreferrer" className="benefits__facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Follow us on Facebook
          </a>
        </div>
        <div className="benefits__features">
          <div className="benefit-feature">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <strong>24/7</strong> SUPPORT
          </div>
          <div className="benefit-feature">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <strong>FAST</strong> CASH IN / CASH OUT
          </div>
          <div className="benefit-feature">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
            <strong>NO</strong> CASH OUT FEE
          </div>
          <div className="benefit-feature">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <strong>PLAY SMART</strong> WIN BIG
          </div>
        </div>
        <div className="benefits__payments">
          <div className="benefits__payments-inner">
            <h3>AVAILABLE CASH IN METHOD</h3>
            <div className="benefits__payment-logos">
              <span><img src="/images/gcash.jpg" alt="GCash" className="payment-logo" /> GCash</span>
              <span><img src="/images/gotyme.jpg" alt="GOtyme" className="payment-logo" /> GOtyme</span>
              <span><img src="/images/stc.jpg" alt="STC Pay" className="payment-logo" /> STC Pay</span>
              <span><img src="/images/barq.png" alt="Barq" className="payment-logo" /> Barq</span>
            </div>
          </div>
          <table className="payment-table">
            <thead>
              <tr><th>Method</th><th>Min</th><th>Max</th><th>Fee</th><th>Speed</th></tr>
            </thead>
            <tbody>
              <tr><td>GCash</td><td>₱100</td><td>₱100,000</td><td>Free</td><td>Instant</td></tr>
              <tr><td>GOtyme</td><td>₱100</td><td>₱50,000</td><td>Free</td><td>Instant</td></tr>
              <tr><td>STC Pay</td><td>SAR 10</td><td>SAR 50,000</td><td>Free</td><td>Instant</td></tr>
              <tr><td>Barq</td><td>SAR 10</td><td>SAR 50,000</td><td>Free</td><td>Instant</td></tr>
            </tbody>
          </table>
        </div>
        <div className="benefits__tagline"><span>FAST.</span><span>SAFE.</span><span>SECURE.</span></div>
      </section>

      <section className="providers section-shell" id="discover">
        <div className="providers__header">
          <motion.div className="section-intro section-intro--left" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} transition={{ staggerChildren: 0.12 }}>
            <motion.p variants={fadeUp} className="section-kicker"><Play size={15} /> Curated entertainment</motion.p>
            <motion.h2 variants={fadeUp}>Find your <em>table,</em> your tempo.</motion.h2>
          </motion.div>
        </div>
        <motion.div
          className="providers__search"
          initial={{ opacity: 0, y: -10 }}
          animate={contentReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Search size={16} />
          <input
            type="text"
            placeholder="Search games, providers, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="providers__search-clear" type="button" onClick={() => setSearchQuery("")} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </motion.div>
        <div className="provider-rail">
          {showSkeleton ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="provider-card" style={{ pointerEvents: "none" }}>
                <div className="skeleton" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
              </div>
            ))
          ) : filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => <ProviderCard key={provider.name} provider={provider} index={index} />)
          ) : searchQuery ? (
            <div className="providers__empty">
              <p>No results found for &quot;{searchQuery}&quot;</p>
              <p style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.35)" }}>Try searching: Live Casino, Slots, Sports</p>
            </div>
          ) : (
            providers.slice(0, 6).map((provider, index) => <ProviderCard key={provider.name} provider={provider} index={index} />)
          )}
        </div>
      </section>

      <section className="sports section-shell" id="sports">
        <div className="sports-promo">
          <AnimatePresence mode="wait">
            <a href={partnerInviteUrl} target="_blank" rel="noreferrer">
              <motion.img
                key={promoIndex}
                className="sports-promo__slide"
                src={promoSlides[promoIndex]}
                alt=""
                loading="lazy"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </a>
          </AnimatePresence>
          <div className="sports-promo__dots">
            {promoSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`sports-promo__dot${i === promoIndex ? " sports-promo__dot--active" : ""}`}
                onClick={() => setPromoIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="conversion" id="start">
        <div className="conversion__glow" aria-hidden="true" />
        <div className="conversion-grid">
          <motion.div className="conversion__inner" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
            <div className="conversion__badge"><Crown size={15} /> 747LIVE invitation</div>
            <h2>Looking for Players and Sports Lovers!</h2>
            <p>Sali na sa aming exclusive sports community at e-enjoy ang mga member perks:</p>
            <ul className="conversion__perks">
              <li><span className="perk-icon">&#10024;</span> 2% Bonus 1st Cash In</li>
              <li><span className="perk-icon">&#10024;</span> 10% Loss Rebates Twice Monthly</li>
              <li><span className="perk-icon">&#10024;</span> Birthday Bonus Gift</li>
              <li><span className="perk-icon">&#10024;</span> VIP Sports Group Access</li>
              <li><span className="perk-icon">&#10024;</span> Monthly Raffle</li>
            </ul>
            <a className="button button--primary button--large button--final" href={partnerInviteUrl} target="_blank" rel="noreferrer">
              Get started <ExternalLink size={18} />
            </a>
            <small>You'll be redirected to continue your registration through our partner platform.</small>
          </motion.div>
          <div className="conversion-side">
            <a href={facebookUrl} target="_blank" rel="noreferrer">
              <img src="/images/z.jpg" alt="" className="conversion-side__img" loading="lazy" />
            </a>
          </div>
        </div>
      </section>

      <section className="promo-section" id="promo">
        <div className="promo-grid">
          <div className="promo-image">
            <a href={facebookUrl} target="_blank" rel="noreferrer">
              <video src="/images/vid.mp4" className="promo-image__img" autoPlay muted loop playsInline />
            </a>
          </div>
          <motion.div className="promo-content" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
            <h2>10% Cashback / Rebates<br />Free Registration</h2>
            <p>kaya ano pang hinihintay mo MESSAGE na <span className="promo-heart">🫶🏼</span></p>
            <p>Kung nandito ka sa Mid.Est sakto para sayo to<br />Meron din <strong>SPORTS TIPS GC</strong> para sayo.<br />24/7 Löäding GC at customer service</p>
            <p><strong>Message na dito 👉🏼</strong></p>
            <a className="button button--primary button--large" href="https://www.facebook.com/share/1BriKGwHZ2/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
              Message on Facebook <ExternalLink size={18} />
            </a>
            <p className="promo-verified">Legit na legit blue check verified by META kaya safe na safe ka <span role="img" aria-label="wink">😉</span></p>
            <p className="promo-affiliate">Pwede ka din mag apply as Affiliate <span role="img" aria-label="wink">😉</span></p>
          </motion.div>
        </div>
      </section>

      <section className="agent-section" id="agent">
        <div className="agent-section__glow" aria-hidden="true" />
        <div className="agent-section__inner">
          <motion.div
            className="agent-section__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="agent-section__badge">
              <Crown size={14} /> 747 AREA MANAGER
            </div>
            <h2 className="agent-section__name">
              <a href="https://www.facebook.com/Yjnek#" target="_blank" rel="noreferrer">
                Kenj Chua <ExternalLink size={16} />
              </a>
            </h2>
            <p className="agent-section__tagline">
              747 Free Online Betting Site — Free Sports Picks sa baba plus <strong>10% REBATES</strong>
            </p>
          </motion.div>

          <div className="agent-section__cards">
            <motion.a
              className="agent-card"
              href={partnerInviteUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="agent-card__content">
                <div className="agent-card__icon"><img src="/images/a.jpg" alt="Registration" /></div>
                <h3 className="agent-card__title">Registration</h3>
                <p className="agent-card__desc">Click and Message for details</p>
                <span className="agent-card__cta">
                  Register now <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.a>

            <motion.a
              className="agent-card"
              href="https://m.me/j/AbYgP-t5JeYDO3R7/?send_source=gc:copy_invite_link_c"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="agent-card__content">
                <div className="agent-card__icon"><img src="/images/b.jpg" alt="24/7 Loading Gc" /></div>
                <h3 className="agent-card__title">24/7 Loading Gc</h3>
                <p className="agent-card__desc">Click and Message for details</p>
                <span className="agent-card__cta">
                  Join now <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.a>

            <motion.a
              className="agent-card"
              href="https://m.me/j/AbYoJLM_qK2rnSQh/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="agent-card__content">
                <div className="agent-card__icon"><img src="/images/c.jpg" alt="Free Sports GC Tips" /></div>
                <h3 className="agent-card__title">Free Sports GC Tips</h3>
                <p className="agent-card__desc">Click and Message for details</p>
                <span className="agent-card__cta">
                  Join now <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.a>
          </div>
          </div>
        </section>

        <section className="winning-slips" id="faq">
          <div className="winning-slips__inner section-shell">
            <motion.div className="section-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.12 }}>
              <motion.p variants={fadeUp} className="section-kicker"><MessageSquare size={15} /> FAQ</motion.p>
              <motion.h2 variants={fadeUp}>Frequently asked <em>questions</em></motion.h2>
              <motion.p variants={fadeUp} className="section-copy">Quick answers to the most common questions about 747 Live.</motion.p>
            </motion.div>
            <motion.div
              className="faq-list"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {faqData.map((item, i) => (
                <div key={i} className={`faq-item${openFaq === i ? " faq-item--open" : ""}`}>
                  <button className="faq-item__trigger" type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {item.q} <ChevronDown size={16} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        className="faq-item__body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="winning-slips winning-highlight" id="wins">
          <div className="winning-slips__inner section-shell">
            <motion.div
              className="section-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.h2 variants={fadeUp}>
                <em>Winning</em> Slips
              </motion.h2>
              <motion.p className="section-copy" variants={fadeUp}>
                See the latest winning slips from our community members.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="image-gallery-wrap">
                <ImageGallery images={Array.from({ length: 8 }, (_, i) => `/images/slip (${i + 1}).jpg`)} />
              </div>
            </motion.div>
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a className="button button--primary button--large button--pulse" href={partnerInviteUrl} target="_blank" rel="noreferrer">
                Start winning today <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="winning-slips cashout-highlight" id="cashouts">
          <div className="winning-slips__inner section-shell">
            <motion.div
              className="section-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.h2 variants={fadeUp}>
                <em>Cash Out</em> Proof
              </motion.h2>
              <motion.p className="section-copy" variants={fadeUp}>
                Real cash outs from our community members.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="image-gallery-wrap">
                <ImageGallery images={Array.from({ length: 7 }, (_, i) => `/images/win (${i + 1}).jpg`)} />
              </div>
            </motion.div>
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a className="button button--primary button--large button--pulse" href={partnerInviteUrl} target="_blank" rel="noreferrer">
                Get your cash out now <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
        </section>

        <NeoMinimalFooter />

      {/* Chatbot */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="chat-header">
              <div className="chat-header__info">
                <div className="chat-header__avatar"><MessageSquare size={16} /></div>
                <div>
                  <strong>747 Live Assistant</strong>
                  <span className="chat-header__status">Online</span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={18} /></button>
            </div>

            <div className="chat-body">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-bubble chat-bubble--${msg.from}`}>{msg.text}</div>
              ))}
              {typing && <div className="chat-bubble chat-bubble--bot chat-typing"><span className="chat-typing__dot" /><span className="chat-typing__dot" /><span className="chat-typing__dot" /></div>}
              <div ref={chatEndRef} />
            </div>

            {chatMessages.length <= 2 && (
              <div className="chat-quick">
                {quickReplies.map((q) => (
                  <button key={q} className="chat-quick__btn" onClick={() => handleSend(q)}>{q}</button>
                ))}
              </div>
            )}

            <form className="chat-input" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <input
                type="text"
                placeholder="Type your question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" aria-label="Send"><Send size={16} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="chat-fab" onClick={() => { setChatOpen((v) => !v); setUnreadCount(0); }} aria-label="Open chat">
        {chatOpen ? <X size={22} /> : <><MessageSquare size={22} />{unreadCount > 0 && <span className="chat-fab__badge">{unreadCount}</span>}</>}
      </button>


      <a className="sticky-cta" href={partnerInviteUrl} target="_blank" rel="noreferrer">Join now <ArrowUpRight size={18} /></a>

      {!cookieConsent && (
        <div className="cookie-bar">
          <span className="cookie-bar__text">We use cookies to improve your experience. By continuing, you agree to our use of cookies.</span>
          <button className="cookie-bar__btn" type="button" onClick={() => { setCookieConsent(true); localStorage.setItem("cookieConsent", "true"); }}>Accept</button>
        </div>
      )}

      <AnimatePresence>
        {winNotif && (
          <motion.div
            className="win-notif"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="win-notif__icon">
              <Trophy size={16} />
            </div>
            <div className="win-notif__body">
              <strong className="win-notif__name">{winNotif.name}</strong>{' '}
              <span className="win-notif__text">won <strong className="win-notif__amount">{winNotif.amount}</strong> on {winNotif.game}</span>
            </div>
            <button className="win-notif__close" type="button" onClick={() => setWinNotif(null)} aria-label="Dismiss"><X size={12} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >
            <ArrowUpToLine size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adminModalOpen && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAdminModalOpen(false)}
          >
            <motion.div
              className="admin-modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal__icon"><ShieldCheck size={24} /></div>
              <h3 className="admin-modal__title">Admin Access</h3>
              <p className="admin-modal__desc">Sign in with your admin credentials.</p>

              {loginError && <div className="admin-modal__error">{loginError}</div>}

              <div className="admin-modal__field">
                <label><Mail size={14} /> Email</label>
                <input type="email" placeholder="admin@example.com" value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()} />
              </div>
              <div className="admin-modal__field">
                <label><Lock size={14} /> Password</label>
                <input type="password" placeholder="Enter password" value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()} />
              </div>

              <button className="button button--primary button--large" onClick={handleAdminLogin}
                disabled={loginLoading}
                style={{ width: '100%', justifyContent: 'center', opacity: loginLoading ? 0.6 : 1 }}>
                {loginLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <button className="admin-modal__close" type="button" onClick={() => setAdminModalOpen(false)}
                style={{ width: '100%', marginTop: 10, justifyContent: 'center' }}>
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </>
  );
}