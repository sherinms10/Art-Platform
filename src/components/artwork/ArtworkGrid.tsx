import ArtworkCard from "./ArtworkCard";
import { artworks } from "../../data/artworks";

const ArtworkGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkGrid;