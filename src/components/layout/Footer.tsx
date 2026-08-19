import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#11100e] px-6 pb-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top section */}
        <div className="border-t border-white/10 pt-16 sm:pt-20 lg:pt-24">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-20">
            {/* Brand */}
            <div>
              <a
                href="/"
                className="inline-block text-2xl font-semibold tracking-[0.25em]"
              >
                ART<span className="font-light">É</span>
              </a>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/40">
                Custom artwork created from your memories, photographs, and
                ideas — made personally for you.
              </p>

              <a
                href="/request-artwork"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Request Artwork

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Explore */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Explore
              </p>

              <nav className="mt-6 flex flex-col gap-4">
                <a
                  href="/#artworks"
                  className="w-fit text-sm text-white/60 transition hover:text-white"
                >
                  Artworks
                </a>

                <a
                  href="/#how-it-works"
                  className="w-fit text-sm text-white/60 transition hover:text-white"
                >
                  How It Works
                </a>

                <a
                  href="/#about"
                  className="w-fit text-sm text-white/60 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="/#contact"
                  className="w-fit text-sm text-white/60 transition hover:text-white"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Connect */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Connect
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-fit items-center gap-3 text-sm text-white/60 transition hover:text-white"
                >
                  <MessageCircle
                    size={17}
                    strokeWidth={1.4}
                  />

                  WhatsApp

                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>

                <a
                  href="mailto:hello@example.com"
                  className="group flex w-fit items-center gap-3 text-sm text-white/60 transition hover:text-white"
                >
                  <Mail
                    size={17}
                    strokeWidth={1.4}
                  />

                  Email

                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>

                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-fit items-center gap-3 text-sm text-white/60 transition hover:text-white"
                >
                  <span className="flex h-4.25 w-4.25 items-center justify-center text-xs">
                    @
                  </span>

                  Instagram

                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {currentYear} ARTÉ. All rights reserved.
          </p>

          <p className="text-xs text-white/30">
            Made with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;