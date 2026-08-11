import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import seatViewAsset from "@/assets/seatview.jpg.asset.json";
import {
  AppleLogo,
  ArenaOverview,
  ArenaZoom,
  Chevron,
  PayBrands,
  QrIcon,
  SeatGeekLogo,
  ShieldCheck,
  TicketIcon,
} from "@/components/checkout/graphics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Checkout — Review your order" },
      {
        name: "description",
        content:
          "Review your tickets for Olivia Dean with Baby Rose at State Farm Arena and pay securely.",
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

const TICKET_PRICE = 405.0;
const FEES = 67.75;
const TAX = 42.07;
const PROMO_CODE = "student201";
const DISCOUNT = 465.0;

const money = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function DealBadge() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-sg-green-badge text-[13px] font-semibold text-white">
        8
      </span>
      <span className="text-[17px] font-semibold text-sg-green">Great Deal</span>
    </div>
  );
}

function DetailsToggle({
  open,
  onClick,
  muted = false,
}: {
  open: boolean;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-expanded={open}
      className="group flex items-center gap-2 outline-none"
    >
      <span
        className={`text-[17px] ${muted ? "text-sg-muted" : "text-sg-muted"} transition-colors group-active:text-sg-ink`}
      >
        Details
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sg-chip text-sg-blue transition-colors group-hover:bg-sg-line group-active:scale-95">
        <Chevron className="h-3.5 w-3.5" up={open} />
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
  const total = TICKET_PRICE + FEES + TAX - discount;

  const applyCode = () => {
    const value = code.trim();
    if (!value) {
      setError("Enter a promo code");
      return;
    }
    if (value.toLowerCase() !== PROMO_CODE) {
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
  };

  const pay = () => {
    setPaying(true);
    window.setTimeout(() => setPaying(false), 1800);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-sg-ink antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col pb-[150px]">
        {/* Header */}
        <header className="flex items-center gap-4 px-5 pb-2 pt-5">
          <SeatGeekLogo />
          <h1 className="text-[19px] font-semibold">Checkout</h1>
          <span className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-sg-line bg-white text-[17px] font-semibold shadow-[0_1px_3px_rgba(17,24,39,0.08)]">
            S
          </span>
        </header>

        <div className="px-5 pt-3">
          <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em]">
            Review your order
          </h2>
          <p className="mt-5 text-[19px] font-semibold leading-tight">
            Olivia Dean with Baby Rose
          </p>
          <p className="mt-1.5 text-[18px] text-sg-muted">Sat, Aug 22 at 8:00pm</p>
          <div className="mt-3 flex items-center justify-between pb-4">
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
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 py-6">
              <img
                src={seatViewAsset.url}
                alt="View of the stage from Section 226, Row E"
                width={1024}
                height={768}
                className="h-[178px] w-[248px] shrink-0 snap-center rounded-[14px] object-cover"
              />
              <div className="h-[178px] w-[248px] shrink-0 snap-center overflow-hidden rounded-[14px] bg-sg-map-bg">
                <ArenaOverview className="h-full w-full" />
              </div>
              <div className="h-[178px] w-[248px] shrink-0 snap-center overflow-hidden rounded-[14px] bg-sg-map-bg">
                <ArenaZoom className="h-full w-full" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 px-5 pb-7">
              <div>
                <p className="text-[20px] font-medium leading-tight">Section 226, Row E</p>
                <p className="mt-1.5 text-[19px] text-sg-muted">
                  State Farm Arena, Atlanta, GA
                </p>
              </div>
              <button className="flex h-[54px] shrink-0 items-center gap-2 rounded-[12px] bg-sg-chip px-4 transition-colors hover:bg-sg-line active:bg-sg-line">
                <TicketIcon className="h-[18px] w-6 text-sg-ink" />
                <span className="text-[19px] font-medium">1</span>
                <Chevron className="h-3.5 w-3.5 text-sg-ink" />
              </button>
            </div>
          </div>
        </div>

        {/* Delivery + protection */}
        <div className="space-y-5 border-t border-sg-line px-5 py-6">
          <div className="flex gap-4">
            <QrIcon className="mt-1 h-[19px] w-[19px] shrink-0 text-sg-ink" />
            <div>
              <p className="text-[18px] font-semibold leading-tight">Mobile tickets</p>
              <p className="mt-1.5 text-[17px] leading-[1.35] text-sg-ink/85">
                Tickets will be delivered to your email address by Aug 21.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <ShieldCheck className="mt-0.5 h-[21px] w-[19px] shrink-0 text-sg-ink" />
            <div>
              <p className="text-[18px] font-semibold leading-tight">Every ticket protected</p>
              <p className="mt-1.5 text-[17px] leading-[1.35] text-sg-ink/85">
                If something comes up with your event, we've got you covered.{" "}
                <button className="underline underline-offset-2">Learn more</button>
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-sg-line px-5 pt-6">
          <p className="text-[19px] font-semibold">Contact</p>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[14px] border border-sg-line px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-[17px]">sarahjohnsonxx22@gmail.com</p>
              <p className="mt-0.5 text-[17px] text-sg-muted">(713) 441-5452</p>
            </div>
            <button className="shrink-0 rounded-full bg-sg-chip px-5 py-2.5 text-[16px] font-semibold transition-colors active:bg-sg-line">
              Edit
            </button>
          </div>

          {/* Payment */}
          <div className="mt-7 flex items-center justify-between gap-3">
            <p className="shrink-0 text-[19px] font-semibold">Payment method</p>
            <PayBrands />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[14px] border border-sg-line px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-[26px] items-center gap-[2px] rounded-[5px] border border-sg-line px-1.5">
                <AppleLogo className="h-3 text-sg-ink" />
                <span className="text-[11px] font-medium">Pay</span>
              </span>
              <span className="text-[19px]">Apple Pay</span>
            </div>
            <button className="shrink-0 rounded-full bg-sg-chip px-5 py-2.5 text-[16px] font-semibold transition-colors active:bg-sg-line">
              Edit
            </button>
          </div>

          {/* Legal */}
          <div className="mt-10 space-y-5 text-[17px] leading-[1.45]">
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

          <div className="mt-9 flex items-center justify-between pb-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-[21px] w-[19px] text-sg-ink" filled={false} />
              <span className="text-[18px] font-semibold">Every ticket protected</span>
            </div>
            <button className="text-[17px] underline underline-offset-2">Learn more</button>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-sg-line bg-white px-5 pb-5 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-[19px]">
            <span className="font-semibold">Total</span>{" "}
            <span className="font-semibold">${money(total)}</span>
          </p>
          <DetailsToggle open={breakdownOpen} onClick={() => setBreakdownOpen((v) => !v)} />
        </div>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
            breakdownOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="pt-5">
              <div className="flex items-center justify-between">
                <p className="text-[19px] font-semibold">Price breakdown</p>
                <DealBadge />
              </div>
              <dl className="mt-2.5 space-y-1.5 text-[18px]">
                <div className="flex items-center justify-between">
                  <dt>Tickets</dt>
                  <dd>${money(TICKET_PRICE)} x 1</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Fees</dt>
                  <dd>${money(FEES)} x 1</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Tax</dt>
                  <dd>${money(TAX)}</dd>
                </div>
                {applied && (
                  <div className="flex items-center justify-between text-sg-green">
                    <dt>Mastersaver.site Discount Applied!</dt>
                    <dd>-${money(DISCOUNT)}</dd>
                  </div>
                )}
              </dl>
              <button
                onClick={() => setBreakdownOpen(false)}
                className="mt-3 text-[19px] underline underline-offset-[3px]"
              >
                Close
              </button>

              {/* Promo code */}
              {applied ? (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-[12px] border border-sg-green/40 bg-sg-green/8 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sg-green text-white">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                        <path
                          d="M3.5 8.5 6.5 11.5 12.5 4.8"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[16px] font-semibold text-sg-green">
                        Promo code applied
                      </p>
                      <p className="text-[14px] text-sg-muted">Code: {applied}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCode}
                    className="text-[16px] font-semibold underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
              ) : promoOpen ? (
                <div className="mt-4">
                  <div
                    className={`flex items-center gap-2 rounded-[12px] border px-4 py-2 transition-colors ${
                      error ? "border-sg-error" : "border-sg-line"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor="promo"
                        className="block text-[14px] leading-none text-sg-muted"
                      >
                        Promo code
                      </label>
                      <input
                        id="promo"
                        autoFocus
                        value={code}
                        maxLength={40}
                        onChange={(e) => {
                          setCode(e.target.value);
                          if (error) setError(null);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && applyCode()}
                        className="mt-1 w-full bg-transparent text-[19px] outline-none placeholder:text-sg-muted"
                      />
                    </div>
                    <button
                      onClick={applyCode}
                      className={`shrink-0 rounded-[10px] px-5 py-2.5 text-[17px] font-semibold transition-colors ${
                        code.trim()
                          ? "border border-sg-line bg-white text-sg-ink active:bg-sg-chip"
                          : "bg-sg-chip text-sg-muted"
                      }`}
                    >
                      Add
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 flex items-center gap-2 text-[17px] text-sg-error">
                      <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-sg-error text-[13px] font-bold text-white">
                        !
                      </span>
                      {error}
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setPromoOpen(true)}
                  className="mt-3 block text-[19px] underline underline-offset-[3px]"
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
          className="mt-4 flex h-[62px] w-full items-center justify-center gap-1 rounded-[12px] bg-sg-ink text-white transition-transform active:scale-[0.99] disabled:opacity-90"
        >
          {paying ? (
            <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-white/30 border-t-white" />
          ) : (
            <>
              <AppleLogo className="h-[26px]" />
              <span className="text-[27px] font-medium tracking-[-0.01em]">Pay</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
