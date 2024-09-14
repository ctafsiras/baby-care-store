"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error | Baby Care Store",
  description:
    "Sorry, an error occurred. Please try again or contact our support team",
};
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 py-8 bg-card rounded-lg shadow-lg text-center">
        <AlertTriangle
          className="mx-auto h-12 w-12 text-destructive"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          Oops! Something went wrong
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        {error?.digest && (
          <p className="mt-2 text-sm text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Go to homepage
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}
