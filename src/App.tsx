import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageGallery } from "@/components/ui/image-gallery";
import { NeoMinimalFooter } from "@/components/ui/neo-minimal-footer";
import { AdminLoginModal } from "@/components/ui/admin-login-modal";
import { Header } from "@/components/ui/header-3";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  ArrowUpRight,
  ArrowUpToLine,
  ChevronDown,
  ChevronRight,
  Crown,
  ExternalLink,
  Gift,
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

const DEFAULT_PARTNER_URL = "https://www.messenger.com/j/AbakhHJ975SWCzqw/";
const facebookUrl = "https://m.me/100022590198280";

const heroImage =
  "/images/hero.jpg";

const DEFAULT_PROVIDERS: { name: string; kind: string; asset: string; hue: string; link: string }[] = [
  { name: "Live Sports", kind: "Sports", asset: "/images/provider-live-sports.gif", hue: "#67f79d", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Pre-match", kind: "Sports", asset: "/images/provider-pre-match.gif", hue: "#ec6800", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Live Casino", kind: "Tables", asset: "/images/provider-live-casino.gif", hue: "#5c17a2", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Evolution", kind: "Live tables", asset: "/images/provider-evolution.gif", hue: "#e4b551", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "JILI", kind: "Slots", asset: "/images/provider-jili.gif", hue: "#f83700", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Casino", kind: "Tables", asset: "/images/provider-casino.gif", hue: "#66f89c", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Pragmatic Play", kind: "Slots", asset: "/images/provider-pragmatic-play.gif", hue: "#ef5d2d", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Fachai", kind: "Arcade", asset: "/images/provider-fachai.gif", hue: "#e9bb43", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "CreedRoomz", kind: "Live tables", asset: "/images/provider-creedroomz.gif", hue: "#5d6dff", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Dragon Gaming", kind: "Slots", asset: "/images/provider-dragon-gaming.gif", hue: "#d93723", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "747 News", kind: "Updates", asset: "/images/provider-747-news.gif", hue: "#66f89c", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "747 Hearts", kind: "Tables", asset: "/images/provider-747-hearts.gif", hue: "#f56b9a", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "PopOK", kind: "Arcade", asset: "/images/provider-popok.gif", hue: "#75a9ff", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
  { name: "Amigo", kind: "Games", asset: "/images/provider-amigo.gif", hue: "#f1a343", link: "https://www.messenger.com/j/AbakhHJ975SWCzqw/" },
];

const DEFAULT_PROMO_SLIDES = [
  "/images/promo-1.webp",
  "/images/promo-2.webp",
  "/images/promo-3.webp",
  "/images/promo-4.webp",
  "/images/promo-5.webp",
];

const DEFAULT_BENEFIT_SLIDES = ["/images/ga.jpg", "/images/ge.jpg"];
const DEFAULT_BENEFIT_FEATURES = [
  { strong: "24/7", suffix: "SUPPORT", icon: "clock" },
  { strong: "FAST", suffix: "CASH IN / CASH OUT", icon: "money" },
  { strong: "NO", suffix: "CASH OUT FEE", icon: "check" },
  { strong: "PLAY SMART", suffix: "WIN BIG", icon: "bolt" },
];
const DEFAULT_PAYMENTS = [
  { name: "GCash", logo: "/images/gcash.jpg", min: "P100", max: "P100,000", fee: "Free", speed: "Instant" },
  { name: "GOtyme", logo: "/images/gotyme.jpg", min: "P100", max: "P50,000", fee: "Free", speed: "Instant" },
  { name: "STC Pay", logo: "/images/stc.jpg", min: "SAR 10", max: "SAR 50,000", fee: "Free", speed: "Instant" },
  { name: "Barq", logo: "/images/barq.png", min: "SAR 10", max: "SAR 50,000", fee: "Free", speed: "Instant" },
];
const DEFAULT_PAY_SECTION_TITLE = "AVAILABLE CASH IN METHOD";
const DEFAULT_BENEFITS_TAGLINE = ["FAST.", "SAFE.", "SECURE."];

const DEFAULT_FAQ_DATA = [
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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function ProviderCard({ provider, index, inviteUrl }: { provider: { name: string; kind: string; asset: string; hue: string; link: string }; index: number; inviteUrl: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    setTilt({ x, y });
  }

  const href = provider.link || inviteUrl;

  return (
    <motion.a
      href={href}
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
  const [formOpen, setFormOpen] = useState(false);

  const [cursorGlow, setCursorGlow] = useState({ x: 50, y: 20 });
  const [promoIndex, setPromoIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const [winNotif, setWinNotif] = useState<{ name: string; amount: string; game: string } | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const logoClickRef = useRef(0);
  const logoTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Supabase Auth
  const supabaseRef = useRef<SupabaseClient | null>(null);
  if (!supabaseRef.current) {
    supabaseRef.current = createClient(
      import.meta.env.VITE_SUPABASE_URL || '',
      import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    );
  }
  const supabase = supabaseRef.current;
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  // Hero form fields
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Fetch live config from Supabase (overrides hardcoded defaults)
  const [liveUrl, setLiveUrl] = useState(DEFAULT_PARTNER_URL);
  const [winsImages, setWinsImages] = useState<string[]>(() => Array.from({ length: 8 }, (_, i) => `/images/slip (${i + 1}).jpg`));
  const [cashImages, setCashImages] = useState<string[]>(() => Array.from({ length: 7 }, (_, i) => `/images/win (${i + 1}).jpg`));
  const [winsCtaUrl, setWinsCtaUrl] = useState("");
  const [cashCtaUrl, setCashCtaUrl] = useState("");
  const [winsHeading, setWinsHeading] = useState("Winning Slips");
  const [winsCopy, setWinsCopy] = useState("See the latest winning slips from our community members.");
  const [winsCta, setWinsCta] = useState("Start winning today");
  const [cashHeading, setCashHeading] = useState("Cash Out Proof");
  const [cashCopy, setCashCopy] = useState("Real cash outs from our community members.");
  const [cashCta, setCashCta] = useState("Get your cash out now");
  const [faqKicker, setFaqKicker] = useState("FAQ");
  const [faqHeading, setFaqHeading] = useState("Frequently asked questions");
  const [faqCopy, setFaqCopy] = useState("Quick answers to the most common questions about 747 Live.");
  const [faqData, setFaqData] = useState(DEFAULT_FAQ_DATA);
  const [heroCtaPrimary, setHeroCtaPrimary] = useState("Register through my link");
  const [heroCtaPrimaryUrl, setHeroCtaPrimaryUrl] = useState(DEFAULT_PARTNER_URL);
  const [heroCtaSecondary, setHeroCtaSecondary] = useState("Why join");
  const [heroCtaSecondaryUrl, setHeroCtaSecondaryUrl] = useState("");
  const [heroHeadline, setHeroHeadline] = useState('Play <em>747 LIVE</em> &amp; win real cash.');
  const [heroSubcopy, setHeroSubcopy] = useState('Sign up through my link for a <span class="hero__bonus">Welcome Bonus + Cashback</span>. Casino, live sports, eSports &amp; VIP rewards — Saudi Riyals accepted.');
  const [heroLogoTag, setHeroLogoTag] = useState('Official Agent');
  const [statPlayingNum, setStatPlayingNum] = useState(3163);
  const [statPlayingSuffix, setStatPlayingSuffix] = useState('+');
  const [statPaidNum, setStatPaidNum] = useState(2.4);
  const [statPaidSuffix, setStatPaidSuffix] = useState('B+');
  const [trustBadgeText, setTrustBadgeText] = useState('<strong>Verified Partner</strong> \u2014 100% secure registration');
  const [formTriggerText, setFormTriggerText] = useState('Register Account');
  const [formTriggerNote, setFormTriggerNote] = useState('10% cash back + exclusive GCs');
  const [formSubmitText, setFormSubmitText] = useState('Register now');
  const [formFooterText, setFormFooterText] = useState('<strong>10% CASH BACK</strong> sa total na LOSS BETS twice a month \u2014 plus exclusive access to all GCs!');
  const [benefitSlides, setBenefitSlides] = useState<string[]>(DEFAULT_BENEFIT_SLIDES);
  const [promoSlides, setPromoSlides] = useState<string[]>(DEFAULT_PROMO_SLIDES);
  const [sportsKicker, setSportsKicker] = useState("Sports & Promotions");
  const [sportsCtaUrl, setSportsCtaUrl] = useState("https://www.messenger.com/j/AbakhHJ975SWCzqw/");
  const [benefitFeatures, setBenefitFeatures] = useState(DEFAULT_BENEFIT_FEATURES);
  const [payments, setPayments] = useState(DEFAULT_PAYMENTS);
  const [paySectionTitle, setPaySectionTitle] = useState(DEFAULT_PAY_SECTION_TITLE);
  const [benefitsTagline, setBenefitsTagline] = useState(DEFAULT_BENEFITS_TAGLINE);
  const [benefitsFbText, setBenefitsFbText] = useState("Follow us on Facebook");
  const [benefitsFbUrl, setBenefitsFbUrl] = useState("https://www.facebook.com/profile.php?id=100022590198280");
  const [convBadge, setConvBadge] = useState("747LIVE invitation");
  const [convHeadline, setConvHeadline] = useState("Looking for Players and Sports Lovers!");
  const [convDesc, setConvDesc] = useState("Sali na sa aming exclusive sports community at e-enjoy ang mga member perks:");
  const [convPerks, setConvPerks] = useState(["2% Bonus 1st Cash In", "10% Loss Rebates Twice Monthly", "Birthday Bonus Gift", "VIP Sports Group Access", "Monthly Raffle"]);
  const [convCta, setConvCta] = useState("Get started");
  const [convCtaUrl, setConvCtaUrl] = useState("");
  const [convSidebarImg, setConvSidebarImg] = useState("/images/z.jpg");
  const [convDisclaimer, setConvDisclaimer] = useState("You'll be redirected to continue your registration through our partner platform.");
  const [benefitsKicker, setBenefitsKicker] = useState("Invitation privileges");
  const [benefitsHeading, setBenefitsHeading] = useState('A more rewarding way to <em>step inside.</em>');
  const [benefitsCopy, setBenefitsCopy] = useState("Selected benefits to look for when you continue through the partner platform.");
  const [providers, setProviders] = useState(DEFAULT_PROVIDERS);
  const [provSearchPlaceholder, setProvSearchPlaceholder] = useState("Search games, providers, categories...");
  const [provNoResults, setProvNoResults] = useState("No results found for");
  const [provKicker, setProvKicker] = useState("Curated entertainment");
  const [provHeading, setProvHeading] = useState("Find your <em>table,</em> your tempo.");
  const [promoHeading, setPromoHeading] = useState("10% Cashback / Rebates<br />Free Registration");
  const [promoCopy1, setPromoCopy1] = useState("kaya ano pang hinihintay mo MESSAGE na");
  const [promoCopy2, setPromoCopy2] = useState("Kung nandito ka sa Mid.Est sakto para sayo to<br />Meron din <strong>SPORTS TIPS GC</strong> para sayo.<br />24/7 Lõäding GC at customer service");
  const [promoCtaLead, setPromoCtaLead] = useState("Message na dito 👉🏼");
  const [promoCtaText, setPromoCtaText] = useState("Message on Facebook");
  const [promoVerified, setPromoVerified] = useState("Legit na legit blue check verified by META kaya safe na safe ka");
  const [promoAffiliate, setPromoAffiliate] = useState("Pwede ka din mag apply as Affiliate");
  const [promoVideo, setPromoVideo] = useState("/images/vid.mp4");
  const [promoCtaUrl, setPromoCtaUrl] = useState("https://www.facebook.com/share/1BriKGwHZ2/?mibextid=wwXIfr");
  const [tickerLabel, setTickerLabel] = useState("Now in the lounge");
  const [tickerMessages, setTickerMessages] = useState("TWICE MONTHLY CASHBACK\nSAUDI RIYALS ACCEPTED\n24/7 LIVE SPORTS TIPS\nMONTHLY VIP RAFFLE");
  const [hiwKicker, setHiwKicker] = useState("How it works");
  const [hiwHeading, setHiwHeading] = useState("Get started in <em>3 easy steps</em>");
  const [hiw, setHiw] = useState([
    { enTitle: "Register", tlTitle: "Magrehistro", enDesc: "Click the register button and fill in your details through our partner platform.", tlDesc: "I-click ang register button at punan ang iyong detalye." },
    { enTitle: "Deposit", tlTitle: "Mag-deposito", enDesc: "Choose from GCash, GOtyme, STC Pay, or Barq. No hidden fees, instant processing.", tlDesc: "Pumili ng GCash, GOtyme, STC Pay, o Barq. Walang dagdag na bayad." },
    { enTitle: "Play & Win", tlTitle: "Maglaro at Manalo", enDesc: "Access live casino, sports betting, slots, and arcade games. Start winning today!", tlDesc: "Mag-access sa live casino, sports betting, slots, at arcade games. Manalo na!" }
  ]);
  const [agentBadge, setAgentBadge] = useState("747 AREA MANAGER");
  const [agentName, setAgentName] = useState("Kenj Chua");
  const [agentTagline, setAgentTagline] = useState("747 Free Online Betting Site — Free Sports Picks sa baba plus 10% REBATES");
  const [agentFacebookUrl, setAgentFacebookUrl] = useState("https://www.facebook.com/Yjnek#");
  const [agentCards, setAgentCards] = useState([
    { title: 'Registration', icon: '/images/a.jpg', desc: 'Click and Message for details', cta: 'Register now', link: '' },
    { title: '24/7 Loading Gc', icon: '/images/b.jpg', desc: 'Click and Message for details', cta: 'Join now', link: '' },
    { title: 'Free Sports GC Tips', icon: '/images/c.jpg', desc: 'Click and Message for details', cta: 'Join now', link: '' }
  ]);
  const filteredProviders = providers.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.kind.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/site_config?id=eq.1&select=config`, {
          headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
        });
        if (res.ok) {
          const rows = await res.json();
          const c = rows?.[0]?.config;
          if (c) {
            if (c.partnerInviteUrl) setLiveUrl(c.partnerInviteUrl);
            if (c.siteTitle) document.title = c.siteTitle;
            if (c.heroImage) {
              const el = document.querySelector('.hero__image') as HTMLElement;
              if (el) el.style.backgroundImage = `url(${c.heroImage})`;
            }
            if (c.winsImages && Array.isArray(c.winsImages)) setWinsImages(c.winsImages);
            if (c.cashImages && Array.isArray(c.cashImages)) setCashImages(c.cashImages);
            if (c.winsCtaUrl) setWinsCtaUrl(c.winsCtaUrl);
            if (c.cashCtaUrl) setCashCtaUrl(c.cashCtaUrl);
            if (c.winsHeading) setWinsHeading(c.winsHeading);
            if (c.winsCopy) setWinsCopy(c.winsCopy);
            if (c.winsCta) setWinsCta(c.winsCta);
            if (c.cashHeading) setCashHeading(c.cashHeading);
            if (c.cashCopy) setCashCopy(c.cashCopy);
            if (c.cashCta) setCashCta(c.cashCta);
            if (c.heroCtaPrimary) setHeroCtaPrimary(c.heroCtaPrimary);
            if (c.heroCtaPrimaryUrl) setHeroCtaPrimaryUrl(c.heroCtaPrimaryUrl);
            if (c.heroCtaSecondary) setHeroCtaSecondary(c.heroCtaSecondary);
            if (c.heroCtaSecondaryUrl) setHeroCtaSecondaryUrl(c.heroCtaSecondaryUrl);
            if (c.heroHeadline) setHeroHeadline(c.heroHeadline);
            if (c.heroSubcopy) setHeroSubcopy(c.heroSubcopy);
            if (c.heroLogoTag) setHeroLogoTag(c.heroLogoTag);
            if (c.statPlayingNum) setStatPlayingNum(c.statPlayingNum);
            if (c.statPlayingSuffix) setStatPlayingSuffix(c.statPlayingSuffix);
            if (c.statPaidNum) setStatPaidNum(c.statPaidNum);
            if (c.statPaidSuffix) setStatPaidSuffix(c.statPaidSuffix);
            if (c.trustBadgeText) setTrustBadgeText(c.trustBadgeText);
            if (c.formTriggerText) setFormTriggerText(c.formTriggerText);
            if (c.formTriggerNote) setFormTriggerNote(c.formTriggerNote);
            if (c.formSubmitText) setFormSubmitText(c.formSubmitText);
            if (c.formFooterText) setFormFooterText(c.formFooterText);
            if (c.benefitSlides) {
              const slides = typeof c.benefitSlides === 'string'
                ? c.benefitSlides.split('\n').filter((s: string) => s.trim())
                : Array.isArray(c.benefitSlides) ? c.benefitSlides.filter((s: string) => s && s.trim()) : null;
              if (slides && slides.length > 0) setBenefitSlides(slides);
            }
            if (c.promoSlides && Array.isArray(c.promoSlides) && c.promoSlides.length > 0) setPromoSlides(c.promoSlides);
            if (c.sportsKicker) setSportsKicker(c.sportsKicker);
            if (c.sportsCtaUrl) setSportsCtaUrl(c.sportsCtaUrl);
            if (c.agentBadge) setAgentBadge(c.agentBadge);
            if (c.agentName) setAgentName(c.agentName);
            if (c.agentTagline) setAgentTagline(c.agentTagline);
            if (c.agentFacebookUrl) setAgentFacebookUrl(c.agentFacebookUrl);
            if (c.agentCards && Array.isArray(c.agentCards) && c.agentCards.length > 0) setAgentCards(c.agentCards);
            if (c.benefitFeatures && Array.isArray(c.benefitFeatures) && c.benefitFeatures.length > 0) setBenefitFeatures(c.benefitFeatures);
            if (c.payments && Array.isArray(c.payments) && c.payments.length > 0) setPayments(c.payments);
            if (c.paySectionTitle) setPaySectionTitle(c.paySectionTitle);
            if (c.benefitsTagline) {
              const tagline = typeof c.benefitsTagline === 'string' ? c.benefitsTagline.split(',').map((s: string) => s.trim()) : c.benefitsTagline;
              if (tagline.length > 0) setBenefitsTagline(tagline);
            }
            if (c.benefitsKicker) setBenefitsKicker(c.benefitsKicker);
            if (c.benefitsHeading) setBenefitsHeading(c.benefitsHeading);
            if (c.benefitsCopy) setBenefitsCopy(c.benefitsCopy);
            if (c.benefitsFbText) setBenefitsFbText(c.benefitsFbText);
            if (c.benefitsFbUrl) setBenefitsFbUrl(c.benefitsFbUrl);
            if (c.convBadge) setConvBadge(c.convBadge);
            if (c.convHeadline) setConvHeadline(c.convHeadline);
            if (c.convDesc) setConvDesc(c.convDesc);
            if (c.convPerks) {
              const perks = typeof c.convPerks === 'string' ? c.convPerks.split('\n').filter((s: string) => s.trim()) : Array.isArray(c.convPerks) ? c.convPerks : null;
              if (perks && perks.length > 0) setConvPerks(perks);
            }
            if (c.convCta) setConvCta(c.convCta);
            if (c.convCtaUrl) setConvCtaUrl(c.convCtaUrl);
            if (c.convSidebarImg) setConvSidebarImg(c.convSidebarImg);
            if (c.convDisclaimer) setConvDisclaimer(c.convDisclaimer);
            if (c.faqKicker) setFaqKicker(c.faqKicker);
            if (c.faqHeading) setFaqHeading(c.faqHeading);
            if (c.faqCopy) setFaqCopy(c.faqCopy);
            if (c.faq && Array.isArray(c.faq) && c.faq.length > 0) setFaqData(c.faq);
            if (c.providers && Array.isArray(c.providers) && c.providers.length > 0) setProviders(c.providers);
            if (c.provSearchPlaceholder) setProvSearchPlaceholder(c.provSearchPlaceholder);
            if (c.provNoResults) setProvNoResults(c.provNoResults);
            if (c.provKicker) setProvKicker(c.provKicker);
            if (c.provHeading) setProvHeading(c.provHeading);
            if (c.promoHeading) setPromoHeading(c.promoHeading);
            if (c.promoCopy1) setPromoCopy1(c.promoCopy1);
            if (c.promoCopy2) setPromoCopy2(c.promoCopy2);
            if (c.promoCtaLead) setPromoCtaLead(c.promoCtaLead);
            if (c.promoCtaText) setPromoCtaText(c.promoCtaText);
            if (c.promoVerified) setPromoVerified(c.promoVerified);
            if (c.promoAffiliate) setPromoAffiliate(c.promoAffiliate);
            if (c.promoVideo) setPromoVideo(c.promoVideo);
            if (c.promoCtaUrl) setPromoCtaUrl(c.promoCtaUrl);
            if (c.tickerLabel) setTickerLabel(c.tickerLabel);
            if (c.tickerMessages) setTickerMessages(c.tickerMessages);
            if (c.hiwKicker) setHiwKicker(c.hiwKicker);
            if (c.hiwHeading) setHiwHeading(c.hiwHeading);
            if (c.hiw && Array.isArray(c.hiw) && c.hiw.length > 0) setHiw(c.hiw);
            if (c.winNotifications && Array.isArray(c.winNotifications) && c.winNotifications.length > 0) setWinNotifications(c.winNotifications);
            if (c.notifInterval) setNotifInterval(c.notifInterval);
            if (c.notifDuration) setNotifDuration(c.notifDuration);
          }
        }
      } catch {}
    })();
  }, []);

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

  const handleAdminLogin = useCallback(async () => {
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
    if (error) {
      setLoginLoading(false);
      setLoginError("Invalid email or password");
      return;
    }
    setLoginLoading(false);
    setAdminModalOpen(false);
    window.open("/admin.html", "_blank");
  }, [loginEmail, loginPassword, supabase]);

  const handleCloseModal = useCallback(() => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    setAdminModalOpen(false);
  }, []);

  const handleForgotPassword = useCallback(async () => {
    if (!loginEmail.trim()) {
      setLoginError("Please enter your email first");
      return;
    }
    setLoginError("");
    setLoginLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(loginEmail.trim());
    setLoginLoading(false);
    if (error) {
      setLoginError("Failed to send reset email: " + error.message);
    } else {
      setLoginError("A password reset link has been sent to your email.");
    }
  }, [loginEmail, supabase]);

  const [winNotifications, setWinNotifications] = useState([
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
  ]);
  const [notifInterval, setNotifInterval] = useState(14000);
  const [notifDuration, setNotifDuration] = useState(5000);

  const notifIndexRef = useRef(0);

  useEffect(() => {
    notifIndexRef.current = 0;
    if (winNotifications.length === 0) return;
    const show = () => {
      setWinNotif(winNotifications[notifIndexRef.current]);
      notifIndexRef.current = (notifIndexRef.current + 1) % winNotifications.length;
      setTimeout(() => setWinNotif(null), notifDuration);
    };
    show();
    const interval = setInterval(show, notifInterval);
    return () => clearInterval(interval);
  }, [winNotifications, notifInterval, notifDuration]);

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
  }, [promoSlides.length]);

  useEffect(() => {
    if (benefitSlides.length <= 1) return;
    setBannerIndex(0);
    const interval = window.setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % benefitSlides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [benefitSlides.length]);

  function scrollToSection(id: string) {
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

      <Header liveUrl={liveUrl} activeSection={activeSection} scrollToSection={scrollToSection} onLogoClick={handleLogoClick} lang={lang} onLangChange={setLang} />

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
                <ShieldCheck size={11} /> {heroLogoTag}
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              dangerouslySetInnerHTML={{ __html: heroHeadline }}
            />
            <motion.p
              className="hero__copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.75 }}
              dangerouslySetInnerHTML={{ __html: heroSubcopy }}
            />
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54, duration: 0.7 }}
            >
              <a className="button button--primary button--large button--pulse" href={heroCtaPrimaryUrl || liveUrl} target="_blank" rel="noreferrer">
                {heroCtaPrimary} <ArrowUpRight size={19} />
              </a>
              {heroCtaSecondaryUrl ? (
                <a className="button button--quiet button--large" href={heroCtaSecondaryUrl} target="_blank" rel="noreferrer">
                  {heroCtaSecondary} <ArrowUpRight size={19} />
                </a>
              ) : (
                <button className="button button--quiet button--large" type="button" onClick={() => scrollToSection("benefits")}>
                  {heroCtaSecondary} <ChevronRight size={19} />
                </button>
              )}
            </motion.div>
            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.7 }}
            >
              <div className="hero__stat">
                <strong><CountUp to={statPlayingNum} suffix={statPlayingSuffix} /></strong>
                <small>Playing now</small>
              </div>
              <div className="hero__stat-divider" aria-hidden="true" />
              <div className="hero__stat">
                <strong>₱<CountUp to={statPaidNum} suffix={statPaidSuffix} decimals={1} /></strong>
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
              <span dangerouslySetInnerHTML={{ __html: trustBadgeText }} />
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
                <span>{formTriggerText}</span>
                <ChevronDown size={16} />
              </button>
              <p className="hero__form-trigger-note">{formTriggerNote}</p>
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
            <form className="hero__form-body" onSubmit={async (e) => {
              e.preventDefault();
              const payload = {
                full_name: formName,
                email: formEmail,
                username: formUsername,
                phone: formPhone,
                country: formCountry
              };
              // Save inquiry to Supabase
              try {
                await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/form_inquiries`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
                  },
                  body: JSON.stringify(payload)
                });
              } catch (_) {}
              // Forward to Google Apps Script for email notification
              try {
                const gasUrl = import.meta.env.VITE_GAS_WEBAPP_URL || '';
                if (gasUrl) {
                  await fetch(gasUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'no-cors',
                    body: JSON.stringify(payload)
                  });
                }
              } catch (_) {}
