import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Palette,
  Mail,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
   {
  label: "Dashboard",
  path: "/admin/dashboard",
  icon: LayoutDashboard,
},
    {
      label: "Requests",
      path: "/admin/requests",
      icon: ClipboardList,
    },
    {
      label: "Artworks",
      path: "/admin/artworks",
      icon: Palette,
    },
    {
      label: "Messages",
      path: "/admin/messages",
      icon: Mail,
    },
    {
      label: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    setMobileOpen(false);
    navigate("/admin/login", { replace: true });
  };


  const sidebar = (
    <aside className="flex h-full w-64 max-w-[85vw] flex-col bg-[#11100e] text-white">
      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-7">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Art Platform
        </p>

        <h1 className="mt-2 text-xl font-medium">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
  key={item.path}
  to={item.path}
  onClick={() => setMobileOpen(false)}
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
      isActive
        ? "bg-white text-black"
        : "text-white/60 hover:bg-white/10 hover:text-white"
    }`
  }
>
              <Icon size={18} strokeWidth={1.7} />

              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} strokeWidth={1.7} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 hidden lg:block">
        {sidebar}
      </div>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-neutral-200 bg-[#f4f1eb]/95 px-5 py-4 backdrop-blur lg:hidden">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            Admin
          </p>

          <h1 className="text-lg font-medium">
            Art Platform
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-full bg-[#11100e] text-white"
          aria-label="Toggle admin menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-admin-sidebar"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-admin-sidebar"
            className="relative z-10 h-full w-fit shadow-2xl"
          >
            {sidebar}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;