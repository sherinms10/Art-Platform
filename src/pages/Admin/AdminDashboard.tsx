
import {
  ClipboardList,
  Palette,
  Users,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Artwork Requests",
      description: "Review and manage customer requests.",
      icon: ClipboardList,
      path: "/admin/requests",
    },
    {
      title: "Artworks",
      description: "Manage available artwork samples.",
      icon: Palette,
      path: "/admin/artworks",
    },
    {
      title: "Customers",
      description: "View customer information.",
      icon: Users,
      path: "/admin/customers",
    },
    {
      title: "Messages",
      description: "View customer contact messages.",
      icon: Mail,
      path: "/admin/messages",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f1eb] px-6 py-12 text-[#11100e] lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
            Dashboard
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500">
            Manage artwork requests, artworks, customers and
            messages from one place.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="group rounded-3xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#11100e] text-white">
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                <h2 className="mt-6 text-base font-medium">
                  {card.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  {card.description}
                </p>

                <p className="mt-6 text-xs font-medium">
                  Open →
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
