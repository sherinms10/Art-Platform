import { useEffect, useState } from "react";
import {
  Clock,
  Mail,
  Phone,
  Image as ImageIcon,
  ArrowUpRight,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ArtworkRequest {
  id: number;
  customer_id: number;
  artwork_id: number | null;
  style: string;
  size: string;
  quantity: number;
  description: string | null;
  reference_image_url: string | null;
  status: string;
  created_at: string;

  name: string;
  email: string;
  phone: string;

  artwork_title: string | null;
  artwork_image: string | null;
}

const statusOptions = [
  "pending",
  "reviewing",
  "quoted",
  "approved",
  "completed",
  "cancelled",
];

const AdminRequests = () => {
  const [requests, setRequests] = useState<ArtworkRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const navigate = useNavigate();
  // Selected request for modal
  const [selectedRequest, setSelectedRequest] =
    useState<ArtworkRequest | null>(null);

 useEffect(() => {
  const fetchRequests = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/artwork-requests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      // JWT expired / invalid
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch artwork requests.",
        );
      }

      setRequests(data.data);
    } catch (error) {
      console.error("Fetch requests error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  fetchRequests();
}, [navigate]);

  const getImageUrl = (image: string | null) => {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:5000${image}`;
  };

  const updateStatus = async (
  requestId: number,
  status: string,
) => {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const response = await fetch(
  `http://localhost:5000/api/artwork-requests/${requestId}/status`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  },
);

    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      window.location.href = "/admin/login";

      return;
    }

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to update status.",
      );
    }

    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status,
            }
          : request,
      ),
    );

    setSelectedRequest((previousRequest) =>
      previousRequest?.id === requestId
        ? {
            ...previousRequest,
            status,
          }
        : previousRequest,
    );
  } catch (error) {
    console.error("Update status error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Failed to update status.",
    );
  }
};

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "reviewing":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "quoted":
        return "bg-violet-50 text-violet-700 border-violet-200";

      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "completed":
        return "bg-neutral-900 text-white border-neutral-900";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-neutral-50 text-neutral-600 border-neutral-200";
    }
  };

  const pendingCount = requests.filter(
    (request) => request.status === "pending",
  ).length;

  const activeCount = requests.filter(
    (request) => ["reviewing", "quoted", "approved"].includes(request.status),
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f1eb] px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-3 w-24 rounded bg-neutral-200" />

            <div className="mt-5 h-12 w-72 rounded bg-neutral-200" />

            <div className="mt-4 h-4 w-96 max-w-full rounded bg-neutral-200" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f4f1eb] px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="admin-requests-page min-h-screen bg-[#f4f1eb] text-[#11100e]">
        <div className="mx-auto max-w-375 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">

          {/* HEADER */}
          <header className="requests-hero flex flex-col gap-8 border-b border-neutral-300 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="requests-pulse h-2 w-2 rounded-full bg-[#ef5b45]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Atelier / Dispatch / 01
                </p>
              </div>

              <h1 className="requests-title mt-5 text-5xl font-light tracking-[-0.04em] sm:text-6xl">
                The commission desk
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-500">
                A living queue for the ideas waiting to become
                something tangible.
              </p>
            </div>

            {/* Request count */}
            <div className="requests-metrics flex items-end gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                  In queue
                </p>

                <p className="mt-1 text-4xl font-light">
                  {requests.length}
                </p>
              </div>

              <div className="hidden h-12 w-px bg-neutral-300 sm:block" />

              <div className="hidden sm:block">
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                  Current pulse
                </p>

                <p className="mt-2 text-sm font-medium">
                  {pendingCount} new / {activeCount} active
                </p>
              </div>
            </div>
          </header>

          <div className="requests-ribbon mt-6 flex flex-col gap-4 border-y border-[#11100e] py-3 text-[10px] font-semibold uppercase tracking-[0.2em] sm:flex-row sm:items-center sm:justify-between">
            <span>Incoming studies &amp; finished briefs</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-neutral-500">
              <span><i className="request-key request-key--new" /> New {pendingCount}</span>
              <span><i className="request-key request-key--active" /> Active {activeCount}</span>
              <span className="text-[#ef5b45]">Updated {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* EMPTY */}
          {requests.length === 0 ? (
            <div className="flex min-h-100 items-center justify-center">
              <div className="text-center">
                <ImageIcon
                  size={34}
                  strokeWidth={1.2}
                  className="mx-auto text-neutral-300"
                />

                <p className="mt-5 text-sm text-neutral-500">
                  No artwork requests yet.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-10 space-y-10">
              {requests.map((request, index) => {
                const referenceImage = getImageUrl(
                  request.reference_image_url,
                );

                const artworkImage = getImageUrl(
                  request.artwork_image,
                );

                return (
                  <article
                    key={request.id}
                    className="request-card group overflow-hidden border border-neutral-300 bg-[#ebe7df] transition duration-500 hover:border-neutral-500"
                  >
                    {/* TOP BAR */}
                    <div className="request-card__bar flex flex-col gap-5 bg-[#11100e] px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
                      <div className="flex items-center gap-5">
                        <span className="request-index font-mono text-xs text-white/40">
                          #{String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="h-4 w-px bg-white/20" />

                        <span className="text-sm font-medium tracking-wide">
                          Request #{request.id}
                        </span>

                        <span className="hidden text-xs text-white/30 sm:inline">
                          /
                        </span>

                        <span className="hidden text-xs text-white/40 sm:inline">
                          {new Date(
                            request.created_at,
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <label className="request-status-control">
                        <span className="sr-only">Update request status</span>
                        <select
                        value={request.status}
                        onChange={(event) =>
                          updateStatus(
                            request.id,
                            event.target.value,
                          )
                        }
                        className={`request-status cursor-pointer rounded-full border px-4 py-2 text-xs capitalize outline-none ${getStatusStyle(
                          request.status,
                        )}`}
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                        </select>
                      </label>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

                      {/* VISUAL AREA */}
                      <div
                        className={`request-visuals bg-neutral-200 ${
                          artworkImage
                            ? "grid grid-cols-[1.4fr_0.6fr]"
                            : "grid grid-cols-1"
                        }`}
                      >
                        {/* Customer Reference */}
                        <div
                          className={`relative overflow-hidden ${
                            artworkImage
                              ? "border-r border-[#f4f1eb]"
                              : ""
                          }`}
                        >
                          <div className="absolute left-5 top-5 z-10">
                            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#11100e]" />

                              Customer Reference
                            </div>
                          </div>

                          {referenceImage ? (
                            <img
                              src={referenceImage}
                              alt={`Customer reference for request ${request.id}`}
                              className="h-full min-h-130 w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                            />
                          ) : (
                            <div className="flex min-h-130 items-center justify-center">
                              <div className="text-center">
                                <ImageIcon
                                  size={38}
                                  strokeWidth={1}
                                  className="mx-auto text-neutral-400"
                                />

                                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-neutral-400">
                                  No reference
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Selected Artwork ONLY if artwork_image exists */}
                        {artworkImage && (
                          <div className="relative overflow-hidden bg-neutral-300">
                            <div className="absolute left-4 top-5 z-10">
                              <div className="rounded-full bg-[#11100e]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                                Selected
                              </div>
                            </div>

                            <img
                              src={artworkImage}
                              alt={
                                request.artwork_title ||
                                "Selected artwork"
                              }
                              className="h-full min-h-130 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                            />
                          </div>
                        )}
                      </div>

                      {/* DETAILS */}
                      <div className="request-details bg-[#f4f1eb] p-7 sm:p-9 lg:p-10">

                        {/* Customer */}
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                            Customer
                          </p>

                          <div className="mt-5 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#11100e] text-white">
                              <UserRound
                                size={19}
                                strokeWidth={1.5}
                              />
                            </div>

                            <div>
                              <h2 className="text-xl font-medium">
                                {request.name}
                              </h2>

                              <p className="mt-1 text-xs text-neutral-400">
                                Customer #{request.customer_id}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 space-y-3 text-sm text-neutral-500">
                            <div className="flex items-center gap-3">
                              <Mail size={15} />

                              <span>{request.email}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <Phone size={15} />

                              <span>{request.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="my-9 h-px bg-neutral-300" />

                        {/* Commission */}
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                            Commission
                          </p>

                          <h3 className="mt-3 text-2xl font-light tracking-tight">
                            {artworkImage
                              ? request.artwork_title ||
                                "Selected Artwork"
                              : "Custom Artwork"}
                          </h3>
                        </div>

                        {/* Specs */}
                        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-neutral-300 bg-neutral-300">
                          <div className="bg-[#f4f1eb] p-5">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                              Style
                            </p>

                            <p className="mt-2 text-sm font-medium">
                              {request.style}
                            </p>
                          </div>

                          <div className="bg-[#f4f1eb] p-5">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                              Size
                            </p>

                            <p className="mt-2 text-sm font-medium">
                              {request.size}
                            </p>
                          </div>

                          <div className="bg-[#f4f1eb] p-5">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                              Quantity
                            </p>

                            <p className="mt-2 text-sm font-medium">
                              {request.quantity}
                            </p>
                          </div>

                          <div className="bg-[#f4f1eb] p-5">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                              Submitted
                            </p>

                            <p className="mt-2 text-sm font-medium">
                              {new Date(
                                request.created_at,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        {request.description && (
                          <>
                            <div className="my-9 h-px bg-neutral-300" />

                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                                Customer Notes
                              </p>

                              <p className="mt-4 text-sm leading-7 text-neutral-600">
                                “{request.description}”
                              </p>
                            </div>
                          </>
                        )}

                        {/* Footer */}
                        <div className="mt-10 flex items-center justify-between border-t border-neutral-300 pt-6">
                          <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <Clock size={14} />

                            <span>
                              {new Date(
                                request.created_at,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          {/* VIEW REQUEST */}
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedRequest(request)
                            }
                            className="group/button flex items-center gap-2 text-xs font-medium cursor-pointer"
                          >
                            View Request

                            <ArrowUpRight
                              size={15}
                              className="transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ================================================== */}
      {/* REQUEST DETAILS MODAL */}
      {/* ================================================== */}

      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-[#f4f1eb] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-300 bg-[#11100e] px-6 py-5 text-white sm:px-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                  Artwork Request
                </p>

                <h2 className="mt-1 text-xl font-light">
                  Request #{selectedRequest.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 lg:p-10">

              {/* Images */}
            {(selectedRequest.reference_image_url ||
  selectedRequest.artwork_image) && (
  <div
    className={`grid gap-4 ${
      selectedRequest.reference_image_url &&
      selectedRequest.artwork_image
        ? "md:grid-cols-2"
        : "grid-cols-1"
    }`}
  >
    {selectedRequest.reference_image_url && (
      <div>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Customer Reference
        </p>

        <img
          src={getImageUrl(
            selectedRequest.reference_image_url,
          )!}
          alt={`Customer reference for request ${selectedRequest.id}`}
          className="max-h-[500px] w-full object-cover"
        />
      </div>
    )}

    {selectedRequest.artwork_image && (
      <div>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Selected Artwork
        </p>

        <img
          src={getImageUrl(
            selectedRequest.artwork_image,
          )!}
          alt={
            selectedRequest.artwork_title ||
            "Selected artwork"
          }
          className="max-h-[500px] w-full object-cover"
        />
      </div>
    )}
  </div>
)}

              {/* Customer */}
              <section className="mt-10 border-t border-neutral-300 pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  Customer
                </p>

                <div className="mt-5 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-neutral-400">
                      Name
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {selectedRequest.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400">
                      Email
                    </p>

                    <p className="mt-2 break-all text-sm font-medium">
                      {selectedRequest.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400">
                      Phone
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {selectedRequest.phone}
                    </p>
                  </div>
                </div>
              </section>

              {/* Commission */}
              <section className="mt-10 border-t border-neutral-300 pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  Commission Details
                </p>

                <h3 className="mt-4 text-3xl font-light">
                  {selectedRequest.artwork_image
                    ? selectedRequest.artwork_title ||
                      "Selected Artwork"
                    : "Custom Artwork"}
                </h3>

                <div className="mt-7 grid gap-px overflow-hidden border border-neutral-300 bg-neutral-300 sm:grid-cols-4">
                  <div className="bg-[#f4f1eb] p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                      Style
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {selectedRequest.style}
                    </p>
                  </div>

                  <div className="bg-[#f4f1eb] p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                      Size
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {selectedRequest.size}
                    </p>
                  </div>

                  <div className="bg-[#f4f1eb] p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                      Quantity
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {selectedRequest.quantity}
                    </p>
                  </div>

                  <div className="bg-[#f4f1eb] p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                      Status
                    </p>

                    <p className="mt-2 text-sm font-medium capitalize">
                      {selectedRequest.status}
                    </p>
                  </div>
                </div>
              </section>

              {/* Customer Notes */}
              {selectedRequest.description && (
                <section className="mt-10 border-t border-neutral-300 pt-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                    Customer Notes
                  </p>

                  <div className="mt-4 border-l-2 border-neutral-300 pl-5">
                    <p className="text-sm leading-7 text-neutral-600">
                      “{selectedRequest.description}”
                    </p>
                  </div>
                </section>
              )}

              {/* Date */}
              <section className="mt-10 flex flex-col gap-4 border-t border-neutral-300 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={14} />

                  Submitted{" "}
                  {new Date(
                    selectedRequest.created_at,
                  ).toLocaleString()}
                </div>

                <div>
                  Request ID: #{selectedRequest.id}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminRequests;