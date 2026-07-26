'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
	Globe,
	ArrowUpRight,
	CircleDot,
	Trophy,
	Medal,
	Gamepad2,
	Swords,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	description?: string;
	img?: string;
};

export function Header({ liveUrl, activeSection, scrollToSection, onLogoClick, lang, onLangChange }: {
	liveUrl: string;
	activeSection: string;
	scrollToSection: (id: string) => void;
	onLogoClick?: () => void;
	lang: "en" | "tl";
	onLangChange: (lang: "en" | "tl") => void;
}) {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
				{
					'bg-[#021d16]/90 supports-[backdrop-filter]:bg-[#021d16]/50 border-white/[.06] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,.3)]': scrolled,
				}
			)}
		>
			<nav className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-6">
				<div className="flex items-center gap-8">
					<a
						href="#top"
						onClick={(e) => { e.preventDefault(); scrollToSection('top'); onLogoClick?.(); }}
						className="flex items-center gap-2 rounded-md"
					>
						<img
							src="/images/logo.jpg"
							alt="747 Live"
							className="h-9 w-9 rounded-lg object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]"
						/>
					</a>

					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink
									className={cn(
										'px-4 py-2 text-[13px] font-semibold transition-colors rounded-md',
										activeSection === 'benefits'
											? 'text-[#66f89c] bg-[#66f89c]/[.08]'
											: 'text-white/60 hover:text-[#66f89c] hover:bg-white/[.04]'
									)}
									onClick={() => scrollToSection('benefits')}
								>
									Benefits
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink
									className={cn(
										'px-4 py-2 text-[13px] font-semibold transition-colors rounded-md',
										activeSection === 'discover'
											? 'text-[#66f89c] bg-[#66f89c]/[.08]'
											: 'text-white/60 hover:text-[#66f89c] hover:bg-white/[.04]'
									)}
									onClick={() => scrollToSection('discover')}
								>
									Discover
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger
									className={cn(
										'text-[13px] font-semibold bg-transparent',
										activeSection === 'sports'
											? 'text-[#66f89c] bg-[#66f89c]/[.08]'
											: 'text-white/60 hover:text-[#66f89c] hover:bg-white/[.04]'
									)}
								>
									Sports
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-[#021d16] border-white/[.08] p-0">
									<ul className="grid w-[320px] gap-1 p-2">
										<div className="flex items-center justify-between px-3 py-2 mb-1">
											<span className="text-[10px] font-medium tracking-[.12em] uppercase text-white/30" style={{ fontFamily: '"DM Mono",monospace' }}>
												Live Categories
											</span>
											<span className="flex items-center gap-1.5">
												<span className="h-1.5 w-1.5 rounded-full bg-[#66f89c] shadow-[0_0_8px_rgba(102,248,156,.6)] animate-pulse" />
												<span className="text-[10px] text-[#66f89c] font-medium" style={{ fontFamily: '"DM Mono",monospace' }}>LIVE</span>
											</span>
										</div>
										{sportsLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} onClick={() => scrollToSection('sports')} />
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink
									className={cn(
										'px-4 py-2 text-[13px] font-semibold transition-colors rounded-md',
										activeSection === 'promo'
											? 'text-[#66f89c] bg-[#66f89c]/[.08]'
											: 'text-white/60 hover:text-[#66f89c] hover:bg-white/[.04]'
									)}
									onClick={() => scrollToSection('promo')}
								>
									Promo
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="hidden items-center gap-3 md:flex">
					<button
						onClick={() => onLangChange(lang === "en" ? "tl" : "en")}
						className="flex items-center gap-1.5 rounded-lg border border-white/[.14] bg-transparent px-3 py-2 text-[12px] font-semibold text-white/60 transition-all hover:border-[#66f89c]/40 hover:text-[#66f89c] hover:bg-[#66f89c]/[.06]"
					>
						<Globe size={12} /> {lang === "en" ? "EN" : "TL"}
					</button>

					<a
						href="https://www.facebook.com/profile.php?id=100022590198280"
						target="_blank"
						rel="noreferrer"
						className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[.14] text-white/60 transition-all hover:border-[#66f89c]/40 hover:text-[#66f89c] hover:bg-[#66f89c]/[.06]"
						aria-label="Facebook"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
					</a>

					<a
						href={liveUrl}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2 rounded-xl bg-[#66f89c] px-5 py-2.5 text-[13px] font-bold text-[#021d16] shadow-[0_8px_30px_rgba(102,248,156,.23)] transition-all hover:bg-[#7affb0] hover:-translate-y-0.5 hover:shadow-[0_12px_42px_rgba(102,248,156,.38)]"
					>
						Register <ArrowUpRight size={15} />
					</a>
				</div>

				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden border-white/[.14] text-white/70 hover:text-[#66f89c] hover:border-[#66f89c]/40 hover:bg-[#66f89c]/[.06]"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<NavigationMenu className="max-w-full">
					<div className="flex w-full flex-col gap-y-1">
						<span className="text-[10px] font-medium tracking-[.12em] uppercase text-white/30 px-3 py-2" style={{ fontFamily: '"DM Mono",monospace' }}>
							Navigation
						</span>
						<button
							onClick={() => { scrollToSection('benefits'); setOpen(false); }}
							className="w-full rounded-lg border border-white/[.06] bg-white/[.03] px-4 py-3 text-left text-[15px] font-semibold text-white/70 transition-colors hover:bg-[#66f89c]/[.06] hover:text-[#66f89c]"
						>
							Benefits
						</button>
						<button
							onClick={() => { scrollToSection('discover'); setOpen(false); }}
							className="w-full rounded-lg border border-white/[.06] bg-white/[.03] px-4 py-3 text-left text-[15px] font-semibold text-white/70 transition-colors hover:bg-[#66f89c]/[.06] hover:text-[#66f89c]"
						>
							Discover
						</button>

						<span className="text-[10px] font-medium tracking-[.12em] uppercase text-white/30 px-3 pt-3 pb-1" style={{ fontFamily: '"DM Mono",monospace' }}>
							Sports
						</span>
						{sportsLinks.map((link) => (
							<button
								key={link.title}
								onClick={() => { scrollToSection('sports'); setOpen(false); }}
								className="w-full flex items-center gap-3 rounded-lg border border-white/[.06] bg-white/[.03] px-4 py-3 text-left transition-colors hover:bg-[#66f89c]/[.06]"
							>
								<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.04] overflow-hidden">
									{link.img ? (
										<img src={link.img} alt={link.title} className="h-full w-full object-cover" />
									) : (
										<link.icon className="h-4 w-4 text-white/50" />
									)}
								</div>
								<div className="flex flex-col">
									<span className="text-[13px] font-semibold text-white/70">{link.title}</span>
									{link.description && (
										<span className="text-[11px] text-white/30">{link.description}</span>
									)}
								</div>
							</button>
						))}

						<button
							onClick={() => { scrollToSection('promo'); setOpen(false); }}
							className="w-full rounded-lg border border-white/[.06] bg-white/[.03] px-4 py-3 text-left text-[15px] font-semibold text-white/70 transition-colors hover:bg-[#66f89c]/[.06] hover:text-[#66f89c]"
						>
							Promo
						</button>
					</div>
				</NavigationMenu>

				<div className="flex flex-col gap-2 pt-4 border-t border-white/[.06]">
					<a
						href={liveUrl}
						target="_blank"
						rel="noreferrer"
						className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#66f89c] py-3 text-[14px] font-bold text-[#021d16] shadow-[0_8px_30px_rgba(102,248,156,.23)]"
					>
						Register <ArrowUpRight size={16} />
					</a>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-[#021d16]/95 supports-[backdrop-filter]:bg-[#021d16]/80 backdrop-blur-xl',
				'fixed top-[72px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-white/[.06] md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-5',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	img,
	className,
	onClick,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem & { onClick?: () => void }) {
	return (
		<NavigationMenuLink
			className={cn(
				'w-full flex flex-row items-center gap-3 rounded-lg p-2.5 transition-colors',
				'hover:bg-[#66f89c]/[.06] focus:bg-[#66f89c]/[.06]',
				'data-[active=true]:bg-[#66f89c]/[.06]',
				className,
			)}
			onClick={onClick}
			{...props}
		>
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.04] shadow-sm overflow-hidden">
				{img ? (
					<img src={img} alt={title} className="h-full w-full object-cover" />
				) : (
					<Icon className="h-4 w-4 text-white/50 group-hover:text-[#66f89c] transition-colors" />
				)}
			</div>
			<div className="flex flex-col items-start justify-center min-w-0">
				<span className="text-[13px] font-semibold text-white/80 leading-tight">{title}</span>
				{description && (
					<span className="text-[11px] text-white/30 leading-tight mt-0.5">{description}</span>
				)}
			</div>
		</NavigationMenuLink>
	);
}

const sportsLinks: LinkItem[] = [
	{
		title: 'NBA',
		href: '#sports',
		icon: CircleDot,
		description: 'Live basketball betting',
		img: '/images/nba.jpg',
	},
	{
		title: 'PBA',
		href: '#sports',
		icon: Trophy,
		description: 'Philippine basketball',
		img: '/images/pba.jpg',
	},
	{
		title: 'Baseball',
		href: '#sports',
		icon: Medal,
		description: 'MLB & international',
		img: '/images/baseball.jpg',
	},
	{
		title: 'Mobile Legends',
		href: '#sports',
		icon: Gamepad2,
		description: 'eSports betting',
		img: '/images/mobilelegend.jpg',
	},
	{
		title: 'Dota 2',
		href: '#sports',
		icon: Swords,
		description: 'eSports tournaments',
		img: '/images/dota2.jpg',
	},
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
