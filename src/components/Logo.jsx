const Logo = ({ size = 'default' }) => {
    const sizes = {
        small: { icon: 28, text: 'text-base', sub: 'text-[9px]' },
        default: { icon: 34, text: 'text-lg sm:text-xl', sub: 'text-[11px]' },
        large: { icon: 48, text: 'text-2xl', sub: 'text-[13px]' },
    };

    const s = sizes[size] || sizes.default;

    return (
        <div className="flex items-center gap-2.5">
            {/* Logo Mark — Shield + Bridge */}
            <div className="relative">
                <svg
                    width={s.icon}
                    height={s.icon}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Background rounded square */}
                    <rect width="48" height="48" rx="12" fill="url(#logo-gradient)" />

                    {/* Shield outline */}
                    <path
                        d="M24 8C24 8 14 12 14 20C14 28 18 36 24 40C30 36 34 28 34 20C34 12 24 8 24 8Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                    />

                    {/* Bridge arch (Setu) inside the shield */}
                    <path
                        d="M18 28C18 28 20 22 24 22C28 22 30 28 30 28"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.95"
                    />

                    {/* Bridge pillars */}
                    <line x1="20" y1="28" x2="20" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                    <line x1="24" y1="22" x2="24" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                    <line x1="28" y1="28" x2="28" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

                    {/* Bridge road/deck */}
                    <line x1="17" y1="32" x2="31" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

                    {/* Small checkmark/pulse at top center of shield = safety */}
                    <path
                        d="M21 15L23 17.5L27.5 13"
                        fill="none"
                        stroke="#93c5fd"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <defs>
                        <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#2563eb" />
                            <stop offset="1" stopColor="#1e40af" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-suraksha-500 opacity-20 blur-md -z-10" />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col">
                <span className={`${s.text} font-bold text-slate-900 leading-none tracking-tight`}>
                    <span className="text-suraksha-600">Suraksha</span>
                    <span className="text-slate-400 font-light mx-0.5">|</span>
                    <span>Setu</span>
                </span>
                <span className={`${s.sub} font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5`}>
                    Disaster Command
                </span>
            </div>
        </div>
    );
};

export default Logo;
