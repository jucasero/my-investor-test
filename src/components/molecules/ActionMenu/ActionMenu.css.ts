import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/theme.css';

export const container = style({
    position: 'relative',
    display: 'inline-block',
});

export const trigger = style({
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
        },
    },
});

export const menu = style({
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: vars.space.small,
    backgroundColor: vars.color.secondary,
    borderRadius: vars.borderRadius.medium,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: vars.space.small,
    zIndex: 10,
    minWidth: '150px',
    display: 'none',
    selectors: {
        '&[data-open="true"]': {
            display: 'block',
        }
    }
});

export const menuItem = style({
    display: 'block',
    width: '100%',
    padding: `${vars.space.small} ${vars.space.medium}`,
    textAlign: 'left',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.text,
    borderRadius: vars.borderRadius.small,
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.hover,
        },
    },
});
