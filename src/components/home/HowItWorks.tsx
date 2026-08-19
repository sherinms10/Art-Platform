import { ArrowDown, ArrowUpRight, Image, Palette, Send, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Palette,
    title: "Choose a style",
    description:
      "Explore our sample artworks and find a style that feels right for you.",
  },
  {
    number: "02",
    icon: Image,
    title: "Share your reference",
    description:
      "Upload your photo or reference image and tell us how you'd like your artwork.",
  },
  {
    number: "03",
    icon: Send,
    title: "Get your quote",
    description:
      "We'll review your request and send you a personalized price and estimated timeline.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Made just for you",
    description:
      "Once you approve the quote, our artist creates your custom artwork with care.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="process"
      className="bg-[#11100e] px-6 py-24 text-white sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
              Simple Process
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              From a memory
              <br />
              to a <span className="italic">masterpiece.</span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/50 sm:text-base">
            You don't need to know exactly what you want. Start with a style
            you love, share your idea with us, and we'll help turn it into
            something personal.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 border-t border-white/10">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group grid gap-8 border-b border-white/10 py-10 md:grid-cols-[100px_70px_1fr_auto] md:items-center md:gap-8 lg:py-12"
              >
                {/* Number */}
                <span className="text-xs tracking-[0.2em] text-white/30">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/60 transition duration-300 group-hover:border-white/30 group-hover:text-white">
                  <Icon size={19} strokeWidth={1.4} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-light sm:text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.2}
                    className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-6 text-white/40">
            Have a photo you've been wanting to turn into art?
            <span className="text-white/70"> Let's create it.</span>
          </p>

          <a
            href="#request"
            className="group flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Start Your Artwork
            <ArrowDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;