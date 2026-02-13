import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#000000",
    secondary: "#FFFFFF",
    accent: "#D32F2F",
    background: "#F5F5F7",
    text: "#333333",
    textLight: "#757575",
    border: "#E0E0E0",
    hover: "#F0F0F0",
  },
  space: {
    small: "8px",
    medium: "16px",
    large: "24px",
    xlarge: "32px",
  },
  font: {
    body: "Roboto, sans-serif",
    heading: "inherit",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "9999px",
  },
});
