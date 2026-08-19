import { ArrowUpRight } from "lucide-react";

const AboutArtist = () => {
  return (
    <section
      id="about"
      className="bg-[#f4f1eb] px-6 py-24 sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="aspect-4/5 overflow-hidden rounded-4xl">
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85"
                alt="Artist working on artwork"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-5 -right-3 rounded-2xl bg-[#11100e] px-6 py-5 text-white shadow-xl sm:-right-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                The Artist
              </p>

              <p className="mt-1 text-sm font-light">
                Creating with intention.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              Behind The Art
            </p>

            <h2 className="mt-5 max-w-2xl text-4xl font-light leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Every portrait
              <br />
              has a <span className="italic">story.</span>
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-neutral-500 sm:text-base">
              <p>
                Art has always been more than just an image. It's a way of
                holding on to a person, a place, or a moment that matters.
              </p>

              <p>
                That's why every custom artwork is created with patience and
                attention to the little details that make your memory yours.
              </p>

              <p>
                Whether it's a portrait of someone you love, a beloved pet, or
                a special moment, the goal is simple — create something you'll
                want to keep for years.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 flex items-end justify-between border-t border-neutral-200 pt-7">
              <div>
                <p className="font-serif text-2xl italic text-neutral-800">
                  Your Artist
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Artist & Creator
                </p>
              </div>

              <a
                href="#contact"
                className="group flex items-center gap-2 text-sm text-neutral-700 transition hover:text-neutral-950"
              >
                Get to know the artist
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutArtist;