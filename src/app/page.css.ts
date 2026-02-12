import { style } from '@vanilla-extract/css';

export const main = style({
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
})

export const loadingMain = style({ 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
 })

export const errorMain = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
})

export const errorButton = style({
  padding: '10px 20px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}
)