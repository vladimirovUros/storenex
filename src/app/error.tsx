"use client";

import { TRPCClientError } from "@trpc/client";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  // Neobrutalist stilovi
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#fef7cd", // svetlo žuta pozadina
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, monospace",
    padding: "1rem",
  };

  const cardStyle = {
    textAlign: "center" as const,
    maxWidth: "32rem",
    padding: "3rem",
    backgroundColor: "white",
    border: "4px solid black",
    boxShadow: "8px 8px 0px black",
    transform: "rotate(-1deg)",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "900",
    marginBottom: "1.5rem",
    color: "black",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    transform: "rotate(1deg)",
  };

  const textStyle = {
    color: "#374151",
    marginBottom: "2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    lineHeight: "1.6",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  };

  const buttonStyle = {
    backgroundColor: "#ef4444", // crvena
    color: "white",
    padding: "1rem 2rem",
    border: "3px solid black",
    boxShadow: "4px 4px 0px black",
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    fontSize: "0.9rem",
    letterSpacing: "0.05em",
    transition: "all 0.1s ease",
    transform: "rotate(1deg)",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#06b6d4", // teal
    transform: "rotate(-1deg)",
  };

  // Inline hover effects
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

  if (error instanceof TRPCClientError && error.data?.code === "UNAUTHORIZED") {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>🚫 WAIT WAIT!</h2>
          <p style={textStyle}>
            <strong>ACCESS DENIED!</strong>
            <br />
            You must log in to enter this zone!
          </p>
          <div style={buttonContainerStyle}>
            <Link
              href="/sign-in"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              🔐 LOG IN NOW
            </Link>
            <Link
              href="/"
              style={secondaryButtonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              🏠 GO HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>💥 CRASH!</h2>
        <p style={textStyle}>
          <strong>SYSTEM ERROR!</strong>
          <br />
          Something exploded in the code matrix!
        </p>
        <div style={buttonContainerStyle}>
          <button
            onClick={reset}
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            🔄 RETRY MISSION
          </button>
        </div>
      </div>
    </div>
  );
}
