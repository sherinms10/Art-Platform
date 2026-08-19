import { artworks } from "../../data/artworks";
import ArtworkCard from "./ArtworkCard";

const FeaturedArtworks = () => {
  return (
    <section
      id="artworks"
      className="bg-[#f4f1eb] px-6 py-24 text-[#11100e] lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              Selected Works
            </p>

            <h2 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
              Choose your
              <span className="italic"> inspiration.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            Browse our artwork styles and choose a piece you'd like recreated
            or use as inspiration for your own custom artwork.
          </p>
        </div>

        {/* Artwork Grid */}
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworks;