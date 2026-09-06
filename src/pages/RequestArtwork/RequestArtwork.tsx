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
import { API_BASE_URL } from "../../config/api";

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
    const formDataToSend = new FormData();

formDataToSend.append("name", formData.name);
formDataToSend.append("email", formData.email);
formDataToSend.append("phone", formData.phone);
formDataToSend.append(
  "artworkId",
  String(selectedArtwork?.id ?? ""),
);
formDataToSend.append("style", formData.style);
formDataToSend.append("size", formData.size);
formDataToSend.append("quantity", formData.quantity);
formDataToSend.append("description", formData.description);

if (referenceImage) {
  formDataToSend.append("referenceImage", referenceImage);
}

    const response = await fetch(
      `${API_BASE_URL}/api/artwork-requests`,
      {
        method: "POST",
        body: formDataToSend,
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
      <main className="request-page request-success flex min-h-screen items-center justify-center bg-[#f4f1eb] px-6">
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
    <main className="request-page min-h-screen bg-[#f4f1eb] text-[#11100e]">
      {/* Header */}
      <header className="request-header sticky top-0 z-10 border-b border-neutral-200 bg-[#f4f1eb]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Exit brief
          </a>

          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400 sm:block">
            Atelier No. 01 <span className="mx-2 text-[#ef5b45]">/</span> Commission
          </p>
        </div>
      </header>

      <div className="request-shell mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        {/* Page heading */}
        <div className="request-intro max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-[#ef5b45]" />
            Custom commission / 2026
          </p>

          <h1 className="request-heading mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Put your idea
            <br />
            <span>on the table.</span>
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
          className="request-form mt-14 grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20"
        >
          {/* LEFT */}
          <div className="request-main space-y-12">
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

                <div className="request-selected flex gap-5 border border-[#11100e] bg-white p-4">
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
              <div className="request-section-heading mb-5">
                <p className="text-sm font-semibold">
                  01. Reference Image
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Upload the photo you'd like us to work from.
                </p>
              </div>

              {!previewUrl ? (
                <label className="request-upload flex min-h-72 cursor-pointer flex-col items-center justify-center border border-dashed border-neutral-400 bg-white/40 px-6 text-center transition hover:border-[#ef5b45] hover:bg-white/70">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ef5b45] text-white">
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
                    className="request-preview max-h-125 w-full object-contain"
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
              <div className="request-section-heading mb-6">
                <p className="text-sm font-semibold">
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
                    className="request-field w-full border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#ef5b45]"
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
                    className="request-field w-full border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#ef5b45]"
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
                    className="request-field w-full border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#ef5b45]"
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
                  className="request-field w-full resize-none border bg-white px-4 py-4 text-sm outline-none placeholder:text-neutral-300 focus:border-[#ef5b45]"
                />
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="request-brief rounded-none bg-[#11100e] p-7 text-white sm:p-9">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                03. Your details
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
                className="request-submit mt-8 w-full cursor-pointer bg-[#ef5b45] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#ff725b] disabled:cursor-not-allowed disabled:opacity-60"
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