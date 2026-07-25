-- =============================================================================
-- 747 LIVE CASINO - Complete Admin Database Schema
-- PostgreSQL / Supabase compatible
-- =============================================================================

-- ==================== ADMIN CREDENTIALS ====================
-- Single-row table enforced by CHECK(id=1).
-- Username/password editable from the admin dashboard General Settings tab.
CREATE TABLE admin_credentials (
  id                INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  email             TEXT NOT NULL DEFAULT 'admin@747live.com',
  password          TEXT NOT NULL DEFAULT 'admin123',
  recovery_question TEXT NOT NULL DEFAULT '',
  recovery_answer   TEXT NOT NULL DEFAULT '',
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- ==================== SITE CONFIG (single JSON blob for the live website) ====================
CREATE TABLE site_config (
  id        INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  config    JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== BRANDING ====================
CREATE TABLE branding (
  id          INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_title  TEXT NOT NULL DEFAULT '747 Free Online Betting Site',
  favicon_path TEXT NOT NULL DEFAULT '/favicon.png',
  logo_path   TEXT NOT NULL DEFAULT '/images/logo.jpg',
  hero_image  TEXT NOT NULL DEFAULT '/images/hero.jpg',
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ==================== EXTERNAL LINKS ====================
CREATE TABLE external_links (
  id                   INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  partner_invite_url   TEXT NOT NULL DEFAULT '',
  facebook_url         TEXT NOT NULL DEFAULT '',
  agent_facebook_url   TEXT NOT NULL DEFAULT '',
  alt_facebook_url     TEXT NOT NULL DEFAULT '',
  messenger_loading_gc TEXT NOT NULL DEFAULT '',
  messenger_sports_tips TEXT NOT NULL DEFAULT '',
  updated_at           TIMESTAMPTZ DEFAULT now()
);

-- ==================== HERO SECTION ====================
CREATE TABLE hero_section (
  id                INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  headline          TEXT NOT NULL DEFAULT 'Play <em>747 LIVE</em> &amp; win real cash.',
  subcopy           TEXT NOT NULL DEFAULT '',
  logo_tag          TEXT NOT NULL DEFAULT 'Official Agent',
  cta_primary       TEXT NOT NULL DEFAULT 'Register through my link',
  cta_secondary     TEXT NOT NULL DEFAULT 'Why join',
  stat_playing_num  INTEGER DEFAULT 3163,
  stat_playing_suffix TEXT DEFAULT '+',
  stat_paid_num     NUMERIC(10,1) DEFAULT 2.4,
  stat_paid_suffix  TEXT DEFAULT 'B+',
  trust_badge_text  TEXT DEFAULT 'Verified Partner — 100% secure registration',
  form_trigger_text TEXT DEFAULT 'Register Account',
  form_trigger_note TEXT DEFAULT '10% cash back + exclusive GCs',
  form_submit_text  TEXT DEFAULT 'Register now',
  form_footer_text  TEXT DEFAULT '10% CASH BACK sa total na LOSS BETS twice a month — plus exclusive access to all GCs!',
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- ==================== NAVIGATION ====================
CREATE TABLE navigation (
  id                  INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  desktop_nav_items   TEXT NOT NULL DEFAULT 'Benefits, Discover, Sports, Promo',
  mobile_nav_items    TEXT NOT NULL DEFAULT 'Benefits, Discover, Sports, Why 747LIVE, ext:Facebook',
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ==================== TICKER BAR ====================
CREATE TABLE ticker_bar (
  id          INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  label       TEXT NOT NULL DEFAULT 'Now in the lounge',
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ticker_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message    TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== HOW IT WORKS ====================
CREATE TABLE how_it_works_config (
  id         INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  kicker     TEXT NOT NULL DEFAULT 'How it works',
  heading    TEXT NOT NULL DEFAULT 'Get started in <em>3 easy steps</em>',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE how_it_works_steps (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_order INTEGER NOT NULL CHECK (step_order BETWEEN 1 AND 3),
  en_title   TEXT NOT NULL DEFAULT '',
  tl_title   TEXT NOT NULL DEFAULT '',
  en_desc    TEXT NOT NULL DEFAULT '',
  tl_desc    TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== BENEFITS ====================
CREATE TABLE benefits_config (
  id                INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  kicker            TEXT NOT NULL DEFAULT 'Invitation privileges',
  heading           TEXT NOT NULL DEFAULT 'A more rewarding way to <em>step inside.</em>',
  copy              TEXT NOT NULL DEFAULT '',
  pay_section_title TEXT NOT NULL DEFAULT 'AVAILABLE CASH IN METHOD',
  tagline           TEXT NOT NULL DEFAULT 'FAST., SAFE., SECURE.',
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE benefit_slides (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE benefit_features (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strong     TEXT NOT NULL DEFAULT '',
  suffix     TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE payment_methods (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL DEFAULT '',
  logo_path  TEXT NOT NULL DEFAULT '',
  min_amount TEXT NOT NULL DEFAULT '',
  max_amount TEXT NOT NULL DEFAULT '',
  fee        TEXT NOT NULL DEFAULT 'Free',
  speed      TEXT NOT NULL DEFAULT 'Instant',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== PROVIDERS ====================
CREATE TABLE providers_config (
  id                  INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  search_placeholder  TEXT NOT NULL DEFAULT 'Search games, providers, categories...',
  no_results_text     TEXT NOT NULL DEFAULT 'No results found for',
  kicker              TEXT NOT NULL DEFAULT 'Curated entertainment',
  heading             TEXT NOT NULL DEFAULT 'Find your <em>table,</em> your tempo.',
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE providers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL DEFAULT '',
  kind       TEXT NOT NULL DEFAULT '',
  asset_path TEXT NOT NULL DEFAULT '',
  hue_color  TEXT NOT NULL DEFAULT '#66f89c',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== PROMO SLIDES ====================
CREATE TABLE promo_slides_config (
  id          INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  sports_kicker TEXT NOT NULL DEFAULT 'Sports & Promotions',
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE promo_slides (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== CONVERSION SECTION ====================
CREATE TABLE conversion_section (
  id             INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  badge          TEXT NOT NULL DEFAULT '747LIVE invitation',
  headline       TEXT NOT NULL DEFAULT 'Looking for Players and Sports Lovers!',
  description    TEXT NOT NULL DEFAULT '',
  perks          TEXT NOT NULL DEFAULT '',
  cta_button     TEXT NOT NULL DEFAULT 'Get started',
  sidebar_image  TEXT NOT NULL DEFAULT '/images/z.jpg',
  disclaimer     TEXT NOT NULL DEFAULT '',
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- ==================== PROMO SECTION ====================
CREATE TABLE promo_section (
  id              INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  heading         TEXT NOT NULL DEFAULT '10% Cashback / Rebates\nFree Registration',
  copy_line1      TEXT NOT NULL DEFAULT '',
  copy_line2      TEXT NOT NULL DEFAULT '',
  cta_leadin      TEXT NOT NULL DEFAULT 'Message na dito 👉🏼',
  cta_text        TEXT NOT NULL DEFAULT 'Message on Facebook',
  verified_text   TEXT NOT NULL DEFAULT '',
  affiliate_text  TEXT NOT NULL DEFAULT '',
  video_path      TEXT NOT NULL DEFAULT '/images/vid.mp4',
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ==================== AGENT SECTION ====================
CREATE TABLE agent_section (
  id         INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  badge      TEXT NOT NULL DEFAULT '747 AREA MANAGER',
  name       TEXT NOT NULL DEFAULT 'Kenj Chua',
  tagline    TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE agent_cards (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL DEFAULT '',
  icon_path  TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  cta_text   TEXT NOT NULL DEFAULT '',
  link_url   TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== FAQ ====================
CREATE TABLE faq_config (
  id         INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  kicker     TEXT NOT NULL DEFAULT 'FAQ',
  heading    TEXT NOT NULL DEFAULT 'Frequently asked <em>questions</em>',
  copy       TEXT NOT NULL DEFAULT 'Quick answers to the most common questions about 747 Live.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE faq (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question   TEXT NOT NULL DEFAULT '',
  answer     TEXT NOT NULL DEFAULT '',
  keywords   TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== GALLERIES ====================
CREATE TABLE galleries_config (
  id            INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  wins_heading  TEXT NOT NULL DEFAULT 'Winning Slips',
  wins_count    INTEGER DEFAULT 8,
  wins_copy     TEXT NOT NULL DEFAULT '',
  wins_cta      TEXT NOT NULL DEFAULT 'Start winning today',
  cash_heading  TEXT NOT NULL DEFAULT 'Cash Out Proof',
  cash_count    INTEGER DEFAULT 7,
  cash_copy     TEXT NOT NULL DEFAULT '',
  cash_cta      TEXT NOT NULL DEFAULT 'Get your cash out now',
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ==================== CHATBOT ====================
CREATE TABLE chatbot_config (
  id               INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  bot_name         TEXT NOT NULL DEFAULT '747 Live Assistant',
  status           TEXT NOT NULL DEFAULT 'Online',
  welcome_message  TEXT NOT NULL DEFAULT '',
  fallback_reply   TEXT NOT NULL DEFAULT '',
  input_placeholder TEXT NOT NULL DEFAULT 'Type your question...',
  quick_replies    TEXT NOT NULL DEFAULT '',
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ==================== WIN NOTIFICATIONS ====================
CREATE TABLE win_notifications_config (
  id               INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  show_interval_ms  INTEGER DEFAULT 14000,
  display_duration_ms INTEGER DEFAULT 5000,
  updated_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE win_notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL DEFAULT '',
  amount     TEXT NOT NULL DEFAULT '',
  game       TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== FOOTER ====================
CREATE TABLE footer_config (
  id                INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  brand_text        TEXT NOT NULL DEFAULT '747 LIVE',
  description       TEXT NOT NULL DEFAULT '',
  email_placeholder TEXT NOT NULL DEFAULT 'Enter your email...',
  footer_mark       TEXT NOT NULL DEFAULT '// 747 FREE ONLINE BETTING SITE',
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- ==================== SPLASH / MISC ====================
CREATE TABLE splash_config (
  id              INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  tagline         TEXT NOT NULL DEFAULT '747 Free Online Betting Site',
  duration_ms     INTEGER DEFAULT 2800,
  content_ready_ms INTEGER DEFAULT 3400,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cookie_consent_config (
  id            INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  bar_text      TEXT NOT NULL DEFAULT 'We use cookies to improve your experience. By continuing, you agree to our use of cookies.',
  accept_button TEXT NOT NULL DEFAULT 'Accept',
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE sticky_cta_config (
  id      INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  text    TEXT NOT NULL DEFAULT 'Join now',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX idx_ticker_messages_sort ON ticker_messages(sort_order);
CREATE INDEX idx_how_it_works_steps_order ON how_it_works_steps(step_order);
CREATE INDEX idx_benefit_slides_sort ON benefit_slides(sort_order);
CREATE INDEX idx_benefit_features_sort ON benefit_features(sort_order);
CREATE INDEX idx_payment_methods_sort ON payment_methods(sort_order);
CREATE INDEX idx_providers_sort ON providers(sort_order);
CREATE INDEX idx_promo_slides_sort ON promo_slides(sort_order);
CREATE INDEX idx_agent_cards_sort ON agent_cards(sort_order);
CREATE INDEX idx_faq_sort ON faq(sort_order);
CREATE INDEX idx_win_notifications_sort ON win_notifications(sort_order);

-- =============================================================================
-- DEFAULT DATA SEEDS
-- =============================================================================

-- Default admin credentials (password: admin123)
-- Change these from the admin dashboard General Settings tab.
INSERT INTO admin_credentials (email, password, recovery_question, recovery_answer)
VALUES ('admin@747live.com', 'admin123', 'What is your favorite color?', 'blue');

-- Site config (JSON blob with all website content)
INSERT INTO site_config (id, config) VALUES (1, '{
  "siteTitle": "747 Free Online Betting Site",
  "faviconPath": "/favicon.png",
  "logoPath": "/images/logo.jpg",
  "heroImage": "/images/hero.jpg",
  "partnerInviteUrl": "https://www.messenger.com/j/AbakhHJ975SWCzqw/",
  "facebookUrl": "https://m.me/100022590198280",
  "agentFacebookUrl": "https://www.facebook.com/Yjnek#",
  "altFacebookUrl": "https://www.facebook.com/share/1BriKGwHZ2/?mibextid=wwXIfr",
  "messengerLoadingGc": "https://m.me/j/AbYgP-t5JeYDO3R7/?send_source=gc:copy_invite_link_c",
  "messengerSportsTips": "https://m.me/j/AbYoJLM_qK2rnSQh/",
  "heroHeadline": "Play <em>747 LIVE</em> &amp; win real cash.",
  "heroSubcopy": "Sign up through my link for a Welcome Bonus + Cashback. Casino, live sports, eSports & VIP rewards \\u2014 Saudi Riyals accepted.",
  "heroLogoTag": "Official Agent",
  "heroCtaPrimary": "Register through my link",
  "heroCtaSecondary": "Why join",
  "statPlayingNum": 3163,
  "statPlayingSuffix": "+",
  "statPaidNum": 2.4,
  "statPaidSuffix": "B+",
  "trustBadgeText": "Verified Partner \\u2014 100% secure registration",
  "formTriggerText": "Register Account",
  "formTriggerNote": "10% cash back + exclusive GCs",
  "formSubmitText": "Register now",
  "formFooterText": "10% CASH BACK sa total na LOSS BETS twice a month \\u2014 plus exclusive access to all GCs!",
  "desktopNavItems": "Benefits, Discover, Sports, Promo",
  "mobileNavItems": "Benefits, Discover, Sports, Why 747LIVE, ext:Facebook",
  "tickerLabel": "Now in the lounge",
  "tickerMessages": "TWICE MONTHLY CASHBACK\nSAUDI RIYALS ACCEPTED\n24/7 LIVE SPORTS TIPS\nMONTHLY VIP RAFFLE",
  "hiwKicker": "How it works",
  "hiwHeading": "Get started in <em>3 easy steps</em>",
  "hiw": [
    {"enTitle":"Register","tlTitle":"Magrehistro","enDesc":"Click the register button and fill in your details through our partner platform.","tlDesc":"I-click ang register button at punan ang iyong detalye."},
    {"enTitle":"Deposit","tlTitle":"Mag-deposito","enDesc":"Choose from GCash, GOtyme, STC Pay, or Barq. No hidden fees, instant processing.","tlDesc":"Pumili ng GCash, GOtyme, STC Pay, o Barq. Walang dagdag na bayad."},
    {"enTitle":"Play & Win","tlTitle":"Maglaro at Manalo","enDesc":"Access live casino, sports betting, slots, and arcade games. Start winning today!","tlDesc":"Mag-access sa live casino, sports betting, slots, at arcade games. Manalo na!"}
  ],
  "benefitsKicker": "Invitation privileges",
  "benefitsHeading": "A more rewarding way to <em>step inside.</em>",
  "benefitsCopy": "Selected benefits to look for when you continue through the partner platform.",
  "benefitSlides": "/images/ga.jpg\n/images/ge.jpg",
  "benefitFeatures": [
    {"strong":"24/7","suffix":"SUPPORT"},
    {"strong":"FAST","suffix":"CASH IN / CASH OUT"},
    {"strong":"NO","suffix":"CASH OUT FEE"},
    {"strong":"PLAY SMART","suffix":"WIN BIG"}
  ],
  "paySectionTitle": "AVAILABLE CASH IN METHOD",
  "payments": [
    {"name":"GCash","logo":"/images/gcash.jpg","min":"P100","max":"P100,000","fee":"Free","speed":"Instant"},
    {"name":"GOtyme","logo":"/images/gotyme.jpg","min":"P100","max":"P50,000","fee":"Free","speed":"Instant"},
    {"name":"STC Pay","logo":"/images/stc.jpg","min":"SAR 10","max":"SAR 50,000","fee":"Free","speed":"Instant"},
    {"name":"Barq","logo":"/images/barq.png","min":"SAR 10","max":"SAR 50,000","fee":"Free","speed":"Instant"}
  ],
  "benefitsTagline": "FAST., SAFE., SECURE.",
  "provSearchPlaceholder": "Search games, providers, categories...",
  "provNoResults": "No results found for",
  "provKicker": "Curated entertainment",
  "provHeading": "Find your <em>table,</em> your tempo.",
  "providers": [
    {"name":"Live Sports","kind":"Sports","asset":"/images/provider-live-sports.gif","hue":"#67f79d"},
    {"name":"Pre-match","kind":"Sports","asset":"/images/provider-pre-match.gif","hue":"#ec6800"},
    {"name":"Live Casino","kind":"Tables","asset":"/images/provider-live-casino.gif","hue":"#5c17a2"},
    {"name":"Evolution","kind":"Live tables","asset":"/images/provider-evolution.gif","hue":"#e4b551"},
    {"name":"JILI","kind":"Slots","asset":"/images/provider-jili.gif","hue":"#f83700"},
    {"name":"Casino","kind":"Tables","asset":"/images/provider-casino.gif","hue":"#66f89c"},
    {"name":"Pragmatic Play","kind":"Slots","asset":"/images/provider-pragmatic-play.gif","hue":"#ef5d2d"},
    {"name":"Fachai","kind":"Arcade","asset":"/images/provider-fachai.gif","hue":"#e9bb43"},
    {"name":"CreedRoomz","kind":"Live tables","asset":"/images/provider-creedroomz.gif","hue":"#5d6dff"},
    {"name":"Dragon Gaming","kind":"Slots","asset":"/images/provider-dragon-gaming.gif","hue":"#d93723"},
    {"name":"747 News","kind":"Updates","asset":"/images/provider-747-news.gif","hue":"#66f89c"},
    {"name":"747 Hearts","kind":"Tables","asset":"/images/provider-747-hearts.gif","hue":"#f56b9a"},
    {"name":"PopOK","kind":"Arcade","asset":"/images/provider-popok.gif","hue":"#75a9ff"},
    {"name":"Amigo","kind":"Games","asset":"/images/provider-amigo.gif","hue":"#f1a343"}
  ],
  "promoSlides": ["/images/promo-1.webp","/images/promo-2.webp","/images/promo-3.webp","/images/promo-4.webp","/images/promo-5.webp"],
  "sportsKicker": "Sports & Promotions",
  "convBadge": "747LIVE invitation",
  "convHeadline": "Looking for Players and Sports Lovers!",
  "convDesc": "Sali na sa aming exclusive sports community at e-enjoy ang mga member perks:",
  "convPerks": "2% Bonus 1st Cash In\n10% Loss Rebates Twice Monthly\nBirthday Bonus Gift\nVIP Sports Group Access\nMonthly Raffle",
  "convCta": "Get started",
  "convSidebarImg": "/images/z.jpg",
  "convDisclaimer": "You''ll be redirected to continue your registration through our partner platform.",
  "promoHeading": "10% Cashback / Rebates\nFree Registration",
  "promoCopy1": "kaya ano pang hinihintay mo MESSAGE na \\ud83d\\udd0d\\ud83c\\udf76\\ufe0f",
  "promoCopy2": "Kung nandito ka sa Mid.Est sakto para sayo to\nMeron din SPORTS TIPS GC para sayo.\n24/7 Loading GC at customer service",
  "promoCtaLead": "Message na dito \\ud83d\\udc49\\ud83c\\udffc\\ufe0f",
  "promoCtaText": "Message on Facebook",
  "promoVerified": "Legit na legit blue check verified by META kaya safe na safe ka \\ud83d\\ude09",
  "promoAffiliate": "Pwede ka din mag apply as Affiliate \\ud83d\\ude09",
  "promoVideo": "/images/vid.mp4",
  "agentBadge": "747 AREA MANAGER",
  "agentName": "Kenj Chua",
  "agentTagline": "747 Free Online Betting Site \\u2014 Free Sports Picks sa baba plus 10% REBATES",
  "agentCards": [
    {"title":"Registration","icon":"/images/a.jpg","desc":"Click and Message for details","cta":"Register now","link":""},
    {"title":"24/7 Loading Gc","icon":"/images/b.jpg","desc":"Click and Message for details","cta":"Join now","link":""},
    {"title":"Free Sports GC Tips","icon":"/images/c.jpg","desc":"Click and Message for details","cta":"Join now","link":""}
  ],
  "faqKicker": "FAQ",
  "faqHeading": "Frequently asked <em>questions</em>",
  "faqCopy": "Quick answers to the most common questions about 747 Live.",
  "faq": [
    {"q":"What is 747 Live?","a":"Ang 747 Live ay isang premium gaming platform na may live casino, sports betting, at arcade games. Ito ay independent invitation portal para ma-access mo ang platform.","keywords":"what is, 747 live, about, platform"},
    {"q":"How do I register?","a":"Click lang ang \\\"Register now\\\" button sa page na ito. Ire-redirect ka sa official partner platform para matapos ang registration mo.","keywords":"register, sign up, join, create account, how to"},
    {"q":"Is there a welcome bonus?","a":"Oo naman! Kapag nag-register ka through our partner link, may exclusive welcome bonuses, cashback, at promotions na \\u00e0wait sa''yo.","keywords":"bonus, welcome, promo, cashback, rebate"},
    {"q":"What games are available?","a":"Marami kang pagpipilian \\u2014 live dealer tables tulad ng baccarat, blackjack, roulette, sports betting, arcade games, at slot experiences mula sa top providers.","keywords":"game, slot, casino, sports, bet, play, available"},
    {"q":"Is this the official site?","a":"Hindi po. Independent promotional website lang ito \\u2014 hindi kami ang operator ng gaming platform. Ang registration ay sa official partner link namin dumadaan.","keywords":"official, real, legit, legitimate, scam"},
    {"q":"Is it safe?","a":"Ang partner platform ay gumagamit ng industry-standard security. Laging magsugal nang responsable at siguraduhing 18 years old ka pataas.","keywords":"safe, secure, security, trust, reliable"},
    {"q":"What payment methods are accepted?","a":"Tumatanggap kami ng GCash, GOtyme, STC Pay, at Barq. Mabilis ang cash in at cash out \\u2014 walang hidden fees.","keywords":"payment, cash in, deposit, gcash, barq, stc, gotyme"},
    {"q":"What VIP perks are available?","a":"May 2% bonus sa first cash in, 10% loss rebates dalawang beses sa isang buwan, birthday bonus, VIP sports group access, at monthly raffle ang mga members.","keywords":"vip, raffle, member, perks, privilege"},
    {"q":"Who can play?","a":"Dapat 18 years old or pataas para gumamit ng platform na ito. Lage naming pino-promote ang responsible gaming.","keywords":"age, 18, minor, legal"},
    {"q":"How do I contact support?","a":"Pwede mo kaming i-message directly sa Facebook \\u2014 24/7 ang support namin.","keywords":"contact, support, help, customer, message, facebook"}
  ],
  "winsHeading": "Winning Slips",
  "winsCount": 8,
  "winsCopy": "See the latest winning slips from our community members.",
  "winsCta": "Start winning today",
  "cashHeading": "Cash Out Proof",
  "cashCount": 7,
  "cashCopy": "Real cash outs from our community members.",
  "cashCta": "Get your cash out now",
  "botName": "747 Live Assistant",
  "botStatus": "Online",
  "botWelcome": "Hi! I''m the 747 Live smart assistant. Ask me anything about registration, bonuses, games, or promotions!",
  "botFallback": "Thanks for your question! For detailed assistance, you can message me directly on Facebook or register through the platform. Is there anything else I can help with?",
  "botPlaceholder": "Type your question...",
  "botQuickReplies": "What is 747 Live?\nHow do I register?\nWhat games are available?\nWhat payment methods are accepted?",
  "winNotifications": [
    {"name":"John D.","amount":"P25,000","game":"Live Casino"},
    {"name":"Maria S.","amount":"P12,400","game":"JILI Slots"},
    {"name":"Ahmed R.","amount":"SAR 3,200","game":"Sports Betting"},
    {"name":"Ken J.","amount":"P48,700","game":"Evolution"},
    {"name":"Sarah L.","amount":"P8,900","game":"Pragmatic Play"},
    {"name":"Omar K.","amount":"SAR 5,500","game":"Live Casino"},
    {"name":"Carlos M.","amount":"P32,100","game":"Fachai Arcade"},
    {"name":"Fatima Z.","amount":"SAR 8,000","game":"CreedRoomz"},
    {"name":"Mike T.","amount":"P15,600","game":"Sports Betting"},
    {"name":"Rosa P.","amount":"P22,300","game":"Dragon Gaming"}
  ],
  "notifInterval": 14000,
  "notifDuration": 5000,
  "footerBrand": "747 LIVE",
  "footerDesc": "Independent invitation portal for an elevated partner gaming experience. Casino, live sports, eSports & VIP rewards.",
  "footerEmailPlaceholder": "Enter your email...",
  "footerMark": "// 747 FREE ONLINE BETTING SITE",
  "splashTagline": "747 Free Online Betting Site",
  "splashDuration": 2800,
  "splashReady": 3400,
  "cookieText": "We use cookies to improve your experience. By continuing, you agree to our use of cookies.",
  "cookieBtn": "Accept",
  "stickyCta": "Join now"
}')
ON CONFLICT (id) DO NOTHING;

-- Branding
INSERT INTO branding (site_title, favicon_path, logo_path, hero_image) VALUES
  ('747 Free Online Betting Site', '/favicon.png', '/images/logo.jpg', '/images/hero.jpg');

-- External Links
INSERT INTO external_links (partner_invite_url, facebook_url, agent_facebook_url, alt_facebook_url, messenger_loading_gc, messenger_sports_tips) VALUES
  ('https://www.messenger.com/j/AbakhHJ975SWCzqw/', 'https://m.me/100022590198280', 'https://www.facebook.com/Yjnek#', 'https://www.facebook.com/share/1BriKGwHZ2/?mibextid=wwXIfr', 'https://m.me/j/AbYgP-t5JeYDO3R7/?send_source=gc:copy_invite_link_c', 'https://m.me/j/AbYoJLM_qK2rnSQh/');

-- Hero Section
INSERT INTO hero_section (headline, subcopy, logo_tag, cta_primary, cta_secondary, stat_playing_num, stat_playing_suffix, stat_paid_num, stat_paid_suffix, trust_badge_text, form_trigger_text, form_trigger_note, form_submit_text, form_footer_text) VALUES
  ('Play <em>747 LIVE</em> &amp; win real cash.', 'Sign up through my link for a Welcome Bonus + Cashback. Casino, live sports, eSports & VIP rewards — Saudi Riyals accepted.', 'Official Agent', 'Register through my link', 'Why join', 3163, '+', 2.4, 'B+', 'Verified Partner — 100% secure registration', 'Register Account', '10% cash back + exclusive GCs', 'Register now', '10% CASH BACK sa total na LOSS BETS twice a month — plus exclusive access to all GCs!');

-- Navigation
INSERT INTO navigation (desktop_nav_items, mobile_nav_items) VALUES
  ('Benefits, Discover, Sports, Promo', 'Benefits, Discover, Sports, Why 747LIVE, ext:Facebook');

-- Ticker Bar
INSERT INTO ticker_bar (label) VALUES ('Now in the lounge');
INSERT INTO ticker_messages (message, sort_order) VALUES
  ('TWICE MONTHLY CASHBACK', 1),
  ('SAUDI RIYALS ACCEPTED', 2),
  ('24/7 LIVE SPORTS TIPS', 3),
  ('MONTHLY VIP RAFFLE', 4);

-- How It Works
INSERT INTO how_it_works_config (kicker, heading) VALUES
  ('How it works', 'Get started in <em>3 easy steps</em>');
INSERT INTO how_it_works_steps (step_order, en_title, tl_title, en_desc, tl_desc) VALUES
  (1, 'Register', 'Magrehistro', 'Click the register button and fill in your details through our partner platform.', 'I-click ang register button at punan ang iyong detalye.'),
  (2, 'Deposit', 'Mag-deposito', 'Choose from GCash, GOtyme, STC Pay, or Barq. No hidden fees, instant processing.', 'Pumili ng GCash, GOtyme, STC Pay, o Barq. Walang dagdag na bayad.'),
  (3, 'Play & Win', 'Maglaro at Manalo', 'Access live casino, sports betting, slots, and arcade games. Start winning today!', 'Mag-access sa live casino, sports betting, slots, at arcade games. Manalo na!');

-- Benefits
INSERT INTO benefits_config (kicker, heading, copy, pay_section_title, tagline) VALUES
  ('Invitation privileges', 'A more rewarding way to <em>step inside.</em>', 'Selected benefits to look for when you continue through the partner platform.', 'AVAILABLE CASH IN METHOD', 'FAST., SAFE., SECURE.');
INSERT INTO benefit_slides (image_path, sort_order) VALUES
  ('/images/ga.jpg', 1),
  ('/images/ge.jpg', 2);
INSERT INTO benefit_features (strong, suffix, sort_order) VALUES
  ('24/7', 'SUPPORT', 1),
  ('FAST', 'CASH IN / CASH OUT', 2),
  ('NO', 'CASH OUT FEE', 3),
  ('PLAY SMART', 'WIN BIG', 4);
INSERT INTO payment_methods (name, logo_path, min_amount, max_amount, fee, speed, sort_order) VALUES
  ('GCash', '/images/gcash.jpg', 'P100', 'P100,000', 'Free', 'Instant', 1),
  ('GOtyme', '/images/gotyme.jpg', 'P100', 'P50,000', 'Free', 'Instant', 2),
  ('STC Pay', '/images/stc.jpg', 'SAR 10', 'SAR 50,000', 'Free', 'Instant', 3),
  ('Barq', '/images/barq.png', 'SAR 10', 'SAR 50,000', 'Free', 'Instant', 4);

-- Providers
INSERT INTO providers_config (search_placeholder, no_results_text, kicker, heading) VALUES
  ('Search games, providers, categories...', 'No results found for', 'Curated entertainment', 'Find your <em>table,</em> your tempo.');
INSERT INTO providers (name, kind, asset_path, hue_color, sort_order) VALUES
  ('Live Sports', 'Sports', '/images/provider-live-sports.gif', '#67f79d', 1),
  ('Pre-match', 'Sports', '/images/provider-pre-match.gif', '#ec6800', 2),
  ('Live Casino', 'Tables', '/images/provider-live-casino.gif', '#5c17a2', 3),
  ('Evolution', 'Live tables', '/images/provider-evolution.gif', '#e4b551', 4),
  ('JILI', 'Slots', '/images/provider-jili.gif', '#f83700', 5),
  ('Casino', 'Tables', '/images/provider-casino.gif', '#66f89c', 6),
  ('Pragmatic Play', 'Slots', '/images/provider-pragmatic-play.gif', '#ef5d2d', 7),
  ('Fachai', 'Arcade', '/images/provider-fachai.gif', '#e9bb43', 8),
  ('CreedRoomz', 'Live tables', '/images/provider-creedroomz.gif', '#5d6dff', 9),
  ('Dragon Gaming', 'Slots', '/images/provider-dragon-gaming.gif', '#d93723', 10),
  ('747 News', 'Updates', '/images/provider-747-news.gif', '#66f89c', 11),
  ('747 Hearts', 'Tables', '/images/provider-747-hearts.gif', '#f56b9a', 12),
  ('PopOK', 'Arcade', '/images/provider-popok.gif', '#75a9ff', 13),
  ('Amigo', 'Games', '/images/provider-amigo.gif', '#f1a343', 14);

-- Promo Slides
INSERT INTO promo_slides_config (sports_kicker) VALUES ('Sports & Promotions');
INSERT INTO promo_slides (image_path, sort_order) VALUES
  ('/images/promo-1.webp', 1),
  ('/images/promo-2.webp', 2),
  ('/images/promo-3.webp', 3),
  ('/images/promo-4.webp', 4),
  ('/images/promo-5.webp', 5);

-- Conversion Section
INSERT INTO conversion_section (badge, headline, description, perks, cta_button, sidebar_image, disclaimer) VALUES
  ('747LIVE invitation', 'Looking for Players and Sports Lovers!', 'Sali na sa aming exclusive sports community at e-enjoy ang mga member perks:', '2% Bonus 1st Cash In\n10% Loss Rebates Twice Monthly\nBirthday Bonus Gift\nVIP Sports Group Access\nMonthly Raffle', 'Get started', '/images/z.jpg', 'You''ll be redirected to continue your registration through our partner platform.');

-- Promo Section
INSERT INTO promo_section (heading, copy_line1, copy_line2, cta_leadin, cta_text, verified_text, affiliate_text, video_path) VALUES
  ('10% Cashback / Rebates\nFree Registration', 'kaya ano pang hinihintay mo MESSAGE na 🫶🏼', 'Kung nandito ka sa Mid.Est sakto para sayo to\nMeron din SPORTS TIPS GC para sayo.\n24/7 Loading GC at customer service', 'Message na dito 👉🏼', 'Message on Facebook', 'Legit na legit blue check verified by META kaya safe na safe ka 😉', 'Pwede ka din mag apply as Affiliate 😉', '/images/vid.mp4');

-- Agent Section
INSERT INTO agent_section (badge, name, tagline) VALUES
  ('747 AREA MANAGER', 'Kenj Chua', '747 Free Online Betting Site — Free Sports Picks sa baba plus 10% REBATES');
INSERT INTO agent_cards (title, icon_path, description, cta_text, link_url, sort_order) VALUES
  ('Registration', '/images/a.jpg', 'Click and Message for details', 'Register now', '', 1),
  ('24/7 Loading Gc', '/images/b.jpg', 'Click and Message for details', 'Join now', '', 2),
  ('Free Sports GC Tips', '/images/c.jpg', 'Click and Message for details', 'Join now', '', 3);

-- FAQ
INSERT INTO faq_config (kicker, heading, copy) VALUES
  ('FAQ', 'Frequently asked <em>questions</em>', 'Quick answers to the most common questions about 747 Live.');
INSERT INTO faq (question, answer, keywords, sort_order) VALUES
  ('What is 747 Live?', 'Ang 747 Live ay isang premium gaming platform na may live casino, sports betting, at arcade games. Ito ay independent invitation portal para ma-access mo ang platform.', 'what is, 747 live, about, platform', 1),
  ('How do I register?', 'Click lang ang "Register now" button sa page na ito. Ire-redirect ka sa official partner platform para matapos ang registration mo.', 'register, sign up, join, create account, how to', 2),
  ('Is there a welcome bonus?', 'Oo naman! Kapag nag-register ka through our partner link, may exclusive welcome bonuses, cashback, at promotions na àwait sa''yo.', 'bonus, welcome, promo, cashback, rebate', 3),
  ('What games are available?', 'Marami kang pagpipilian — live dealer tables tulad ng baccarat, blackjack, roulette, sports betting, arcade games, at slot experiences mula sa top providers.', 'game, slot, casino, sports, bet, play, available', 4),
  ('Is this the official site?', 'Hindi po. Independent promotional website lang ito — hindi kami ang operator ng gaming platform. Ang registration ay sa official partner link namin dumadaan.', 'official, real, legit, legitimate, scam', 5),
  ('Is it safe?', 'Ang partner platform ay gumagamit ng industry-standard security. Laging magsugal nang responsable at siguraduhing 18 years old ka pataas.', 'safe, secure, security, trust, reliable', 6),
  ('What payment methods are accepted?', 'Tumatanggap kami ng GCash, GOtyme, STC Pay, at Barq. Mabilis ang cash in at cash out — walang hidden fees.', 'payment, cash in, deposit, gcash, barq, stc, gotyme', 7),
  ('What VIP perks are available?', 'May 2% bonus sa first cash in, 10% loss rebates dalawang beses sa isang buwan, birthday bonus, VIP sports group access, at monthly raffle ang mga members.', 'vip, raffle, member, perks, privilege', 8),
  ('Who can play?', 'Dapat 18 years old or pataas para gumamit ng platform na ito. Lage naming pino-promote ang responsible gaming.', 'age, 18, minor, legal', 9),
  ('How do I contact support?', 'Pwede mo kaming i-message directly sa Facebook — 24/7 ang support namin.', 'contact, support, help, customer, message, facebook', 10);

-- Galleries
INSERT INTO galleries_config (wins_heading, wins_count, wins_copy, wins_cta, cash_heading, cash_count, cash_copy, cash_cta) VALUES
  ('Winning Slips', 8, 'See the latest winning slips from our community members.', 'Start winning today', 'Cash Out Proof', 7, 'Real cash outs from our community members.', 'Get your cash out now');

-- Chatbot
INSERT INTO chatbot_config (bot_name, status, welcome_message, fallback_reply, input_placeholder, quick_replies) VALUES
  ('747 Live Assistant', 'Online', 'Hi! I''m the 747 Live smart assistant. Ask me anything about registration, bonuses, games, or promotions!', 'Thanks for your question! For detailed assistance, you can message me directly on Facebook or register through the platform. Is there anything else I can help with?', 'Type your question...', 'What is 747 Live?\nHow do I register?\nWhat games are available?\nWhat payment methods are accepted?');

-- Win Notifications
INSERT INTO win_notifications_config (show_interval_ms, display_duration_ms) VALUES (14000, 5000);
INSERT INTO win_notifications (name, amount, game, sort_order) VALUES
  ('John D.', 'P25,000', 'Live Casino', 1),
  ('Maria S.', 'P12,400', 'JILI Slots', 2),
  ('Ahmed R.', 'SAR 3,200', 'Sports Betting', 3),
  ('Ken J.', 'P48,700', 'Evolution', 4),
  ('Sarah L.', 'P8,900', 'Pragmatic Play', 5),
  ('Omar K.', 'SAR 5,500', 'Live Casino', 6),
  ('Carlos M.', 'P32,100', 'Fachai Arcade', 7),
  ('Fatima Z.', 'SAR 8,000', 'CreedRoomz', 8),
  ('Mike T.', 'P15,600', 'Sports Betting', 9),
  ('Rosa P.', 'P22,300', 'Dragon Gaming', 10);

-- Footer
INSERT INTO footer_config (brand_text, description, email_placeholder, footer_mark) VALUES
  ('747 LIVE', 'Independent invitation portal for an elevated partner gaming experience. Casino, live sports, eSports & VIP rewards.', 'Enter your email...', '// 747 FREE ONLINE BETTING SITE');

-- Splash / Misc
INSERT INTO splash_config (tagline, duration_ms, content_ready_ms) VALUES
  ('747 Free Online Betting Site', 2800, 3400);
INSERT INTO cookie_consent_config (bar_text, accept_button) VALUES
  ('We use cookies to improve your experience. By continuing, you agree to our use of cookies.', 'Accept');
INSERT INTO sticky_cta_config (text) VALUES ('Join now');

-- ==================== FORM INQUIRIES ====================
-- Stores every hero form registration submission.
CREATE TABLE form_inquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  username    TEXT NOT NULL,
  phone       TEXT NOT NULL,
  country     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Service (admin reads all, anon inserts only)
ALTER TABLE form_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON form_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON form_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- ==================== STORAGE BUCKET ====================
-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true)
  ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "gallery_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

-- Allow authenticated inserts
CREATE POLICY "gallery_auth_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

-- Allow authenticated deletes
CREATE POLICY "gallery_auth_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
