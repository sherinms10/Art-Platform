import {
  ArrowUpRight,
  AtSign,
  Mail,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-[#11100e] px-6 py-24 text-white sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Get In Touch
          </p>

          <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Have an idea?
            <br />
            <span className="italic">Let's make it art.</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            Whether you already have a reference photo or just an idea in
            mind, feel free to reach out. We'd love to hear what you're
            imagining.
          </p>
        </div>

        {/* Contact grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-white/10 p-7 transition duration-300 hover:border-white/25 hover:bg-white/3"
          >
            <div className="flex items-center justify-between">
              <MessageCircle
                size={22}
                strokeWidth={1.4}
                className="text-white/60"
              />

              <ArrowUpRight
                size={18}
                className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </div>

            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-white/30">
              WhatsApp
            </p>

            <p className="mt-2 text-base font-light">
              Chat with the artist
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@example.com"
            className="group rounded-3xl border border-white/10 p-7 transition duration-300 hover:border-white/25 hover:bg-white/3"
          >
            <div className="flex items-center justify-between">
              <Mail
                size={22}
                strokeWidth={1.4}
                className="text-white/60"
              />

              <ArrowUpRight
                size={18}
                className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </div>

            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-white/30">
              Email
            </p>

            <p className="mt-2 text-base font-light">
              hello@example.com
            </p>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-white/10 p-7 transition duration-300 hover:border-white/25 hover:bg-white/3"
          >
            <div className="flex items-center justify-between">
              <AtSign
                size={22}
                strokeWidth={1.4}
                className="text-white/60"
              />

              <ArrowUpRight
                size={18}
                className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </div>

            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-white/30">
              Instagram
            </p>

            <p className="mt-2 text-base font-light">
              Follow the artwork
            </p>
          </a>
        </div>

        {/* Main CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-white/40">
              Ready to turn your photo into art?
            </p>

            <p className="mt-1 text-lg font-light">
              Start your custom artwork request.
            </p>
          </div>

          <a
            href="/request-artwork"
            className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Request Custom Artwork

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;