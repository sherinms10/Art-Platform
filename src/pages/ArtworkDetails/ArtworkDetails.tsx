import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Heart } from "lucide-react";
import { artworks } from "../../data/artworks";

const ArtworkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const artwork = artworks.find((item) => item.id === Number(id));

  if (!artwork) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f1eb] px-6">
        <div className="text-center">
          <p className="text-sm text-neutral-500">Artwork not found.</p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 rounded-full bg-[#11100e] px-6 py-3 text-sm text-white"
          >
            Back Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#11100e]">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-neutral-500 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <span className="text-xl font-semibold tracking-[0.25em]">
            ART<span className="font-light">É</span>
          </span>

          <button
            type="button"
            aria-label="Add artwork to wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white"
          >
            <Heart size={17} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
          {/* Artwork image */}
          <div className="overflow-hidden rounded-4xl bg-white">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="h-auto max-h-187.5 w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-10">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              {artwork.category}
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              {artwork.title}
            </h1>

            <p className="mt-5 text-xl text-neutral-700">
              Starting from {artwork.price}
            </p>

            <div className="my-8 h-px bg-neutral-200" />

            <div className="space-y-6 text-sm leading-7 text-neutral-500">
              <p>
                This artwork is a sample of our {artwork.category.toLowerCase()}{" "}
                style. The final artwork will be created specifically for you
                based on your own reference photo and requirements.
              </p>

              <p>
                Every commission is individually reviewed, so the final price
                may vary depending on size, number of subjects, complexity,
                and your specific requirements.
              </p>
            </div>

            {/* Info */}
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
              <div className="bg-[#f4f1eb] p-5">
                <p className="text-xs text-neutral-400">Style</p>
                <p className="mt-2 text-sm font-medium">{artwork.category}</p>
              </div>

              <div className="bg-[#f4f1eb] p-5">
                <p className="text-xs text-neutral-400">Type</p>
                <p className="mt-2 text-sm font-medium">Custom Commission</p>
              </div>

              <div className="bg-[#f4f1eb] p-5">
                <p className="text-xs text-neutral-400">Pricing</p>
                <p className="mt-2 text-sm font-medium">Quoted Individually</p>
              </div>

              <div className="bg-[#f4f1eb] p-5">
                <p className="text-xs text-neutral-400">Delivery</p>
                <p className="mt-2 text-sm font-medium">Discussed After Quote</p>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() =>
                navigate(`/request-artwork?sample=${artwork.id}`)
              }
              className="group mt-8 flex w-full items-center justify-between rounded-full bg-[#11100e] px-7 py-4 text-sm font-medium text-white transition hover:bg-black/85"
            >
              <span>Request Similar Artwork</span>

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>

            <p className="mt-4 text-center text-xs text-neutral-400">
              No payment required at this stage
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArtworkDetails;