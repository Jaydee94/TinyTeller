interface LogoProps {
  size?: number
  className?: string
}

/**
 * TinyTeller logo — a minimalist bird sitting on an open book.
 * Uses the brand palette: Sunset Orange (#FF9E4A), Sky Blue (#8ECAE6), Star Yellow (#FFD166).
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
      {/* Open book — left page */}
      <path
        d="M8 40 Q8 36 12 35 L30 33 L30 52 L12 54 Q8 54 8 50 Z"
        fill="#fff"
        stroke="#8ECAE6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Open book — right page */}
      <path
        d="M56 40 Q56 36 52 35 L34 33 L34 52 L52 54 Q56 54 56 50 Z"
        fill="#fff"
        stroke="#8ECAE6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Book spine / center crease */}
      <path
        d="M30 33 Q32 31 34 33 L34 52 Q32 54 30 52 Z"
        fill="#FFD166"
      />
      {/* Left page lines */}
      <line x1="13" y1="40" x2="27" y2="39.5" stroke="#8ECAE6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="13" y1="44" x2="27" y2="43.5" stroke="#8ECAE6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="13" y1="48" x2="22" y2="47.8" stroke="#8ECAE6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Right page lines */}
      <line x1="37" y1="39.5" x2="51" y2="40" stroke="#8ECAE6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="37" y1="43.5" x2="51" y2="44" stroke="#8ECAE6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="42" y1="47.8" x2="51" y2="48" stroke="#8ECAE6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* Bird body */}
      <ellipse cx="32" cy="26" rx="9" ry="7" fill="#FF9E4A" />
      {/* Bird head */}
      <circle cx="38" cy="20" r="5.5" fill="#FF9E4A" />
      {/* Wing */}
      <path
        d="M23 27 Q18 22 22 18 Q26 24 32 24 Z"
        fill="#e8832e"
      />
      {/* Tail */}
      <path
        d="M23 29 Q18 32 16 36 Q21 33 25 31 Z"
        fill="#e8832e"
      />
      {/* Eye */}
      <circle cx="40" cy="19" r="1.2" fill="#2D3748" />
      <circle cx="40.4" cy="18.6" r="0.4" fill="#fff" />
      {/* Beak */}
      <path
        d="M43 21 L47 20.5 L43 22 Z"
        fill="#FFD166"
      />
      {/* Feet on book */}
      <line x1="30" y1="33" x2="28" y2="34.5" stroke="#e8832e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="33" x2="36" y2="34.5" stroke="#e8832e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
