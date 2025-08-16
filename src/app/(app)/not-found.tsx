"use client";

import Link from "next/link";

export default function GlobalNotFound() {
  const containerStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fef7cd", // svetlo žuta pozadina
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, monospace",
    padding: "1rem",
    zIndex: 50,
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

  const buttonStyle = {
    display: "inline-block",
    backgroundColor: "#10b981", // zelena boja
    color: "white",
    padding: "1rem 2rem",
    border: "3px solid black",
    boxShadow: "4px 4px 0px black",
    textDecoration: "none",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    transform: "rotate(1deg)",
    transition: "all 0.1s",
    marginRight: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>404 - Page Not Found</h1>
        <p style={textStyle}>
          The page you are looking for does not exist. Please check the URL and
          try again.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/" style={buttonStyle}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
