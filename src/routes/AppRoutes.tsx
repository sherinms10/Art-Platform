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
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/request-artwork"
          element={<RequestArtwork />}
        />

        <Route
          path="/artworks/:id"
          element={<ArtworkDetails />}
        />

        {/* Admin login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin panel */}
        <Route path="/admin" element={<AdminLayout />}>
        <Route
  path="/admin/dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/requests"
  element={
    <AdminProtectedRoute>
      <AdminRequests />
    </AdminProtectedRoute>
  }
/>
          {/* <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="requests"
            element={<AdminRequests />}
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;