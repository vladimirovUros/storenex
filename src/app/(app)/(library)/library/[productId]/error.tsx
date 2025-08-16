"use client";

import { TRPCClientError } from "@trpc/client";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LibraryProductError({ error, reset }: Props) {
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#fef7cd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, monospace",
    padding: "1rem",
  };

  const cardStyle = {
    textAlign: "center" as const,
    maxWidth: "24rem",
    padding: "2.5rem",
    backgroundColor: "white",
    border: "4px solid black",
    boxShadow: "8px 8px 0px black",
    transform: "rotate(-1deg)",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    fontWeight: "900",
    marginBottom: "1rem",
    color: "black",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    transform: "rotate(1deg)",
  };

  const textStyle = {
    color: "#6b7280",
    marginBottom: "2rem",
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.4",
  };

  const buttonStyle = {
    backgroundColor: "#06b6d4",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "3px solid black",
    boxShadow: "4px 4px 0px black",
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    fontSize: "0.8rem",
    letterSpacing: "0.05em",
    transition: "all 0.1s ease",
    transform: "rotate(-1deg)",
    marginRight: "1rem",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#22c55e",
    transform: "rotate(1deg)",
    marginRight: "0",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = target.style.transform.includes("rotate")
      ? target.style.transform.replace(
          /translate\([^)]*\)/,
          "translate(-2px, -2px)"
        )
      : "translate(-2px, -2px) " + target.style.transform;
    target.style.boxShadow = "6px 6px 0px black";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = target.style.transform.replace(
      /translate\([^)]*\)/,
      ""
    );
    target.style.boxShadow = "4px 4px 0px black";
  };

  // Unauthorized access to library
  if (error instanceof TRPCClientError && error.data?.code === "UNAUTHORIZED") {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>🔒 ACCESS DENIED!</h2>
          <p style={textStyle}>
            You need to be logged in to access your library!
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap" as const,
            }}
          >
            <Link
              href="/sign-in"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              🔐 LOG IN
            </Link>
            <Link
              href="/"
              style={secondaryButtonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              🏠 HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Product not found in library (not purchased)
  if (error instanceof TRPCClientError && error.data?.code === "NOT_FOUND") {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>📚 NOT FOUND!</h2>
          <p style={textStyle}>
            This product is not in your library. You need to purchase it first!
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap" as const,
            }}
          >
            <Link
              href="/"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              🛍️ SHOP NOW
            </Link>
            <Link
              href="/library"
              style={secondaryButtonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              📚 MY LIBRARY
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Other errors
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>💥 LIBRARY ERROR!</h2>
        <p style={textStyle}>Something went wrong accessing your library!</p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap" as const,
          }}
        >
          <button
            onClick={reset}
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            🔄 TRY AGAIN
          </button>
          <Link
            href="/library"
            style={secondaryButtonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            📚 MY LIBRARY
          </Link>
        </div>
      </div>
    </div>
  );
}
