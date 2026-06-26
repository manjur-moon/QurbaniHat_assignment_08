"use client";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authClient, isGoogleAuthEnabled } from "@/lib/auth-client";

export default function GoogleLoginButton({ className = "", callbackURL = "/" }) {
  const safeCallbackURL = callbackURL?.startsWith("/") ? callbackURL : "/";

  const handleGoogleLogin = async () => {
    if (!isGoogleAuthEnabled) {
      toast.info("Google login button is ready. Add Google OAuth credentials and set NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true to enable authentication.");
      return;
    }

    try {
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: safeCallbackURL,
        errorCallbackURL: "/login"
      });

      if (response?.error) {
        toast.error(response.error.message || "Google login failed");
      }
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className={`flex w-full items-center justify-center gap-3 rounded-2xl border border-amber-100 bg-white px-5 py-3 font-black text-slate-700 shadow-sm transition hover:bg-amber-50 ${className}`}
      aria-label="Continue with Google"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
}
