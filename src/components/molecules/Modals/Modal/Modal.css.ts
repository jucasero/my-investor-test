import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/theme/theme.css";

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const scaleUp = keyframes({
  "0%": { transform: "scale(0.95)", opacity: 0 },
  "100%": { transform: "scale(1)", opacity: 1 },
});

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const dialog = style({
  display: "block",
  border: "none",
  borderRadius: vars.borderRadius.large,
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  maxWidth: "500px",
  width: "90%",
  backgroundColor: vars.color.secondary,
  padding: 0,
  overflow: "hidden",
  position: "relative",
  margin: 0,
  animation: `${scaleUp} 0.2s ease-out`,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.space.medium,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const title = style({
  margin: 0,
  fontSize: "1.25rem",
  fontWeight: 600,
  color: vars.color.primary,
});

export const closeButton = style({
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: vars.color.textLight,
  padding: vars.space.small,
  borderRadius: vars.borderRadius.full,
  lineHeight: 1,
  transition: "background-color 0.2s",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.hover,
      color: vars.color.text,
    },
  },
});

export const content = style({
  padding: vars.space.medium,
  color: vars.color.text,
});
