import { style } from "@vanilla-extract/css";
import { vars } from "@/theme/theme.css";

export const table = style({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  marginTop: vars.space.medium,
  marginBottom: vars.space.medium,
});

export const thead = style({
  backgroundColor: vars.color.secondary,
});

export const th = style({
  padding: vars.space.medium,
  textAlign: "left",
  fontWeight: 600,
  color: vars.color.text,
  borderBottom: `1px solid ${vars.color.border}`,
  cursor: "pointer",
  transition: "background-color 0.2s",
  userSelect: "none",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.hover,
    },
    "&:first-child": {
      borderTopLeftRadius: vars.borderRadius.medium,
    },
    "&:last-child": {
      borderTopRightRadius: vars.borderRadius.medium,
    },
  },
});

export const tr = style({
  backgroundColor: vars.color.secondary,
  transition: "background-color 0.2s",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.hover,
    },
  },
});

export const td = style({
  padding: vars.space.medium,
  color: vars.color.text,
  borderBottom: `1px solid ${vars.color.border}`,
  selectors: {
    [`${tr}:last-child &`]: {
      borderBottom: "none",
    },
  },
});

export const actionsCell = style({
  textAlign: "right",
  color: vars.color.textLight,
});
