export function SeatGeekLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`select-none font-bold leading-[0.86] tracking-[-0.01em] text-sg-red ${className}`}
      aria-label="SeatGeek"
    >
      <div className="text-[20px]">SEAT</div>
      <div className="text-[20px]">GEEK</div>
    </div>
  );
}

/* Arena overview map with the section pin */
export function ArenaOverview({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} role="img" aria-label="Arena map">
      <g fill="var(--color-sg-map)">
        <ellipse cx="120" cy="100" rx="112" ry="92" opacity="0.55" />
      </g>
      <ellipse cx="120" cy="100" rx="98" ry="79" fill="var(--color-sg-map-bg)" />
      <g fill="var(--color-sg-map)">
        <ellipse cx="120" cy="100" rx="92" ry="73" />
      </g>
      <ellipse cx="120" cy="100" rx="78" ry="60" fill="var(--color-sg-map-bg)" />
      <ellipse cx="120" cy="100" rx="72" ry="55" fill="var(--color-sg-map)" />
      <ellipse cx="120" cy="100" rx="56" ry="40" fill="#fff" />
      {/* spokes */}
      <g stroke="#fff" strokeWidth="2.4">
        {Array.from({ length: 28 }).map((_, i) => {
          const a = (i / 28) * Math.PI * 2;
          const x1 = 120 + Math.cos(a) * 57;
          const y1 = 100 + Math.sin(a) * 41;
          const x2 = 120 + Math.cos(a) * 112;
          const y2 = 100 + Math.sin(a) * 92;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <ellipse
        cx="120"
        cy="100"
        rx="78"
        ry="60"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
      />
      {/* floor */}
      <rect x="96" y="88" width="18" height="24" rx="2" fill="oklch(0.35 0 0)" />
      <circle cx="132" cy="100" r="5" fill="oklch(0.25 0 0)" />
      <rect x="146" y="95" width="14" height="10" rx="1.5" fill="#fff" />
      {/* pin */}
      <g>
        <circle cx="66" cy="150" r="17" fill="oklch(0.55 0.2 258 / 0.16)" />
        <circle cx="66" cy="150" r="17" fill="none" stroke="var(--color-sg-blue)" strokeWidth="2" />
        <path
          d="M60 145 l10 -4 5 11 -10 4 z"
          fill="var(--color-sg-blue)"
        />
      </g>
    </svg>
  );
}

/* Zoomed section map with the highlighted row */
export function ArenaZoom({ className = "" }: { className?: string }) {
  const g = "var(--color-sg-map)";
  return (
    <svg viewBox="0 0 240 200" className={className} role="img" aria-label="Section map">
      <rect width="240" height="200" fill="#fff" />
      <path d="M8 74 L82 34 L118 66 L48 118 Z" fill={g} opacity="0.75" />
      <text x="46" y="80" fontSize="7" fill="var(--color-sg-muted)" fontFamily="Outfit">
        227 S
      </text>
      <path d="M132 18 L196 6 L206 40 L146 52 Z" fill={g} opacity="0.75" />
      <text
        x="150"
        y="30"
        fontSize="6"
        fill="var(--color-sg-muted)"
        fontFamily="Outfit"
        transform="rotate(-10 150 30)"
      >
        T1 SRO
      </text>
      <path d="M212 8 L240 4 L240 40 L216 42 Z" fill={g} opacity="0.75" />
      <text x="219" y="16" fontSize="6" fill="var(--color-sg-muted)" fontFamily="Outfit">
        LOW
      </text>
      <path d="M126 66 L204 52 L214 96 L136 112 Z" fill={g} />
      <path
        d="M132 82 C158 78 186 74 208 70"
        stroke="var(--color-sg-blue)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M218 56 L240 52 L240 96 L220 98 Z" fill={g} opacity="0.8" />
      <path d="M110 118 L188 104 L200 148 L120 164 Z" fill={g} />
      <path d="M204 104 L240 100 L240 150 L214 152 Z" fill={g} opacity="0.8" />
      {/* white walkway crosses */}
      <g fill="#fff">
        <path d="M136 128 h10 v-8 h8 v8 h10 v8 h-10 v10 h-8 v-10 h-10 z" />
        <path d="M186 124 h10 v-8 h8 v8 h10 v8 h-10 v10 h-8 v-10 h-10 z" />
      </g>
      <path
        d="M96 112 L120 108 L128 126 L112 178 L84 182 Z"
        fill="#fff"
      />
      <path d="M60 128 L104 118 L96 186 L44 190 Z" fill={g} opacity="0.35" />
    </svg>
  );
}

export function TicketIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true">
      <path
        d="M2 3.2C2 2.5 2.6 2 3.2 2h6c.6 0 1.2.5 1.2 1.2v11.6c0 .7-.6 1.2-1.2 1.2h-6c-.6 0-1.2-.5-1.2-1.2V3.2Z"
        fill="currentColor"
      />
      <path
        d="M12.6 3.2c0-.7.6-1.2 1.2-1.2h6c.7 0 1.2.5 1.2 1.2v11.6c0 .7-.5 1.2-1.2 1.2h-6c-.6 0-1.2-.5-1.2-1.2V3.2Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}

export function QrIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="currentColor">
      <rect x="0" y="0" width="6" height="6" rx="1" />
      <rect x="8" y="2" width="4" height="4" rx="1" />
      <rect x="14" y="0" width="6" height="6" rx="1" />
      <rect x="2" y="9" width="4" height="4" rx="1" />
      <rect x="9" y="8" width="5" height="5" rx="1" />
      <rect x="0" y="14" width="6" height="6" rx="1" />
      <rect x="8" y="15" width="4" height="4" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

export function ShieldCheck({
  className = "",
  filled = true,
}: {
  className?: string;
  filled?: boolean;
}) {
  return filled ? (
    <svg viewBox="0 0 20 22" className={className} aria-hidden="true">
      <path d="M10 0 19 3v8.2C19 16.4 15.3 20.4 10 22 4.7 20.4 1 16.4 1 11.2V3L10 0Z" fill="currentColor" />
      <path
        d="M5.8 10.6 8.7 13.5 14.2 7.6"
        stroke="#fff"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 20 22" className={className} aria-hidden="true">
      <path
        d="M10 1 18 3.7v7.5C18 15.9 14.7 19.5 10 21 5.3 19.5 2 15.9 2 11.2V3.7L10 1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M6.2 10.6 9 13.4 14 7.8"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.2 14.7c0-3 2.4-4.4 2.5-4.5-1.4-2-3.5-2.3-4.2-2.3-1.8-.2-3.5 1-4.4 1-.9 0-2.3-1-3.8-1C5.4 7.9 3.3 9.1 2.2 11c-2.2 3.9-.6 9.6 1.6 12.8 1.1 1.5 2.4 3.2 4.1 3.1 1.6-.1 2.2-1 4.2-1 1.9 0 2.5 1 4.2 1 1.7 0 2.8-1.6 3.9-3.1.8-1.1 1.4-2.3 1.8-3.5-2.5-1-4.8-2.6-4.8-5.6Z" />
      <path d="M14.6 5.3c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.9.9-3.8 2-.8 1-1.5 2.5-1.3 4 1.5.1 3-.8 3.8-1.9Z" />
    </svg>
  );
}

export function PayBrands({ className = "" }: { className?: string }) {
  const box = "flex h-[22px] items-center justify-center rounded-[4px] px-1.5";
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className={`${box} border border-sg-line bg-white`}>
        <svg viewBox="0 0 24 28" className="h-[15px]" aria-label="PayPal">
          <path
            d="M6 27 9.6 4h7.2c4 0 6.4 2.1 5.8 5.9-.7 4.4-4 6.5-8.4 6.5h-2.5L10.5 27H6Z"
            fill="oklch(0.45 0.16 265)"
          />
          <path
            d="M2 24 5.6 1h7.2c4 0 6.4 2.1 5.8 5.9-.7 4.4-4 6.5-8.4 6.5H7.7L6.5 24H2Z"
            fill="oklch(0.55 0.17 250)"
          />
        </svg>
      </div>
      <div className={`${box} border border-sg-line bg-white gap-[2px]`}>
        <AppleLogo className="h-[11px] text-sg-ink" />
        <span className="text-[10px] font-medium text-sg-ink">Pay</span>
      </div>
      <div className={`${box} bg-sg-ink`}>
        <span className="flex">
          <span className="h-3 w-3 rounded-full bg-[oklch(0.62_0.21_35)]" />
          <span className="-ml-1.5 h-3 w-3 rounded-full bg-[oklch(0.78_0.17_80)]" />
        </span>
      </div>
      <div className={`${box} bg-[oklch(0.42_0.19_265)]`}>
        <span className="text-[10px] font-bold italic text-white">VISA</span>
      </div>
      <div className={`${box} flex-col bg-[oklch(0.6_0.13_240)] leading-[7px]`}>
        <span className="text-[7px] font-bold text-white">AM</span>
        <span className="text-[7px] font-bold text-white">EX</span>
      </div>
      <div className={`${box} border border-[oklch(0.7_0.17_50)] bg-white`}>
        <span className="text-[7px] font-bold text-[oklch(0.35_0.02_260)]">
          DISC<span className="text-[oklch(0.7_0.17_50)]">O</span>VER
        </span>
      </div>
      <div className={`${box} bg-[oklch(0.5_0.24_285)]`}>
        <span className="text-[12px] font-semibold text-white">ⓐ</span>
      </div>
    </div>
  );
}

export function Chevron({
  className = "",
  up = false,
}: {
  className?: string;
  up?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className} transition-transform duration-300 ${up ? "rotate-180" : ""}`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 6 8 10.5 12.5 6" />
    </svg>
  );
}