import Image from "next/image";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

export const metadata = {
  title: "Terms of Use | Dezenio Draft Design",
  description:
    "Website terms of use for Dezenio Draft Design, Inc. Conditions for using this site and requesting services.",
};

export default function TermsPage() {
  const updated = "February 25, 2026";

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      {/* Background (admin/legal style with mobile crop fix) */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[3.15] object-[2%_-28%] md:scale-100 md:object-[50%_1.7%]"
        />
        <div className="absolute inset-0 bg-black/69" />
      </div>

      {/* IMPORTANT: no function props from server components */}
      <Header />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Legal
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
          Terms of Use
        </h1>

        <p className="mt-3 text-sm text-white/70">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-white/85">
          <section>
            <h2 className="text-lg font-semibold text-white">Agreement</h2>
            <p className="mt-2 leading-7">
              By accessing this website, you agree to these Terms of Use. If you
              do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Information on This Site
            </h2>
            <p className="mt-2 leading-7">
              Content on this site is provided for general informational
              purposes only and may be updated without notice. Project-specific
              pricing, schedules, and scope are confirmed only through written
              proposals, estimates, or signed agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Quotes, Estimates, and Scope
            </h2>
            <p className="mt-2 leading-7">
              Any quote or estimate provided is based on information available
              at the time and may change if project conditions, measurements,
              specifications, selections, availability, or lead times change.
              Final scope and pricing are established in writing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Intellectual Property
            </h2>
            <p className="mt-2 leading-7">
              Website content (text, images, branding) is owned by Dezenio Draft
              Design, Inc. or used with permission. You may not copy, reproduce,
              or distribute content without written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              User Submissions
            </h2>
            <p className="mt-2 leading-7">
              If you submit files or information (photos, drawings, addresses,
              measurements), you confirm you have the right to share them and
              grant us permission to use them solely for evaluating your inquiry
              and providing services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Third-Party Links
            </h2>
            <p className="mt-2 leading-7">
              This site may include links to third-party websites. We are not
              responsible for their content, policies, or practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Disclaimers</h2>
            <p className="mt-2 leading-7">
              This website is provided “as is” without warranties of any kind.
              We do not guarantee that the site will be uninterrupted or
              error-free. To the maximum extent allowed by law, we disclaim
              liability for damages arising from use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Limitation of Liability
            </h2>
            <p className="mt-2 leading-7">
              To the fullest extent permitted by law, Dezenio Draft Design, Inc.
              will not be liable for any indirect, incidental, special, or
              consequential damages. Liability for services, if any, is governed
              by the signed agreement for that project.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2 leading-7">
              Questions? Email{" "}
              <a
                className="underline underline-offset-4 hover:text-white"
                href="mailto:info@dezeniodraftdesign.com"
              >
                info@dezeniodraftdesign.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
