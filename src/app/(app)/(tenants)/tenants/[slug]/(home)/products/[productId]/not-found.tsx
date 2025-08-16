"use client";

import Link from "next/link";

export default function ProductNotFound() {
  // Neobrutalist stilovi konzistentni sa error.tsx
  const containerStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fef7cd", // svetlo žuta pozadina
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, monospace",
    padding: "1rem",
    zIndex: 9999,
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

  const triangleStyle = {
    fontSize: "3rem",
    color: "#fbbf24", // žuta boja
    marginBottom: "1rem",
    display: "block",
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

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  };

  const buttonStyle = {
    backgroundColor: "#06b6d4", // teal
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
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#22c55e", // green
    transform: "rotate(1deg)",
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

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={triangleStyle}>⚠</div>
        <h2 style={titleStyle}>PRODUCT NOT FOUND!</h2>
        <p style={textStyle}>This product is no longer available.</p>
        <div style={buttonContainerStyle}>
          <Link
            href="/"
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            🏠 GO HOME
          </Link>
          <Link
            href="/"
            style={secondaryButtonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            🛍️ BROWSE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
}
