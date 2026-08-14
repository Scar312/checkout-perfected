import logoAsset from "@/assets/seatgeek-logo.png.asset.json";
import qrAsset from "@/assets/qr.png.asset.json";
import shieldAsset from "@/assets/shield.png.asset.json";
import amexAsset from "@/assets/amex.png.asset.json";
import discoverAsset from "@/assets/discover.png.asset.json";
import affirmAsset from "@/assets/affirm.png.asset.json";
import ticketIconAsset from "@/assets/ticket-icon.png.asset.json";

export function SeatGeekLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="SeatGeek"
      className={`h-7 w-auto shrink-0 object-contain ${className}`}
    />
  );
}

export function TicketChip({
  count = 2,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-[42px] shrink-0 items-center gap-2 rounded-[10px] bg-sg-chip px-3 ${className}`}
    >
      <img
        src={ticketIconAsset.url}
        alt=""
        aria-hidden="true"
        className="h-[17px] w-auto object-contain"
      />
      <span className="text-[15px] font-semibold">{count}</span>
      <Chevron className="h-[11px] w-[11px] text-sg-blue" />
    </span>
  );
}

export function QrIcon({ className = "" }: { className?: string }) {
  return <img src={qrAsset.url} alt="" aria-hidden="true" className={`object-contain ${className}`} />;
}

export function ShieldCheck({ className = "" }: { className?: string }) {
  return (
    <img src={shieldAsset.url} alt="" aria-hidden="true" className={`object-contain ${className}`} />
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
  const box =
    "flex h-[17px] w-[26px] shrink-0 items-center justify-center overflow-hidden rounded-[3px]";
  const img = "h-full w-full object-contain";
  return (
    <div className={`flex items-center gap-[6px] ${className}`}>
      <div className={`${box} border border-sg-line bg-white`}>
        <svg viewBox="0 0 24 28" className="h-[11px]" aria-label="PayPal">
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
      <div className={`${box} gap-[1px] border border-sg-line bg-white`}>
        <AppleLogo className="h-[8px] text-sg-ink" />
        <span className="text-[7.5px] font-medium text-sg-ink">Pay</span>
      </div>
      <div className={`${box} bg-sg-ink`}>
        <span className="flex">
          <span className="h-[9px] w-[9px] rounded-full bg-[oklch(0.62_0.21_35)]" />
          <span className="-ml-[4px] h-[9px] w-[9px] rounded-full bg-[oklch(0.78_0.17_80)]" />
        </span>
      </div>
      <div className={`${box} bg-[oklch(0.42_0.19_265)]`}>
        <span className="text-[7.5px] font-bold italic text-white">VISA</span>
      </div>
      <div className={box}>
        <img src={amexAsset.url} alt="American Express" className={img} />
      </div>
      <div className={box}>
        <img src={discoverAsset.url} alt="Discover" className={img} />
      </div>
      <div className={box}>
        <img src={affirmAsset.url} alt="Affirm" className={img} />
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
