import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "border-b border-white/10 bg-[#11100e]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <a href="/" className="group">
          <span className="text-xl font-semibold tracking-[0.25em] text-white">
            ART<span className="font-light">É</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="/#artworks"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Artworks
          </a>

          <a
            href="/#process"
            className="text-sm text-white/70 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="/#about"
            className="text-sm text-white/70 transition hover:text-white"
          >
            About
          </a>

          <a
            href="/#contact"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Desktop CTA */}
        <a
          href="/request-artwork"
          className="hidden rounded-full border border-white/30 px-5 py-2.5 text-sm text-white transition hover:bg-white hover:text-black md:block"
        >
          Request Artwork
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-[#11100e]/95 p-6 shadow-2xl backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-5">
            <a
              href="/#artworks"
              onClick={() => setIsOpen(false)}
              className="text-sm text-white/70 transition hover:text-white"
            >
              Artworks
            </a>

            <a
              href="/#process"
              onClick={() => setIsOpen(false)}
              className="text-sm text-white/70 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="text-sm text-white/70 transition hover:text-white"
            >
              About
            </a>

            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="text-sm text-white/70 transition hover:text-white"
            >
              Contact
            </a>

            <a
              href="/request-artwork"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Request Artwork
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;