import { style } from "@vanilla-extract/css";
import { vars } from "@/theme/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.medium,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.small,
});

export const label = style({
  fontSize: "0.9rem",
  fontWeight: 600,
  color: vars.color.textLight,
});

export const value = style({
  fontSize: "1rem",
  color: vars.color.text,
});

export const input = style({
  padding: vars.space.medium,
  borderRadius: vars.borderRadius.small,
  border: `1px solid ${vars.color.border}`,
  fontSize: "1rem",
  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.color.primary}`,
      borderColor: "transparent",
    },
  },
});

export const error = style({
  color: vars.color.accent,
  fontSize: "0.8rem",
  marginTop: vars.space.small,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.medium,
  marginTop: vars.space.large,
});

export const button = style({
  padding: `${vars.space.small} ${vars.space.large}`,
  borderRadius: vars.borderRadius.medium,
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 600,
  transition: "opacity 0.2s",
  selectors: {
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:hover:not(:disabled)": {
      opacity: 0.9,
    },
  },
});

export const primaryButton = style([
  button,
  {
    backgroundColor: vars.color.primary,
    color: vars.color.secondary,
  },
]);

export const secondaryButton = style([
  button,
  {
    backgroundColor: "transparent",
    border: `1px solid ${vars.color.border}`,
    color: vars.color.text,
  },
]);
