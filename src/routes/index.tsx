import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import dealBadgeAsset from "@/assets/deal-8.png.asset.json";
import seatViewAsset from "@/assets/stage-view.png.asset.json";
import mapOverviewAsset from "@/assets/map-overview2.png.asset.json";
import mapZoomAsset from "@/assets/map-zoom2.png.asset.json";
import {
  AppleLogo,
  Chevron,
  PayBrands,
  QrIcon,
  SeatGeekLogo,
  ShieldCheck,
  TicketChip,
} from "@/components/checkout/graphics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Checkout — Review your order" },
      {
        name: "description",
        content:
          "Review your tickets for BTS at Soldier Field, Chicago and pay securely.",
      },
      { property: "og:title", content: "Checkout — Review your order" },
      {
        property: "og:description",
        content: "Review your tickets and pay securely.",
      },
    ],
  }),
  component: CheckoutPage,
});

const TICKET_PRICE = 254.0;
const FEES = 42.64;
const QUANTITY = 2;
const SUBTOTAL = (TICKET_PRICE + FEES) * QUANTITY;
const PROMO_CODES = ["dreaming80", "messy80", "seat80tix", "purple80"];
const DISCOUNT = Math.round(SUBTOTAL * 0.8 * 100) / 100;

const money = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function DealBadge() {
  return (
    <div className="flex items-center gap-2">
      <img
        src={dealBadgeAsset.url}
        alt="Deal score 8"
        className="h-[19px] w-auto shrink-0 self-center object-contain"
      />
      <span className="text-[14px] font-semibold text-sg-green">Great Deal</span>
    </div>
  );
}

function DetailsToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-expanded={open}
      className="group flex shrink-0 items-center gap-1.5 outline-none"
    >
      <span className="text-[14px] text-sg-muted transition-colors group-active:text-sg-ink">
        Details
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sg-chip text-sg-blue transition-colors group-hover:bg-sg-line group-active:scale-95">
        <Chevron className="h-3 w-3" up={open} />
      </span>
    </button>
  );
}

