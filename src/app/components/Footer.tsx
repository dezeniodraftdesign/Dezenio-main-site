"use client";

const REF_URL_PROD = "https://dezeniodraftdesign.com/referrals";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      {/* Top grid with company + links */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <h4 className="text-sm font-semibold text-white">
            Dezenio Draft Design, Inc.
          </h4>
          <p className="mt-3 text-sm text-white/70">
            Permit-focused construction docs, site planning, and full house
            design.
          </p>
          <p className="mt-4 text-sm text-white/70">
            (615) 474-2004
            <br />
            info@dezeniodraftdesign.com
            <br />
            Nashville, Tennessee
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-white">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://dezeniocabinetry.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Cabinetry
              </a>
            </li>
            {/* force absolute prod URL */}
            <li>
              <a href={REF_URL_PROD} className="hover:text-white">
                Referral Rewards
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-white">Services</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>Construction Documents</li>
            <li>Design &amp; Remodeling</li>
            <li>3D Renderings</li>
            <li>Cabinetry: Design &amp; Install</li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-white">Legal</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Licensing
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social media icons row */}
      <div className="flex justify-center space-x-6 pb-6">
        <a
          href="https://www.facebook.com/dezeniodraftdesign"
          target="_blank"
          rel="noreferrer"
          className="text-white/70 hover:text-white"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.8c1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.4.7-1.4 1.3V12H16l-.5 3h-2.2v7A10 10 0 0022 12z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/dezeniodraftdesign"
          target="_blank"
          rel="noreferrer"
          className="text-white/70 hover:text-white"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.3A4.7 4.7 0 107 12a4.7 4.7 0 005-4.7zm0 7.7A3 3 0 1115 12a3 3 0 01-3 3zm4.8-8.8a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2z" />
          </svg>
        </a>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Dezenio Draft Design, Inc. All rights
        reserved.
      </div>
    </footer>
  );
}
