import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
      );

      const responseText = await response.text();
      let data: {
        success?: boolean;
        message?: string;
        token?: string;
        admin?: unknown;
      } = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(
          "The login service returned an invalid response.",
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password.",
        );
      }

      if (!data.token) {
        throw new Error("Login succeeded, but no session token was returned.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin ?? {}));
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error instanceof TypeError
          ? "Unable to connect to the login service. Start the backend and try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f1eb] px-6">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-[#11100e] p-8 text-white sm:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Admin
          </p>

          <h1 className="mt-4 text-3xl font-light">
            Welcome back
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/50">
            Sign in to manage artwork requests.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs text-white/50"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                placeholder="admin@example.com"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/60"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs text-white/50"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                placeholder="Enter your password"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/60"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3">
                <p className="text-xs text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full cursor-pointer bg-white px-6 py-4 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;