function CheckoutPage() {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const discount = applied ? DISCOUNT : 0;
  const total = SUBTOTAL - discount;

  const applyCode = () => {
    const value = code.trim();
    if (!value) {
      setError("Enter a promo code");
      return;
    }
    if (!PROMO_CODES.includes(value.toLowerCase())) {
      setError("The promo code you entered could not be found");
      setApplied(null);
      return;
    }
    setApplied(value.toUpperCase());
    setError(null);
  };

  const removeCode = () => {
    setApplied(null);
    setCode("");
    setError(null);
    setPromoOpen(false);
  };

  const pay = () => {
    setPaying(true);
    window.setTimeout(() => setPaying(false), 1800);
  };

  useEffect(() => {
    if (!breakdownOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [breakdownOpen]);

  return (
    <div className="min-h-screen bg-white font-sans text-[15px] leading-[1.45] text-sg-ink antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col pb-[128px]">
        {/* Header */}
        <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 pb-2 pt-4">
          <SeatGeekLogo />
          <h1 className="truncate text-[16px] font-semibold">Checkout</h1>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sg-line bg-white text-[14px] font-semibold shadow-[0_1px_3px_rgba(17,24,39,0.08)]">
            S
          </span>
        </header>

        <div className="px-4 pt-2">
          <h2 className="text-[24px] font-bold leading-[1.2] tracking-[-0.02em]">
            Review your order
          </h2>
          <p className="mt-3.5 text-[16px] font-semibold leading-[1.35]">
            BTS
          </p>
          <p className="mt-1 text-[14px] text-sg-muted">Thu, Aug 27 at 8:00pm</p>
          <div className="mt-2.5 flex items-center justify-between gap-3 pb-3.5">
            <DealBadge />
            <DetailsToggle open={detailsOpen} onClick={() => setDetailsOpen((v) => !v)} />
          </div>
        </div>

        {/* Collapsible details */}
        <div
          className={`grid grid-cols-[100%] overflow-hidden border-t border-sg-line transition-[grid-template-rows,opacity] duration-300 ease-out ${
            detailsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 min-w-0">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-4">
              {[
                {
                  src: seatViewAsset.url,
                  alt: "View of the stage from Section 445, Row 24",
                },
                { src: mapOverviewAsset.url, alt: "Soldier Field seating map" },
                { src: mapZoomAsset.url, alt: "Zoomed map of Section 445, Row 24" },
              ].map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-[180px] w-[256px] shrink-0 snap-center rounded-[14px] bg-sg-map-bg object-cover"
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 px-4 pb-5">
              <div className="min-w-0">
                <p className="text-[15px] font-medium leading-[1.4]">Section 445, Row 24</p>
                <p className="mt-1 text-[14px] leading-[1.4] text-sg-muted">
                  Soldier Field, Chicago, IL
                </p>
              </div>
              <button
                aria-label="2 tickets"
                className="shrink-0 transition-transform active:scale-95"
              >
                <TicketChip count={QUANTITY} />
              </button>
            </div>
          </div>
        </div>

        {/* Delivery + protection */}
        <div className="space-y-4 border-t border-sg-line px-4 py-5">
          <div className="flex gap-3">
            <QrIcon className="mt-0.5 h-[18px] w-[18px] shrink-0" />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-[1.4]">Mobile tickets</p>
              <p className="mt-1 text-[14px] leading-[1.45] text-sg-ink">
                Tickets will be delivered to your email address by Aug 26.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-[19px] w-[18px] shrink-0" />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-[1.4]">Every ticket protected</p>
              <p className="mt-1 text-[14px] leading-[1.45] text-sg-ink">
                If something comes up with your event, we've got you covered.{" "}
                <button className="underline underline-offset-2">Learn more</button>
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-sg-line px-4 pt-5">
          <p className="text-[15px] font-semibold">Contact</p>
          <div className="mt-2.5 flex items-center justify-between gap-3 rounded-[12px] border border-sg-line px-3.5 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-[14px]">sarahjohnsonxx22@gmail.com</p>
              <p className="mt-0.5 text-[14px] text-sg-muted">(351) 333-1408</p>
            </div>
            <button className="shrink-0 rounded-full bg-sg-chip px-4 py-2 text-[13px] font-semibold transition-colors active:bg-sg-line">
              Edit
            </button>
          </div>

          {/* Payment */}
          <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
            <p className="shrink-0 text-[15px] font-semibold">Payment method</p>
            <div className="no-scrollbar min-w-0 overflow-x-auto">
              <PayBrands className="justify-end" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-3 rounded-[12px] border border-sg-line px-3.5 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-[22px] shrink-0 items-center gap-[2px] rounded-[5px] border border-sg-line px-1.5">
                <AppleLogo className="h-2.5 text-sg-ink" />
                <span className="text-[10px] font-medium">Pay</span>
              </span>
              <span className="truncate text-[15px]">Apple Pay</span>
            </div>
            <button className="shrink-0 rounded-full bg-sg-chip px-4 py-2 text-[13px] font-semibold transition-colors active:bg-sg-line">
              Edit
            </button>
          </div>

          {/* Legal */}
          <div className="mt-8 space-y-4 text-[13px] leading-[1.5]">
            <p>
              By placing an order, you acknowledge you're making a purchase on SeatGeek's
              resale marketplace. All purchases are final, with your tickets backed by our{" "}
              <button className="text-sg-link underline underline-offset-2">
                Buyer Guarantee
              </button>{" "}
              in case of cancellation or postponement. Prices set by the seller may be above
              or below the original ticket price.
            </p>
            <p>
              By clicking the "Pay" button below, you agree to our{" "}
              <button className="text-sg-link underline underline-offset-2">
                Terms of Use
              </button>
              , and acknowledge having read our{" "}
              <button className="text-sg-link underline underline-offset-2">
                Privacy Notice
              </button>
              .
            </p>
          </div>

          <div className="mt-7 flex items-center justify-between gap-3 pb-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <ShieldCheck className="h-[19px] w-[18px] shrink-0" />
              <span className="truncate text-[14px] font-semibold">
                Every ticket protected
              </span>
            </div>
            <button className="shrink-0 text-[13px] underline underline-offset-2">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-sg-line bg-white px-4 pb-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold">Total ${money(total)}</p>
          <DetailsToggle open={breakdownOpen} onClick={() => setBreakdownOpen((v) => !v)} />
        </div>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
            breakdownOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="pt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold">Price breakdown</p>
                <DealBadge />
              </div>
              <dl className="mt-2 space-y-1 text-[14px]">
                <div className="flex items-center justify-between gap-3">
                  <dt>Tickets</dt>
                  <dd>${money(TICKET_PRICE)} x {QUANTITY}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt>Fees</dt>
                  <dd>${money(FEES)} x {QUANTITY}</dd>
                </div>
                {applied && (
                  <div className="flex items-center justify-between gap-3 text-sg-green">
                    <dt>Ratingfeed promo code applied!</dt>
                    <dd className="shrink-0">-${money(DISCOUNT)}</dd>
                  </div>
                )}
              </dl>

              {/* Promo code */}
              {applied ? (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-[10px] border border-sg-green/40 bg-sg-green/8 px-3.5 py-2.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sg-green text-white">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                        <path
                          d="M3.5 8.5 6.5 11.5 12.5 4.8"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-sg-green">
                        Promo code applied
                      </p>
                      <p className="truncate text-[12px] text-sg-muted">Code: {applied}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCode}
                    className="shrink-0 text-[13px] font-semibold underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
              ) : promoOpen ? (
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setPromoOpen(false);
                      setError(null);
                    }}
                    className="mb-2 block text-[14px] underline underline-offset-[3px]"
                  >
                    Close
                  </button>
                  <div
                    className={`flex items-center gap-2 rounded-[10px] border px-3.5 py-2 transition-colors ${
                      error ? "border-sg-error" : "border-sg-line"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor="promo"
                        className="block text-[12px] leading-none text-sg-muted"
                      >
                        Promo code
                      </label>
                      <input
                        id="promo"
                        value={code}
                        maxLength={40}
                        onChange={(e) => {
                          setCode(e.target.value);
                          if (error) setError(null);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && applyCode()}
                        className="mt-1 w-full bg-transparent text-[15px] outline-none placeholder:text-sg-muted"
                      />
                    </div>
                    <button
                      onClick={applyCode}
                      className={`shrink-0 rounded-[8px] px-4 py-2 text-[14px] font-semibold transition-colors ${
                        code.trim()
                          ? "border border-sg-line bg-white text-sg-ink active:bg-sg-chip"
                          : "bg-sg-chip text-sg-muted"
                      }`}
                    >
                      Add
                    </button>
                  </div>
                  {error && (
                    <p className="mt-1.5 flex items-center gap-2 text-[13px] text-sg-error">
                      <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-sg-error text-[11px] font-bold text-white">
                        !
                      </span>
                      {error}
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setPromoOpen(true)}
                  className="mt-2.5 block text-[14px] underline underline-offset-[3px]"
                >
                  Add promo code
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={pay}
          disabled={paying}
          className="mt-3 flex h-[52px] w-full items-center justify-center gap-1 rounded-[10px] bg-sg-ink text-white transition-transform active:scale-[0.99] disabled:opacity-90"
        >
          {paying ? (
            <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-white/30 border-t-white" />
          ) : (
            <>
              <AppleLogo className="h-[21px]" />
              <span className="text-[22px] font-medium tracking-[-0.01em]">Pay</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
