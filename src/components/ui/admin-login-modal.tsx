import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { memo, useEffect, useMemo, useRef, useState, type FormEvent } from "react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginEmail: string;
  loginPassword: string;
  loginError: string;
  loginLoading: boolean;
  showPassword: boolean;
  onLoginEmailChange: (v: string) => void;
  onLoginPasswordChange: (v: string) => void;
  onShowPasswordChange: (v: boolean) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
}

export const AdminLoginModal = memo(function AdminLoginModal({
  isOpen, onClose,
  loginEmail, loginPassword, loginError, loginLoading, showPassword,
  onLoginEmailChange, onLoginPasswordChange, onShowPasswordChange, onLogin,
  onForgotPassword,
}: AdminLoginModalProps) {
  const blobsData = useMemo(() =>
    Array.from({ length: 6 }).map(() => ({
      size: Math.random() * 100 + 80,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      animationDelay: Math.random() * -20,
      animationDuration: Math.random() * 15 + 15,
    })), []
  );

  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [blobMounted, setBlobMounted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setBlobMounted(true);
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        for (let i = 0; i < blobRefs.current.length; i++) {
          const blob = blobRefs.current[i];
          if (blob) {
            const speed = (i + 1) * 15;
            blob.style.marginLeft = `${x * speed}px`;
            blob.style.marginTop = `${y * speed}px`;
          }
        }
      });
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <AnimatePresence onExitComplete={() => setBlobMounted(false)}>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #350136 100%)" }}
        >
          <style>{`
            @keyframes neuralFloat {
              0% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(5vw, 10vh) scale(1.15); }
              66% { transform: translate(-3vw, 5vh) scale(0.85); }
              100% { transform: translate(3vw, -5vh) scale(1.05); }
            }
          `}</style>

          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="neuralGoo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {blobMounted && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ filter: 'url(#neuralGoo)', opacity: 0.5 }}
            >
              {blobsData.map((data, i) => (
                <div
                  key={i}
                  ref={(el) => { blobRefs.current[i] = el; }}
                  className="absolute rounded-full"
                  style={{
                    width: data.size,
                    height: data.size,
                    left: `${data.left}%`,
                    top: `${data.top}%`,
                    animation: `neuralFloat ${data.animationDuration}s infinite alternate ease-in-out`,
                    animationDelay: `${data.animationDelay}s`,
                    background: 'linear-gradient(135deg, rgba(180,180,200,0.3), rgba(100,100,140,0.15))',
                    willChange: 'transform',
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            className="relative w-full max-w-[420px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-2xl border border-white/[0.06] p-10"
              style={{
                background: 'linear-gradient(170deg, rgba(12,12,22,0.95), rgba(6,6,14,0.98))',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset',
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

              <div className="text-left mb-10">
                <span className="block font-mono text-[10px] tracking-[3px] uppercase text-white/30 mb-2">
                  System Node: 0x992
                </span>
                <h1 className="font-extrabold text-4xl leading-[0.9] tracking-[-2px] -ml-[3px] text-white">
                  NEURAL<br />ACCESS
                </h1>
              </div>

              {loginError && (
                <div className="mb-5 px-4 py-3 rounded-xl text-sm text-red-400 border border-red-500/15 bg-red-500/5">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="group mb-7 relative">
                  <label className="block font-mono text-[11px] tracking-[2px] text-white/30 mb-3 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="ID-492-BASE"
                    value={loginEmail}
                    onChange={(e) => onLoginEmailChange(e.target.value)}
                    className="w-full bg-transparent border-none text-white text-lg px-0 py-3 outline-none"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  />
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-white/40 transition-all duration-[600ms] ease-[cubic-bezier(0.2,1,0.3,1)] group-focus-within:w-full"
                    style={{ width: '0%', boxShadow: '0 0 15px rgba(180,180,200,0.5)' }}
                  />
                </div>

                <div className="group mb-10 relative">
                  <label className="block font-mono text-[11px] tracking-[2px] text-white/30 mb-3 uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => onLoginPasswordChange(e.target.value)}
                      className="w-full bg-transparent border-none text-white text-lg px-0 py-3 outline-none pr-10"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    />
                    <button
                      type="button"
                      onClick={() => onShowPasswordChange(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors p-1"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-white/40 transition-all duration-[600ms] ease-[cubic-bezier(0.2,1,0.3,1)] group-focus-within:w-full"
                    style={{ width: '0%', boxShadow: '0 0 15px rgba(180,180,200,0.5)' }}
                  />
                </div>

                <div className="relative mb-14" style={{ filter: 'url(#neuralGoo)' }}>
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 rounded-[50px] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-[1.05_1.2] group-hover:brightness-125"
                  />
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="relative z-10 w-full bg-white text-black border-none py-5 px-10 text-sm font-extrabold tracking-[2px] uppercase cursor-pointer transition-[letter-spacing] duration-300 hover:tracking-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loginLoading ? 'Authenticating...' : 'Initialize Stream'}
                  </button>
                </div>

                <div className="flex justify-between font-mono text-[10px] mt-8">
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-white/30 hover:text-white/70 transition-colors no-underline bg-transparent border-none cursor-pointer tracking-[0.5px]"
                  >
                    FORGOT PASSWORD
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-white/30 hover:text-white/70 transition-colors no-underline bg-transparent border-none cursor-pointer tracking-[0.5px]"
                  >
                    NEW ARCHIVE
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
