/* eslint-disable @next/next/no-img-element */
"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  onStartProject: () => void; // opens QuoteModal
};

// ✅ Use relative path everywhere for navigation
const REF_PATH = "/referrals";
// ✅ Only used for display text (optional)
const REF_URL_PROD = "https://dezeniodraftdesign.com/referrals";

export default function ReferralModal({
  open,
  onClose,
  onStartProject,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/65 backdrop-blur-sm">
      <div className="w-[980px] max-w-[94vw] rounded-2xl bg-neutral-900/85 text-white shadow-2xl ring-1 ring-white/15 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold">Referral Rewards</h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-white/80 hover:bg-white/10"
          >
            ✕ Close
          </button>
        </div>

        <div className="grid gap-6 px-6 pb-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-white/80">
              Share us with a neighbor or friend. When they book a qualifying
              project, you’ll receive a reward.
            </p>

            <h3 className="mt-5 text-sm font-semibold tracking-wide text-white/70">
              How it works
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>Send them this page or let them scan the QR.</li>
              <li>
                If they sign a qualifying project, you choose your reward.
              </li>
              <li>
                Rewards are issued after contract signing and first invoice.
              </li>
            </ul>

            <h3 className="mt-5 text-sm font-semibold tracking-wide text-white/70">
              Rewards
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>
                <b>Cash or Gift Card</b> — simple “thank you,” great for small
                projects.
              </li>
              <li>
                <b>Credit on Your Next Project</b> — apply toward design, docs,
                or cabinetry.
              </li>
              <li>
                <b>Priority Scheduling</b> — we fast-track referred projects and
                your next one.
              </li>
            </ul>

            <p className="mt-4 text-[11px] text-white/50">
              *Reward value depends on project scope. Priority scheduling places
              your project (and the referral) into the next available slot,
              ahead of general inquiries. Rewards are issued after the referred
              project is signed and invoiced. Cash/gift alternatives available
              on request.
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 text-center text-black ring-1 ring-black/10">
            <img
              // ✅ Pass RELATIVE path so QR route forces production domain.
              src={`/api/qr?data=${encodeURIComponent(REF_PATH)}&v=4`}
              alt="Referral QR"
              width={360}
              height={360}
              loading="eager"
              decoding="async"
              className="mx-auto block"
            />

            <p className="mt-2 text-xs">
              Scan or share:{" "}
              <a href={REF_PATH} className="underline">
                {REF_URL_PROD}
              </a>
            </p>

            <div className="mt-4 space-y-2">
              <a
                className="block rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
                href="tel:16154742004"
              >
                Call (615) 474-2004
              </a>

              <a
                className="block rounded-full border border-black/15 px-4 py-2 text-sm font-semibold hover:bg-black/5"
                href="mailto:info@dezeniodraftdesign.com?subject=Referral"
              >
                Email Referral
              </a>

              <button
                onClick={() => {
                  onClose();
                  onStartProject();
                }}
                className="block w-full rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
