import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import RequestArtwork from "../pages/RequestArtwork/RequestArtwork";
import ArtworkDetails from "../pages/ArtworkDetails/ArtworkDetails";

import AdminLayout from "../components/Admin/AdminLayout";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminRequests from "../pages/Admin/AdminRequests";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================= */}
        {/* PUBLIC ROUTES */}
        {/* ============================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/request-artwork"
          element={<RequestArtwork />}
        />

        <Route
          path="/artworks/:id"
          element={<ArtworkDetails />}
        />

        {/* ============================= */}
        {/* ADMIN LOGIN */}
        {/* ============================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ============================= */}
        {/* PROTECTED ADMIN PANEL */}
        {/* ============================= */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="requests"
            element={<AdminRequests />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;