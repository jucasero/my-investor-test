import { style } from "@vanilla-extract/css";
import { vars } from "@/theme/theme.css";

export const container = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.space.medium,
  marginTop: vars.space.medium,
});

export const controls = style({
  display: "flex",
  gap: vars.space.small,
  alignItems: "center",
});

export const button = style({
  padding: `${vars.space.small} ${vars.space.medium}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.borderRadius.small,
  backgroundColor: vars.color.secondary,
  cursor: "pointer",
  transition: "all 0.2s",
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  selectors: {
    "&:not(:disabled):hover": {
      backgroundColor: vars.color.hover,
    },
  },
});

export const select = style({
  padding: vars.space.small,
  borderRadius: vars.borderRadius.small,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.secondary,
  marginLeft: vars.space.small,
  cursor: "pointer",
});

export const info = style({
  color: vars.color.textLight,
  fontSize: "0.9rem",
});
