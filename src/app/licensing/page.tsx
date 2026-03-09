import Image from "next/image";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

export const metadata = {
  title: "Licensing & Disclosures | Dezenio Draft Design",
  description:
    "Licensing, warranty, and service disclosures for Dezenio Draft Design, Inc. Cabinetry design, ordering support, and installation details.",
};

export default function LicensingPage() {
  const updated = "February 25, 2026";

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      {/* Background (admin/legal style) */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 1.7%" }}
        />
        <div className="absolute inset-0 bg-black/69" />
      </div>

      {/* ✅ server page: no event handler props */}
      <Header />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Legal
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
          Licensing &amp; Disclosures
        </h1>

        <p className="mt-3 text-sm text-white/70">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-white/85">
          <section>
            <h2 className="text-lg font-semibold text-white">Company</h2>
            <p className="mt-2 leading-7">
              Dezenio Draft Design, Inc. provides design services, construction
              documentation, and cabinetry-related services including design
              support, ordering coordination, and installation (where
              applicable).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Authorized Dealer
            </h2>
            <p className="mt-2 leading-7">
              We are an authorized dealer for select cabinetry lines and can
              support custom kitchens and cabinetry packages. Specific brands,
              finishes, lead times, and availability vary by manufacturer and
              are confirmed during quoting.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Permits &amp; Trade Work
            </h2>
            <p className="mt-2 leading-7">
              Permit requirements and trade scope vary by jurisdiction and
              project type. If a project requires licensed trade work
              (electrical, plumbing, HVAC, etc.) or specific permitting, those
              services may be provided by you, by your builder/GC, or by
              qualified trade partners as applicable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Measurements &amp; Field Conditions
            </h2>
            <p className="mt-2 leading-7">
              Cabinetry and installation outcomes depend on accurate site
              conditions and measurements. When we measure, we do so with care;
              however, final field conditions (walls out of plumb, floors out of
              level, structural changes, hidden conditions) can affect fit and
              may require adjustments or additional work.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Warranties</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7">
              <li>
                <strong className="text-white">Manufacturer Warranty:</strong>{" "}
                Cabinetry products are covered by the manufacturer’s warranty
                (terms vary by brand).
              </li>
              <li>
                <strong className="text-white">Installation Warranty:</strong>{" "}
                We provide a one-year workmanship warranty on installation labor
                (from the date of completion), excluding product defects and
                normal wear.
              </li>
              <li>
                <strong className="text-white">Damage/Defects:</strong> Visible
                shipping damage should be reported promptly. Factory defects and
                replacement part lead times are determined by the manufacturer.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Estimates &amp; Lead Times
            </h2>
            <p className="mt-2 leading-7">
              Quotes and lead times are subject to manufacturer updates, finish
              availability, and production schedules. We confirm lead time
              expectations during the ordering process, but manufacturer changes
              are outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2 leading-7">
              If you have questions about licensing or disclosures, email{" "}
              <a
                className="underline underline-offset-4 hover:text-white"
                href="mailto:info@dezeniodraftdesign.com"
              >
                info@dezeniodraftdesign.com
              </a>
              .
            </p>
          </section>

          <section>
            <p className="text-xs text-white/55">
              This page is provided for general informational purposes and does
              not constitute legal advice.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
