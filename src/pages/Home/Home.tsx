import Navbar from "../../components/layout/Navbar";
import FeaturedArtworks from "../../components/artwork/FeaturedArtworks";
import HowItWorks from "../../components/home/HowItWorks";
import AboutArtist from "../../components/home/AboutArtist";
import Contact from "../../components/home/Contact";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#11100e] text-white">
      {/* Fixed Navbar */}
      {/* <div className="fixed left-0 right-0 top-0 z-50"> */}
        <Navbar />
      {/* </div> */}

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background artwork */}
        <img
          src="https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=2000&q=85"
          alt="Artist working on a painting"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-transparent" />

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-20 pt-32 lg:px-8 lg:pb-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-white/70">
              Custom Art · Made For You
            </p>

            <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Turn your
              <br />
              <span className="italic">memories</span> into art.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Choose a style you love, share your reference, and let our
              artist create something uniquely yours.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#artworks"
                className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-medium text-black transition hover:bg-white/90"
              >
                Explore Artworks
              </a>

              <a
                href="/request-artwork"
                className="rounded-full border border-white/40 px-7 py-3.5 text-center text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                Request Custom Art
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50 lg:flex">
          <span>Scroll</span>
          <span className="h-px w-12 bg-white/40" />
        </div>
      </section>

      {/* Main Sections */}
      <FeaturedArtworks />

      <HowItWorks />

      <AboutArtist />

      <Contact />

      <Footer />
    </main>
  );
};

export default Home;