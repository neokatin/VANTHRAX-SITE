interface EmblemProps {
  size?: number;
  className?: string;
}

/** The VANTHRAX "V" emblem: two faceted blades around an illuminated seam. */
export function Emblem({ size = 28, className }: EmblemProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 9h15.5L32 45.5V61Z" fill="#D9DCE1" />
      <path d="M62 9H46.5L32 45.5V61Z" fill="#AEB3BB" />
      <path d="M2 9h15.5l-2.2 5.4Z" fill="#F0F1F3" />
      <path d="M20.5 9h8L32 18l3.5-9h8L32 38.5Z" fill="#5A606A" />
      <path d="M32 18v20.5L20.5 9h2.4Z" fill="#7A808A" />
      <path d="M32 21.5V60" stroke="#E02B3F" strokeWidth="1.4" />
      <path d="M17.5 9 32 45.5M46.5 9 32 45.5" stroke="#B51224" strokeWidth="0.9" opacity="0.9" />
    </svg>
  );
}
