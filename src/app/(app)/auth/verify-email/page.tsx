"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    // Pozovi API za verifikaciju
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);

          // Preusmeri na login stranicu nakon 3 sekunde
          setTimeout(() => {
            router.push("/sign-in?verified=true");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed");
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl border-4 border-gray-200 p-8 shadow-2xl text-center">
          {status === "loading" && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-4">
                VERIFYING...
              </h1>
              <p className="text-lg font-semibold text-gray-600">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-4">
                EMAIL VERIFIED!
              </h1>
              <p className="text-lg font-semibold text-gray-600 mb-6">
                {message}
              </p>
              <p className="text-sm font-medium text-blue-600">
                Redirecting to login page in 3 seconds...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-4">
                VERIFICATION FAILED
              </h1>
              <p className="text-lg font-semibold text-gray-600 mb-8">
                {message}
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => router.push("/sign-up")}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-2xl font-black text-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  TRY AGAIN
                </button>

                <button
                  onClick={() => router.push("/sign-in")}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-gray-500">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                Storenex Email Verification
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-3xl border-4 border-gray-200 p-8 shadow-2xl text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-4">
                LOADING...
              </h1>
              <p className="text-lg font-semibold text-gray-600">
                Please wait while we load the verification page.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;
