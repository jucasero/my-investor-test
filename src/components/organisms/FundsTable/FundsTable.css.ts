import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/theme.css';

export const container = style({
    width: '100%',
    padding: vars.space.medium,
    backgroundColor: vars.color.secondary,
    borderRadius: vars.borderRadius.large,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vars.space.medium,
});

export const title = style({
    fontSize: '1.5rem',
    fontWeight: 700,
    color: vars.color.primary,
    margin: 0,
});

export const sortHeaderContent = style({
    display: 'flex',
    alignItems: 'center',
    gap: vars.space.small,
});

export const actionButton = style({
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: vars.space.small,
    borderRadius: vars.borderRadius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.textLight,
    transition: 'background-color 0.2s',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.hover,
            color: vars.color.text,
        }
    }
});

export const actionsCell = style({
    textAlign: 'right',
    color: vars.color.textLight,
});
