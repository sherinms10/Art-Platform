import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import RequestArtwork from "../pages/RequestArtwork/RequestArtwork";
import ArtworkDetails from "../pages/ArtworkDetails/ArtworkDetails";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/request-artwork"
          element={<RequestArtwork />}
        />

        <Route path="/artworks/:id" element={<ArtworkDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;