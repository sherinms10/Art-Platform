import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  ArrowUpRight,
  AtSign,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to send message.",
        );
      }

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#11100e] px-6 py-24 text-white sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Get In Touch
          </p>

          <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Have an idea?
            <br />
            <span className="italic">Let's make it art.</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            Whether you already have a reference photo or just an idea in
            mind, feel free to reach out. We'd love to hear what you're
            imagining.
          </p>
        </div>

        {/* Contact cards */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-white/10 p-7 transition duration-300 hover:border-white/25 hover:bg-white/3"
          >
            <div className="flex items-center justify-between">
              <MessageCircle
                size={22}
                strokeWidth={1.4}
                className="text-white/60"
              />

              <ArrowUpRight
                size={18}
                className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </div>

            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-white/30">
              WhatsApp
            </p>

            <p className="mt-2 text-base font-light">
              Chat with the artist
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@example.com"
            className="group rounded-3xl border border-white/10 p-7 transition duration-300 hover:border-white/25 hover:bg-white/3"
          >
            <div className="flex items-center justify-between">
              <Mail
                size={22}
                strokeWidth={1.4}
                className="text-white/60"
              />

              <ArrowUpRight
                size={18}
                className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </div>

            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-white/30">
              Email
            </p>

            <p className="mt-2 text-base font-light">
              hello@example.com
            </p>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-white/10 p-7 transition duration-300 hover:border-white/25 hover:bg-white/3"
          >
            <div className="flex items-center justify-between">
              <AtSign
                size={22}
                strokeWidth={1.4}
                className="text-white/60"
              />

              <ArrowUpRight
                size={18}
                className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </div>

            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-white/30">
              Instagram
            </p>

            <p className="mt-2 text-base font-light">
              Follow the artwork
            </p>
          </a>
        </div>

        {/* Contact Form */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Form heading */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Send a Message
            </p>

            <h3 className="mt-5 text-3xl font-light tracking-tight sm:text-4xl">
              Let's talk about
              <br />
              your <span className="italic">idea.</span>
            </h3>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
              Tell us what you have in mind. We'll review your message and
              get back to you as soon as possible.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/3 p-7 sm:p-9"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs text-white/50"
                >
                  Full Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/50"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs text-white/50"
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/50"
                />
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-xs text-white/50"
                >
                  Phone Number
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/50"
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs text-white/50"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your idea..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/3 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/40"
                />
              </div>
            </div>

            {/* Success */}
            {success && (
              <div className="mt-6 rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-300">
                Message sent successfully. We'll get back to you soon.
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />

              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Main CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-white/40">
              Ready to turn your photo into art?
            </p>

            <p className="mt-1 text-lg font-light">
              Start your custom artwork request.
            </p>
          </div>

          <a
            href="/request-artwork"
            className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Request Custom Artwork

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;