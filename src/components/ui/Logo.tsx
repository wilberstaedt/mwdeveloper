interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function Logo({ size = 160, animated = false, className }: LogoProps) {
  const strokeWidth = size > 80 ? 10 : size > 40 ? 12 : 16;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MW Dev logo"
      role="img"
    >
      {size >= 80 && (
        <path
          d="M80 8 L152 80 L80 152 L8 80 Z"
          stroke="#0066FF"
          strokeWidth="3"
          fill="none"
          opacity="0.15"
        />
      )}

      <path
        d="M32 56 L56 32 L80 56 L104 32 L128 56"
        stroke="#0066FF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M32 104 L56 128 L80 104 L104 128 L128 104"
        stroke="#0066FF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M32 56 L32 104"
        stroke="#0066FF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M128 56 L128 104"
        stroke="#0066FF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M80 56 L80 104"
        stroke="#00D4FF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        className={animated ? "logo-axis" : undefined}
      />
      {size >= 80 && (
        <rect
          x="76"
          y="76"
          width="8"
          height="8"
          rx="1.5"
          fill="#00D4FF"
          opacity="0.6"
        />
      )}
    </svg>
  );
}
