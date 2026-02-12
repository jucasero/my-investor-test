import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/theme/theme.css';

const slideIn = keyframes({
    '0%': { transform: 'translateX(100%)', opacity: 0 },
    '100%': { transform: 'translateX(0)', opacity: 1 },
});

export const container = style({
    position: 'fixed',
    bottom: vars.space.large,
    right: vars.space.large,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.small,
    zIndex: 1000,
});

export const toast = style({
    padding: vars.space.medium,
    borderRadius: vars.borderRadius.medium,
    color: '#fff',
    minWidth: '250px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    animation: `${slideIn} 0.3s ease-out`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
});

export const success = style({
    backgroundColor: '#4CAF50', // Green
});

export const error = style({
    backgroundColor: '#F44336', // Red
});

export const info = style({
    backgroundColor: '#2196F3', // Blue
});

export const closeButton = style({
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: vars.space.medium,
    fontSize: '1.2rem',
    opacity: 0.8,
    selectors: {
        '&:hover': {
            opacity: 1,
        }
    }
});
