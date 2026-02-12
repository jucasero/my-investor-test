import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/theme.css';

export const nav = style({
    display: 'flex',
    gap: vars.space.large,
    borderBottom: `1px solid ${vars.color.border}`,
    marginBottom: vars.space.large,
});

export const navItem = style({
    padding: `${vars.space.medium} 0`,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    color: vars.color.textLight,
    position: 'relative',
    transition: 'color 0.2s',
    selectors: {
        '&:hover': {
            color: vars.color.text,
        },
        '&[data-active="true"]': {
            color: vars.color.primary,
        },
        '&[data-active="true"]::after': {
            content: '""',
            position: 'absolute',
            bottom: -1,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: vars.color.primary,
        },
    },
});
