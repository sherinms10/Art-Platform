import { ArrowUpRight } from "lucide-react";
import type { Artwork } from "../../types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  return (
    <article className="group">
      {/* Image */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-100">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="aspect-4/5 w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition duration-500 group-hover:bg-black/30">
          <a
            href={`/request-artwork?sample=${artwork.id}`}
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition duration-500 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
          >
            Request Similar Artwork
          </a>
        </div>
      </div>

      {/* Information */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-medium text-[#11100e]">
            {artwork.title}
          </h3>

          <p className="mt-1 text-sm text-neutral-400">
            {artwork.category}
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm text-neutral-500">
          <span>{artwork.price}</span>

          <ArrowUpRight
            size={15}
            className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          />
        </div>
      </div>
    </article>
  );
};

export default ArtworkCard;