setFormName(""); setFormEmail(""); setFormUsername(""); setFormPhone(""); setFormCountry("");
               setFormSuccess(true);
            }}>
              <label className="hero__form-field">
                <span>Full Name</span>
                <input type="text" placeholder="Juan Dela Cruz" required value={formName} onChange={e => setFormName(e.target.value)} />
              </label>
              <label className="hero__form-field">
                <span>Email Address</span>
                <input type="email" placeholder="juan@email.com" required value={formEmail} onChange={e => setFormEmail(e.target.value)} />
              </label>
              <label className="hero__form-field">
                <span>Desired Username</span>
                <input type="text" placeholder="Choose your username" required value={formUsername} onChange={e => setFormUsername(e.target.value)} />
              </label>
              <label className="hero__form-field">
                <span>Contact Number</span>
                <input type="tel" placeholder="+63 XXX XXX XXXX" required value={formPhone} onChange={e => setFormPhone(e.target.value)} />
              </label>
              <label className="hero__form-field">
                <span>Country</span>
                <select required value={formCountry} onChange={e => setFormCountry(e.target.value)}>
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
                 {formSubmitText} <ArrowUpRight size={18} />
                </button>
                {formSuccess && (
                  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setFormSuccess(false)}>
                    <div style={{ background: "#12121a", border: "1px solid rgba(102,248,156,0.3)", borderRadius: 12, padding: 32, maxWidth: 400, width: "90%", textAlign: "center", boxShadow: "0 0 40px rgba(102,248,156,0.1)" }} onClick={e => e.stopPropagation()}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(102,248,156,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#66f89c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <h3 style={{ color: "#f0f0f0", margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>Registration Submitted</h3>
                      <p style={{ color: "#888", margin: "0 0 8px", fontSize: 13 }}>Your inquiry has been received. Our team will follow up with you shortly via Facebook or email.</p>
                      <p style={{ color: "#66f89c", margin: "0", fontSize: 12 }}>Thank you for registering!</p>
                    </div>
                  </div>
                )}
              </form>
            <div className="hero__form-footer">
              <Gift size={13} /> <span dangerouslySetInnerHTML={{ __html: formFooterText }} />
            </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="hero__bottom-line" aria-hidden="true"><span /></div>
      </section>

      <section className="ticker" aria-label="Latest updates">
        <div className="ticker__label"><Sparkles size={14} /> {tickerLabel}</div>
        <div className="ticker__track" aria-hidden="true">
          <div className="ticker__content">
            {(() => {
              const msgs = tickerMessages.split('\n').filter(Boolean);
              const items = [];
              for (let i = 0; i < 4; i++) {
                for (const msg of msgs) {
                  items.push(<span key={`${i}-${msg}`}>{msg}</span>);
                  items.push(<i key={`${i}-${msg}-dot`} />);
                }
              }
              return items;
            })()}
          </div>
        </div>
      </section>

      <section className="benefits section-shell" id="how-it-works" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <motion.div className="section-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={fadeUp} className="section-kicker"><Play size={16} /> {hiwKicker}</motion.p>
          <motion.h2 variants={fadeUp} dangerouslySetInnerHTML={{ __html: hiwHeading }} />
        </motion.div>
        <div className="steps-grid">
          {hiw.map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-card__num">{i + 1}</div>
              <h3>{lang === "en" ? step.enTitle : step.tlTitle}</h3>
              <p>{lang === "en" ? step.enDesc : step.tlDesc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="benefits section-shell" id="benefits">
        <motion.div className="section-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={fadeUp} className="section-kicker"><Crown size={16} /> {benefitsKicker}</motion.p>
          <motion.h2 variants={fadeUp} dangerouslySetInnerHTML={{ __html: benefitsHeading }} />
          <motion.p variants={fadeUp} className="section-copy">{benefitsCopy}</motion.p>
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
          <a href={benefitsFbUrl} target="_blank" rel="noopener noreferrer" className="benefits__facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            {benefitsFbText}
          </a>
        </div>
        <div className="benefits__features">
          {benefitFeatures.map((f, i) => (
            <div key={i} className="benefit-feature">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <strong>{f.strong}</strong> {f.suffix}
            </div>
          ))}
        </div>
        <div className="benefits__payments">
          <div className="benefits__payments-inner">
            <h3>{paySectionTitle}</h3>
            <div className="benefits__payment-logos">
              {payments.map((p, i) => (
                <span key={i}><img src={p.logo} alt={p.name} className="payment-logo" /> {p.name}</span>
              ))}
            </div>
          </div>
          <table className="payment-table">
            <thead>
              <tr><th>Method</th><th>Min</th><th>Max</th><th>Fee</th><th>Speed</th></tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={i}><td>{p.name}</td><td>{p.min}</td><td>{p.max}</td><td>{p.fee}</td><td>{p.speed}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="benefits__tagline">{benefitsTagline.map((t, i) => <span key={i}>{t}</span>)}</div>
      </section>

      <section className="providers section-shell" id="discover">
        <div className="providers__header">
          <motion.div className="section-intro section-intro--left" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} transition={{ staggerChildren: 0.12 }}>
            <motion.p variants={fadeUp} className="section-kicker"><Play size={15} /> {provKicker}</motion.p>
            <motion.h2 variants={fadeUp} dangerouslySetInnerHTML={{ __html: provHeading }} />
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
            placeholder={provSearchPlaceholder}
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
            filteredProviders.map((provider, index) => <ProviderCard key={provider.name} provider={provider} index={index} inviteUrl={liveUrl} />)
          ) : searchQuery ? (
            <div className="providers__empty">
              <p>{provNoResults} &quot;{searchQuery}&quot;</p>
              <p style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.35)" }}>Try searching: Live Casino, Slots, Sports</p>
            </div>
          ) : (
            providers.slice(0, 6).map((provider, index) => <ProviderCard key={provider.name} provider={provider} index={index} inviteUrl={liveUrl} />)
          )}
        </div>
      </section>

      <section className="sports section-shell" id="sports">
        <motion.div className="section-intro section-intro--left" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} transition={{ staggerChildren: 0.12 }}>
          <motion.span className="section-kicker" variants={fadeUp}>{sportsKicker}</motion.span>
        </motion.div>
        <div className="sports-promo">
          <AnimatePresence mode="wait">
            <a href={sportsCtaUrl} target="_blank" rel="noreferrer">
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
            <div className="conversion__badge"><Crown size={15} /> {convBadge}</div>
            <h2>{convHeadline}</h2>
            <p>{convDesc}</p>
            <ul className="conversion__perks">
              {convPerks.map((perk, i) => (
                <li key={i}><span className="perk-icon">&#10024;</span> {perk}</li>
              ))}
            </ul>
            <a className="button button--primary button--large button--final" href={convCtaUrl || liveUrl} target="_blank" rel="noreferrer">
              {convCta} <ExternalLink size={18} />
            </a>
            <small>{convDisclaimer}</small>
          </motion.div>
          <div className="conversion-side">
            <a href={facebookUrl} target="_blank" rel="noreferrer">
              <img src={convSidebarImg} alt="" className="conversion-side__img" loading="lazy" />
            </a>
          </div>
        </div>
      </section>

      <section className="promo-section" id="promo">
        <div className="promo-grid">
          <div className="promo-image">
            <a href={promoCtaUrl} target="_blank" rel="noreferrer" style={{ display: 'flex' }}>
              {/\.(mp4|webm|ogg|mov|avi)$/i.test(promoVideo) ? (
                <video src={promoVideo} className="promo-image__img" autoPlay muted loop playsInline />
              ) : (
                <img src={promoVideo} className="promo-image__img" alt="" />
              )}
            </a>
          </div>
          <motion.div className="promo-content" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
            <h2 dangerouslySetInnerHTML={{ __html: promoHeading }} />
            <p>{promoCopy1} <span className="promo-heart">🫶🏼</span></p>
            <p dangerouslySetInnerHTML={{ __html: promoCopy2 }} />
            <p><strong>{promoCtaLead}</strong></p>
            <a className="button button--primary button--large" href={promoCtaUrl} target="_blank" rel="noreferrer">
              {promoCtaText} <ExternalLink size={18} />
            </a>
            <p className="promo-verified">{promoVerified} <span role="img" aria-label="wink">😉</span></p>
            <p className="promo-affiliate">{promoAffiliate} <span role="img" aria-label="wink">😉</span></p>
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
              <Crown size={14} /> {agentBadge}
            </div>
            <h2 className="agent-section__name">
              <a href={agentFacebookUrl} target="_blank" rel="noreferrer">
                {agentName} <ExternalLink size={16} />
              </a>
            </h2>
            <p className="agent-section__tagline" dangerouslySetInnerHTML={{ __html: agentTagline }} />
          </motion.div>

          <div className="agent-section__cards">
            {agentCards.map((card, i) => (
              <motion.a
                key={i}
                className="agent-card"
                href={card.link || liveUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1 * (i + 1), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="agent-card__content">
                  <div className="agent-card__icon"><img src={card.icon} alt={card.title} /></div>
                  <h3 className="agent-card__title">{card.title}</h3>
                  <p className="agent-card__desc">{card.desc}</p>
                  <span className="agent-card__cta">
                    {card.cta} <ArrowUpRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

        <section className="winning-slips" id="faq">
          <div className="winning-slips__inner section-shell">
            <motion.div className="section-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.12 }}>
              <motion.p variants={fadeUp} className="section-kicker"><MessageSquare size={15} /> {faqKicker}</motion.p>
              <motion.h2 variants={fadeUp} dangerouslySetInnerHTML={{ __html: faqHeading }} />
              <motion.p variants={fadeUp} className="section-copy">{faqCopy}</motion.p>
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
                {winsHeading}
              </motion.h2>
              <motion.p className="section-copy" variants={fadeUp}>
                {winsCopy}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="image-gallery-wrap">
                <ImageGallery images={winsImages} />
              </div>
            </motion.div>
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a className="button button--primary button--large button--pulse" href={winsCtaUrl || liveUrl} target="_blank" rel="noreferrer">
                {winsCta} <ArrowUpRight size={18} />
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
                {cashHeading}
              </motion.h2>
              <motion.p className="section-copy" variants={fadeUp}>
                {cashCopy}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="image-gallery-wrap">
                <ImageGallery images={cashImages} />
              </div>
            </motion.div>
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a className="button button--primary button--large button--pulse" href={cashCtaUrl || liveUrl} target="_blank" rel="noreferrer">
                {cashCta} <ArrowUpRight size={18} />
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


      <a className="sticky-cta" href={liveUrl} target="_blank" rel="noreferrer">Join now <ArrowUpRight size={18} /></a>

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

      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={handleCloseModal}
        loginEmail={loginEmail}
        loginPassword={loginPassword}
        loginError={loginError}
        loginLoading={loginLoading}
        showPassword={showPassword}
        onLoginEmailChange={setLoginEmail}
        onLoginPasswordChange={setLoginPassword}
        onShowPasswordChange={setShowPassword}
        onLogin={handleAdminLogin}
        onForgotPassword={handleForgotPassword}
      />
    </main>
    </>
  );
}