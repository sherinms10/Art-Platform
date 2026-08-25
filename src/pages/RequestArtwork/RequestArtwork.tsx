import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { artworks } from "../../data/artworks";
import {
  ArrowLeft,
  Check,
  ImagePlus,
  Upload,
  X,
} from "lucide-react";

const styles = [
  "Graphite / Pencil",
  "Charcoal",
  "Watercolor",
  "Color Pencil",
  "Digital Art",
  "Not Sure",
];

const sizes = [
  "A5",
  "A4",
  "A3",
  "A2",
  "Custom Size",
];

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  style: "",
  size: "",
  quantity: "1",
  description: "",
};

const RequestArtwork = () => {
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchParams] = useSearchParams();

  const sampleId = searchParams.get("sample");

  const selectedArtwork = artworks.find(
    (artwork) => artwork.id === Number(sampleId),
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
console.log("sampleId:", sampleId);
console.log("selectedArtwork:", selectedArtwork);
console.log("artworkId:", selectedArtwork?.id ?? null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 10MB.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl = URL.createObjectURL(file);

    setReferenceImage(file);
    setPreviewUrl(newPreviewUrl);
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setReferenceImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  setIsSubmitting(true);
  setErrorMessage("");

  try {
    const payload = new FormData();

    // Customer information
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);

    // Selected artwork
    payload.append(
      "artworkId",
      selectedArtwork?.id
        ? String(selectedArtwork.id)
        : "",
    );

    // Artwork details
    payload.append("style", formData.style);
    payload.append("size", formData.size);
    payload.append("quantity", formData.quantity);
    payload.append("description", formData.description);

    // Reference image
    if (referenceImage) {
      payload.append("referenceImage", referenceImage);
    }

    const response = await fetch(
      "http://localhost:5000/api/artwork-requests",
      {
        method: "POST",
        body: payload,
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to submit artwork request.",
      );
    }

    console.log("Artwork request created:", data);

    setSubmitted(true);

    // Reset form data
    setFormData(initialFormData);

    // Reset image
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setReferenceImage(null);
    setPreviewUrl(null);
  } catch (error) {
    console.error("Artwork request error:", error);

    setErrorMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSubmitAnotherRequest = () => {
    setFormData(initialFormData);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setReferenceImage(null);
    setPreviewUrl(null);

    setErrorMessage("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f1eb] px-6">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#11100e] text-white">
            <Check size={28} strokeWidth={1.5} />
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-neutral-400">
            Request Received
          </p>

          <h1 className="mt-4 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
            Let's create something
            <span className="italic"> beautiful.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-neutral-500">
            Thank you for sharing your idea. Our artist will review
            your request and get back to you with a personalized
            quotation.
          </p>

          <button
            type="button"
            onClick={handleSubmitAnotherRequest}
            className="mt-8 rounded-full bg-[#11100e] px-7 py-3.5 text-sm text-white transition hover:bg-black/80"
          >
            Submit Another Request
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#11100e]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-[#f4f1eb]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-6 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-neutral-600 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Artworks
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Page heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
            Custom Commission
          </p>

          <h1 className="mt-4 text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Tell us about the
            <br />
            artwork you <span className="italic">imagine.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Share your reference, choose your preferred style, and
            tell us what you'd like. We'll review everything and send
            you a personalized quotation.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-24"
        >
          {/* LEFT */}
          <div className="space-y-12">
            {/* Selected artwork */}
            {selectedArtwork && (
              <section>
                <div className="mb-5">
                  <p className="text-sm font-medium">
                    Selected Style
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    We'll use this artwork as the style reference for
                    your request.
                  </p>
                </div>

                <div className="flex gap-5 rounded-2xl bg-white p-4">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="h-28 w-24 rounded-xl object-cover"
                  />

                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-medium">
                      {selectedArtwork.title}
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      {selectedArtwork.category}
                    </p>

                    <p className="mt-3 text-xs text-neutral-500">
                      Starting from {selectedArtwork.price}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Reference image */}
            <section>
              <div className="mb-5">
                <p className="text-sm font-medium">
                  01. Reference Image
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Upload the photo you'd like us to work from.
                </p>
              </div>

              {!previewUrl ? (
                <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white/40 px-6 text-center transition hover:border-neutral-500 hover:bg-white/70">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <ImagePlus size={23} strokeWidth={1.4} />
                  </div>

                  <p className="mt-5 text-sm font-medium">
                    Upload your reference
                  </p>

                  <p className="mt-2 text-xs text-neutral-400">
                    JPG, PNG or WEBP · Maximum 10MB
                  </p>

                  <span className="mt-5 flex items-center gap-2 rounded-full bg-[#11100e] px-5 py-2.5 text-xs text-white">
                    <Upload size={14} />
                    Choose Image
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative overflow-hidden rounded-3xl bg-white">
                  <img
                    src={previewUrl}
                    alt="Reference preview"
                    className="max-h-125 w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-black"
                    aria-label="Remove reference image"
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
            </section>

            {/* Artwork details */}
            <section>
              <div className="mb-6">
                <p className="text-sm font-medium">
                  02. Artwork Details
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Tell us how you'd like your artwork created.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Style */}
                <div>
                  <label
                    htmlFor="style"
                    className="mb-2 block text-xs text-neutral-500"
                  >
                    Preferred Style
                  </label>

                  <select
                    id="style"
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-500"
                  >
                    <option value="">Select style</option>

                    {styles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label
                    htmlFor="size"
                    className="mb-2 block text-xs text-neutral-500"
                  >
                    Artwork Size
                  </label>

                  <select
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-500"
                  >
                    <option value="">Select size</option>

                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="quantity"
                    className="mb-2 block text-xs text-neutral-500"
                  >
                    Quantity
                  </label>

                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="mb-2 block text-xs text-neutral-500"
                >
                  Additional Instructions
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about your idea, background preferences, number of people, special details, etc."
                  className="w-full resize-none rounded-xl border bg-white px-4 py-4 text-sm outline-none placeholder:text-neutral-300 focus:border-neutral-500"
                />
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-[#11100e] p-7 text-white sm:p-9">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Your Information
              </p>

              <div className="mt-8 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs text-white/50"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full border-b bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs text-white/50"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full border-b bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/50"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs text-white/50"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91"
                    className="w-full border-b bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/50"
                  />
                </div>
              </div>

              {/* Error */}
              {errorMessage && (
                <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3">
                  <p className="text-xs leading-5 text-red-300">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Summary */}
              <div className="mt-10 border-t border-white/10 pt-7">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />

                  <p className="text-xs leading-5 text-white/40">
                    No payment is required now. We'll review your
                    request and contact you with the final quotation.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Submitting Request..."
                  : "Submit Artwork Request"}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default RequestArtwork;