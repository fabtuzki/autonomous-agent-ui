import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2200EE', // Electric Royal Blue from Logo
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C020EE', // Vibrant Magenta from Logo
    },
    background: {
      default: '#FFFBFE', // True MD3 Light Background
      paper: '#FFFFFF', // Surface
    },
    text: {
      primary: '#000000', // Pushed MD3 On-Surface to pure black for aggressive contrast
      secondary: '#222222', // Pushed MD3 On-Surface-Variant to deep grey
    },
    action: {
      active: '#49454F', 
      hover: 'rgba(34, 0, 238, 0.08)', // Primary hover state layer
      selected: 'rgba(34, 0, 238, 0.12)',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 400, letterSpacing: '-0.25px' },
    h2: { fontWeight: 400 },
    h3: { fontWeight: 400 },
    h4: { fontWeight: 500, letterSpacing: '0px' },
    h5: { fontWeight: 500 }, // Headline Small
    h6: { fontWeight: 500, color: '#1C1B1F', letterSpacing: '0.15px' }, // Title Large
    button: { textTransform: 'none', fontWeight: 500, letterSpacing: '0.1px' }, // Label Large
    body1: { letterSpacing: '0.5px' },
    body2: { letterSpacing: '0.25px' },
  },
  shape: {
    borderRadius: 24, // MD3 standard container radius (16-28)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // MD3 fully rounded pills
          padding: '12px 32px', // Significantly increased padding to prevent squeezed text
          fontSize: '0.95rem',
          boxShadow: 'none', // MD3 buttons are generally flat tonal or slight elevation
          '&:hover': {
            boxShadow: '0px 1px 3px rgba(0,0,0,0.12)',
          }
        },
        contained: {
          boxShadow: 'none',
        }
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16, // MD3 FABs are rounded rectangles, not circles
          boxShadow: '0px 4px 8px 3px rgba(0,0,0,0.05)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.03)', // Slight shadow for depth
          backgroundColor: '#FFFFFF', 
          border: '1px solid rgba(0,0,0,0.08)', // Crisp border for guaranteed contrast
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: { boxShadow: '0px 2px 8px rgba(0,0,0,0.04)' },
        elevation2: { boxShadow: '0px 4px 12px rgba(0,0,0,0.06)' },
        elevation3: { boxShadow: '0px 8px 24px rgba(0,0,0,0.08)' },
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderBottom: '1px solid #CAC4D0', // Outline Variant
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: '#2200EE',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          fontWeight: 500,
          textTransform: 'none',
          fontSize: '0.875rem', // Label Large 14px
          letterSpacing: '0.1px',
          color: '#49454F',
          transition: 'background-color 0.2s',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          '&.Mui-selected': {
            color: '#2200EE',
          },
          '&:hover': {
            backgroundColor: 'rgba(34, 0, 238, 0.08)', // primary state layer
          }
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFBFE',
          color: '#1C1B1F',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
