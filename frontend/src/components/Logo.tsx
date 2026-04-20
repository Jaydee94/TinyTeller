interface LogoProps {
  size?: number
  className?: string
}

/**
 * TinyTeller logo — a sleepy owl perched on a crescent moon.
 * Nightsky palette: deep gold moon (#FFD166), deep purple owl (#4A2E8C),
 * cream text (#F5F0FF), scattered star accents.
 */
export default function Logo({ size = 64, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-label="TinyTeller logo"
      role="img"
    >
      <defs>
        {/* Mask to carve the crescent from the full moon circle */}
        <mask id="crescent-mask">
          <circle cx="36" cy="46" r="15" fill="white" />
          <circle cx="43" cy="43" r="12" fill="black" />
        </mask>
        {/* Soft golden glow behind the moon */}
        <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Moon halo glow */}
      <circle cx="36" cy="46" r="22" fill="url(#moon-glow)" />

      {/* Crescent moon */}
      <circle cx="36" cy="46" r="15" fill="#FFD166" mask="url(#crescent-mask)" />

      {/* ── Owl body ── */}
      <ellipse cx="30" cy="36" rx="8" ry="9" fill="#4A2E8C" />
      {/* Belly highlight */}
      <ellipse cx="30" cy="38" rx="4.5" ry="5.5" fill="#6B4BAE" opacity="0.75" />

      {/* ── Owl head ── */}
      <circle cx="30" cy="24" r="9" fill="#4A2E8C" />
      {/* Ear tufts */}
      <polygon points="24,18 26.5,13 29,18" fill="#4A2E8C" />
      <polygon points="31,18 33.5,13 36,18" fill="#4A2E8C" />
      {/* Face disc */}
      <ellipse cx="30" cy="25" rx="6" ry="5.5" fill="#6B4BAE" opacity="0.80" />

      {/* Sleepy closed eyes — gentle arcs */}
      <path d="M25.5 24.5 Q27.5 22.5 29.5 24.5" fill="none" stroke="#F5F0FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30.5 24.5 Q32.5 22.5 34.5 24.5" fill="none" stroke="#F5F0FF" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tiny eyelash dots */}
      <circle cx="27.5" cy="22" r="0.6" fill="#F5F0FF" opacity="0.55" />
      <circle cx="32.5" cy="22" r="0.6" fill="#F5F0FF" opacity="0.55" />

      {/* Beak */}
      <polygon points="29,28.5 31,28.5 30,31" fill="#FFD166" />

      {/* Wings */}
      <path d="M22 34 Q18 31 19 38 Q22 36 22 40 Z" fill="#3A2070" />
      <path d="M38 34 Q42 31 41 38 Q38 36 38 40 Z" fill="#3A2070" />

      {/* Feet resting on the moon */}
      <line x1="27" y1="44.5" x2="25" y2="47" stroke="#FFD166" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="27" y1="44.5" x2="27" y2="47.5" stroke="#FFD166" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="33" y1="44.5" x2="35" y2="47" stroke="#FFD166" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="33" y1="44.5" x2="33" y2="47.5" stroke="#FFD166" strokeWidth="1.4" strokeLinecap="round" />

      {/* ── Stars ── */}
      {/* 4-point star top-left */}
      <path d="M8 12 L9 15 L12 16 L9 17 L8 20 L7 17 L4 16 L7 15 Z" fill="#E8ECF7" opacity="0.90" />
      {/* Small 4-point star top-right */}
      <path d="M53 7 L53.8 10 L57 11 L53.8 12 L53 15 L52.2 12 L49 11 L52.2 10 Z" fill="#FFD166" opacity="0.85" />
      {/* Tiny dot stars */}
      <circle cx="16" cy="24" r="1"   fill="#E8ECF7" opacity="0.70" />
      <circle cx="56" cy="30" r="0.8" fill="#E8ECF7" opacity="0.60" />
      <circle cx="5"  cy="46" r="0.7" fill="#FFD166" opacity="0.65" />
      <circle cx="58" cy="50" r="0.6" fill="#E8ECF7" opacity="0.50" />
    </svg>
  )
}

