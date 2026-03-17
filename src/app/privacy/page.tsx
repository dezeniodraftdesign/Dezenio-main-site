import Image from "next/image";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

export const metadata = {
  title: "Privacy Policy | Dezenio Draft Design",
  description:
    "Privacy policy for Dezenio Draft Design, Inc. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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

      <Header />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Legal
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-white/70">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-white/85">
          <section>
            <h2 className="text-lg font-semibold text-white">Overview</h2>
            <p className="mt-2 leading-7">
              Dezenio Draft Design, Inc. (“we,” “us,” “our”) respects your
              privacy. This policy explains what information we collect, how we
              use it, and the choices you have when you visit our website or
              contact us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Information We Collect
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7">
              <li>
                <strong className="text-white">Contact information</strong> you
                provide (name, email, phone, address, project details).
              </li>
              <li>
                <strong className="text-white">Files and images</strong> you
                choose to send (drawings, inspiration photos, measurements,
                attachments).
              </li>
              <li>
                <strong className="text-white">Website usage data</strong>{" "}
                (basic analytics like pages viewed, approximate location,
                device/browser type). This may be collected by standard
                analytics tools or hosting providers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              How We Use Information
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7">
              <li>To respond to inquiries and provide quotes or estimates.</li>
              <li>
                To communicate about scheduling, design decisions, and project
                coordination.
              </li>
              <li>To improve our website and customer experience.</li>
              <li>
                To comply with legal obligations and protect against fraud or
                misuse.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Sharing of Information
            </h2>
            <p className="mt-2 leading-7">
              We do not sell your personal information. We may share information
              only when needed to operate our business, such as with:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7">
              <li>
                Service providers (hosting, email, forms, analytics) who help us
                run our website.
              </li>
              <li>
                Trade partners or vendors when necessary to coordinate materials
                or services.
              </li>
              <li>
                Legal authorities if required by law or to protect rights and
                safety.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Data Retention</h2>
            <p className="mt-2 leading-7">
              We retain information as long as needed to provide services,
              maintain records, and meet legal or business requirements. You can
              request deletion of certain information (subject to lawful
              recordkeeping needs).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Cookies &amp; Tracking
            </h2>
            <p className="mt-2 leading-7">
              Our site may use cookies or similar technologies for basic
              functionality and analytics. You can control cookies through your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Security</h2>
            <p className="mt-2 leading-7">
              We use reasonable safeguards to protect information. No method of
              transmission or storage is 100% secure, so we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Your Choices</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7">
              <li>
                You may request access, correction, or deletion of your
                information.
              </li>
              <li>
                You may opt out of non-essential communications at any time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2 leading-7">
              Questions about this policy? Contact us at{" "}
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
