import { ArrowRight, MessageSquare } from "lucide-react";

const partnerInviteUrl = "https://www.messenger.com/j/AbakhHJ975SWCzqw/";
const facebookUrl = "https://www.facebook.com/profile.php?id=100022590198280";

export function NeoMinimalFooter() {
  return (
    <footer
      className="relative border-t border-white/[.06] pt-12 md:pt-16 pb-20 md:pb-8 overflow-hidden"
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #072607 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-10 md:mb-16">
          <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="747 Live" className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-xl font-bold tracking-tight text-white">
                747 <span className="text-[#66f89c]">LIVE</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Independent invitation portal for an elevated partner gaming experience. Casino, live sports, eSports &amp; VIP rewards.
            </p>

            <div className="flex items-center gap-2 mt-2 group w-full">
              <div className="relative flex-1 max-w-full md:max-w-xs">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full bg-white/[.04] border border-white/[.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#66f89c]/50 transition-colors"
                />
              </div>
              <a
                href={partnerInviteUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#66f89c] rounded-lg text-[#021d16] hover:bg-[#66f89c]/80 transition-colors"
              >
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {[
            { title: "Platform", links: ["Live Casino", "Sports Betting", "Slots", "VIP Rewards"] },
            { title: "Company", links: ["About", "Area Manager", "Responsible Gaming", "Blog"] },
            { title: "Connect", links: ["Facebook", "Messenger", "Support", "Affiliates"] },
          ].map((section, idx) => (
            <div key={idx} className="col-span-6 md:col-span-2 flex flex-col gap-4">
              <h4 className="text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[.15em]">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === "Messenger" || link === "Facebook" ? facebookUrl : partnerInviteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-mono text-white/40 hover:text-[#66f89c] transition-colors flex items-center gap-2 group w-fit"
                    >
                      <span className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#66f89c] transition-all group-hover:w-4 duration-200" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/[.05]">
          <p className="text-[11px] text-white/30 font-mono text-center md:text-left">
            // 747 FREE ONLINE BETTING SITE
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex gap-4 border-r border-white/[.08] pr-4 sm:pr-6 mr-0 sm:mr-2">
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={partnerInviteUrl} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                <MessageSquare size={18} />
              </a>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#66f89c]/5 border border-[#66f89c]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#66f89c] animate-pulse" />
              <span className="text-[10px] uppercase font-medium text-[#66f89c]/70 tracking-wider">18+ Only</span>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <p className="text-[11px] md:text-xs text-white/25 leading-relaxed max-w-3xl mx-auto px-2">
            This website is an independent promotional website and may receive a commission when users register through the provided partner link. We are not the operator of the gaming platform.
          </p>
        </div>
      </div>
    </footer>
  );
}