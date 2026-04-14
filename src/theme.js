import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

// ============================================================================
// Material Design 3 — Design Token System
// Seed Color: #6750A4 (M3 Baseline Purple)
// Generated per https://m3.material.io/styles/color/system
// ============================================================================

const m3Tokens = {
  // --- Color Roles (Light Scheme) ---
  color: {
    primary:              '#6750A4',
    onPrimary:            '#FFFFFF',
    primaryContainer:     '#EADDFF',
    onPrimaryContainer:   '#21005D',

    secondary:            '#625B71',
    onSecondary:          '#FFFFFF',
    secondaryContainer:   '#E8DEF8',
    onSecondaryContainer: '#1D192B',

    tertiary:             '#7D5260',
    onTertiary:           '#FFFFFF',
    tertiaryContainer:    '#FFD8E4',
    onTertiaryContainer:  '#31111D',

    error:                '#B3261E',
    onError:              '#FFFFFF',
    errorContainer:       '#F9DEDC',
    onErrorContainer:     '#410E0B',

    surface:              '#FFFBFE',
    onSurface:            '#1C1B1F',
    surfaceVariant:       '#E7E0EC',
    onSurfaceVariant:     '#49454F',

    surfaceContainerLowest:  '#FFFFFF',
    surfaceContainerLow:     '#F7F2FA',
    surfaceContainer:        '#F3EDF7',
    surfaceContainerHigh:    '#ECE6F0',
    surfaceContainerHighest: '#E6E0E9',

    inverseSurface:       '#313033',
    inverseOnSurface:     '#F4EFF4',
    inversePrimary:       '#D0BCFF',

    outline:              '#79747E',
    outlineVariant:       '#CAC4D0',

    scrim:                '#000000',
    shadow:               '#000000',

    // Extended success (not in M3 baseline, custom tonal)
    success:              '#1B6D2F',
    successContainer:     '#A4F4AA',
    onSuccessContainer:   '#002107',

    // Extended warning
    warning:              '#7D5700',
    warningContainer:     '#FFDEA6',
    onWarningContainer:   '#271900',
  },

  // --- Elevation (M3 uses tonal surface tinting, not just shadows) ---
  elevation: {
    level0: 'none',
    level1: '0px 1px 2px 0px rgba(0,0,0,0.30), 0px 1px 3px 1px rgba(0,0,0,0.15)',
    level2: '0px 1px 2px 0px rgba(0,0,0,0.30), 0px 2px 6px 2px rgba(0,0,0,0.15)',
    level3: '0px 1px 3px 0px rgba(0,0,0,0.30), 0px 4px 8px 3px rgba(0,0,0,0.15)',
    level4: '0px 2px 3px 0px rgba(0,0,0,0.30), 0px 6px 10px 4px rgba(0,0,0,0.15)',
    level5: '0px 4px 4px 0px rgba(0,0,0,0.30), 0px 8px 12px 6px rgba(0,0,0,0.15)',
  },

  // --- Shape (Corner Radius) ---
  shape: {
    none:       0,
    extraSmall: 4,
    small:      8,
    medium:     12,
    large:      16,
    extraLarge: 28,
    full:       9999,
  },

  // --- M3 Type Scale (using Inter as a Roboto-equivalent) ---
  typeScale: {
    displayLarge:  { fontSize: '3.5625rem',  lineHeight: '4rem',    fontWeight: 400, letterSpacing: '-0.25px' },  // 57/64
    displayMedium: { fontSize: '2.8125rem',  lineHeight: '3.25rem', fontWeight: 400, letterSpacing: '0px' },      // 45/52
    displaySmall:  { fontSize: '2.25rem',    lineHeight: '2.75rem', fontWeight: 400, letterSpacing: '0px' },      // 36/44

    headlineLarge:  { fontSize: '2rem',      lineHeight: '2.5rem',  fontWeight: 400, letterSpacing: '0px' },      // 32/40
    headlineMedium: { fontSize: '1.75rem',   lineHeight: '2.25rem', fontWeight: 400, letterSpacing: '0px' },      // 28/36
    headlineSmall:  { fontSize: '1.5rem',    lineHeight: '2rem',    fontWeight: 400, letterSpacing: '0px' },      // 24/32

    titleLarge:  { fontSize: '1.375rem', lineHeight: '1.75rem', fontWeight: 400, letterSpacing: '0px' },          // 22/28
    titleMedium: { fontSize: '1rem',     lineHeight: '1.5rem',  fontWeight: 500, letterSpacing: '0.15px' },       // 16/24
    titleSmall:  { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500, letterSpacing: '0.1px' },        // 14/20

    bodyLarge:  { fontSize: '1rem',     lineHeight: '1.5rem',  fontWeight: 400, letterSpacing: '0.5px' },         // 16/24
    bodyMedium: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 400, letterSpacing: '0.25px' },        // 14/20
    bodySmall:  { fontSize: '0.75rem',  lineHeight: '1rem',    fontWeight: 400, letterSpacing: '0.4px' },         // 12/16

    labelLarge:  { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500, letterSpacing: '0.1px' },        // 14/20
    labelMedium: { fontSize: '0.75rem',  lineHeight: '1rem',    fontWeight: 500, letterSpacing: '0.5px' },        // 12/16
    labelSmall:  { fontSize: '0.6875rem', lineHeight: '1rem',   fontWeight: 500, letterSpacing: '0.5px' },        // 11/16
  },

  // --- State layer opacities ---
  stateLayer: {
    hover:   0.08,
    focus:   0.12,
    pressed: 0.12,
    dragged: 0.16,
  },
};

// ============================================================================
// MUI Theme — M3 Token Application
// ============================================================================

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: m3Tokens.color.primary,
      light: m3Tokens.color.primaryContainer,
      dark: m3Tokens.color.onPrimaryContainer,
      contrastText: m3Tokens.color.onPrimary,
    },
    secondary: {
      main: m3Tokens.color.secondary,
      light: m3Tokens.color.secondaryContainer,
      dark: m3Tokens.color.onSecondaryContainer,
      contrastText: m3Tokens.color.onSecondary,
    },
    error: {
      main: m3Tokens.color.error,
      light: m3Tokens.color.errorContainer,
      dark: m3Tokens.color.onErrorContainer,
      contrastText: m3Tokens.color.onError,
    },
    warning: {
      main: m3Tokens.color.warning,
      light: m3Tokens.color.warningContainer,
      dark: m3Tokens.color.onWarningContainer,
    },
    success: {
      main: m3Tokens.color.success,
      light: m3Tokens.color.successContainer,
      dark: m3Tokens.color.onSuccessContainer,
    },
    background: {
      default: m3Tokens.color.surface,
      paper: m3Tokens.color.surfaceContainerLowest,
    },
    text: {
      primary: m3Tokens.color.onSurface,
      secondary: m3Tokens.color.onSurfaceVariant,
      disabled: 'rgba(28, 27, 31, 0.38)',
    },
    divider: m3Tokens.color.outlineVariant,
    action: {
      active: m3Tokens.color.onSurfaceVariant,
      hover: `rgba(103, 80, 164, ${m3Tokens.stateLayer.hover})`,
      selected: `rgba(103, 80, 164, ${m3Tokens.stateLayer.pressed})`,
      disabledBackground: 'rgba(28, 27, 31, 0.12)',
      disabled: 'rgba(28, 27, 31, 0.38)',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    // Map M3 type scale to MUI variants
    h1: m3Tokens.typeScale.displayLarge,
    h2: m3Tokens.typeScale.displayMedium,
    h3: m3Tokens.typeScale.displaySmall,
    h4: m3Tokens.typeScale.headlineMedium,     // Page-level headings
    h5: m3Tokens.typeScale.headlineSmall,       // Section headings
    h6: m3Tokens.typeScale.titleLarge,          // Sub-section / card titles
    subtitle1: m3Tokens.typeScale.titleMedium,
    subtitle2: m3Tokens.typeScale.titleSmall,
    body1: m3Tokens.typeScale.bodyLarge,
    body2: m3Tokens.typeScale.bodyMedium,
    button: m3Tokens.typeScale.labelLarge,
    caption: m3Tokens.typeScale.labelMedium,
    overline: m3Tokens.typeScale.labelSmall,
  },

  shape: {
    borderRadius: m3Tokens.shape.medium,  // 12px default
  },

  // Export tokens for direct use in sx props
  m3: m3Tokens,

  components: {
    // --- Buttons ---
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: m3Tokens.shape.full,
          padding: '10px 24px',
          fontSize: m3Tokens.typeScale.labelLarge.fontSize,
          fontWeight: m3Tokens.typeScale.labelLarge.fontWeight,
          letterSpacing: m3Tokens.typeScale.labelLarge.letterSpacing,
          lineHeight: m3Tokens.typeScale.labelLarge.lineHeight,
          textTransform: 'none',
          minHeight: 40,
          transition: 'all 200ms ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: m3Tokens.elevation.level1,
          },
        },
        outlined: {
          borderColor: m3Tokens.color.outline,
        },
        text: {
          '&:hover': {
            backgroundColor: `rgba(103, 80, 164, ${m3Tokens.stateLayer.hover})`,
          },
        },
      },
    },

    // --- FABs ---
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: m3Tokens.shape.large,  // 16px
          boxShadow: m3Tokens.elevation.level3,
        },
      },
    },

    // --- Cards ---
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: m3Tokens.shape.medium,     // 12px
          boxShadow: 'none',
          backgroundColor: m3Tokens.color.surfaceContainerLow,
          border: `1px solid ${m3Tokens.color.outlineVariant}`,
          transition: 'box-shadow 200ms ease-in-out, border-color 200ms ease-in-out',
        },
      },
    },

    // --- Paper ---
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',  // Remove MUI gradient overlay
        },
        elevation0: { boxShadow: m3Tokens.elevation.level0 },
        elevation1: { boxShadow: m3Tokens.elevation.level1 },
        elevation2: { boxShadow: m3Tokens.elevation.level2 },
        elevation3: { boxShadow: m3Tokens.elevation.level3 },
      },
    },

    // --- Tabs ---
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderBottom: `1px solid ${m3Tokens.color.surfaceVariant}`,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: m3Tokens.color.primary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          fontWeight: 500,
          textTransform: 'none',
          fontSize: m3Tokens.typeScale.titleSmall.fontSize,
          letterSpacing: m3Tokens.typeScale.titleSmall.letterSpacing,
          color: m3Tokens.color.onSurfaceVariant,
          transition: 'background-color 200ms ease-in-out',
          borderTopLeftRadius: m3Tokens.shape.small,
          borderTopRightRadius: m3Tokens.shape.small,
          '&.Mui-selected': {
            color: m3Tokens.color.primary,
          },
          '&:hover': {
            backgroundColor: `rgba(103, 80, 164, ${m3Tokens.stateLayer.hover})`,
          },
        },
      },
    },

    // --- App Bar ---
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: m3Tokens.color.surface,
          color: m3Tokens.color.onSurface,
          boxShadow: 'none',
        },
      },
    },

    // --- Text Inputs ---
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: m3Tokens.shape.extraSmall,    // 4px
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: m3Tokens.color.outline,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: m3Tokens.color.onSurface,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: m3Tokens.color.primary,
            borderWidth: 2,
          },
        },
      },
    },

    // --- Dialogs ---
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: m3Tokens.shape.extraLarge,  // 28px
          padding: 8,
        },
      },
    },

    // --- Chips ---
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: m3Tokens.shape.small,       // 8px
          fontWeight: 500,
          fontSize: m3Tokens.typeScale.labelSmall.fontSize,
          letterSpacing: m3Tokens.typeScale.labelSmall.letterSpacing,
          height: 28,
        },
        outlined: {
          borderColor: m3Tokens.color.outline,
        },
      },
    },

    // --- Accordion ---
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: `${m3Tokens.shape.medium}px !important`,
          '&:before': { display: 'none' },
          boxShadow: 'none',
          border: `1px solid ${m3Tokens.color.outlineVariant}`,
          backgroundColor: m3Tokens.color.surfaceContainerLow,
        },
      },
    },

    // --- Drawer ---
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: `${m3Tokens.shape.large}px 0 0 ${m3Tokens.shape.large}px`,
          backgroundColor: m3Tokens.color.surfaceContainerLow,
        },
      },
    },

    // --- Switch ---
    MuiSwitch: {
      styleOverrides: {
        root: {
          // M3 switch proportions
        },
      },
    },

    // --- List ---
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: m3Tokens.shape.full,
          transition: 'background-color 200ms ease-in-out',
          '&:hover': {
            backgroundColor: `rgba(103, 80, 164, ${m3Tokens.stateLayer.hover})`,
          },
        },
      },
    },

    // --- Stepper ---
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: m3Tokens.typeScale.labelMedium.fontSize,
          fontWeight: m3Tokens.typeScale.labelMedium.fontWeight,
        },
      },
    },

    // --- Avatar ---
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 36,
          height: 36,
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      },
    },

    // --- Divider ---
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: m3Tokens.color.outlineVariant,
        },
      },
    },

    // --- Alert ---
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: m3Tokens.shape.medium,
        },
      },
    },

    // --- Tooltip ---
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: m3Tokens.color.inverseSurface,
          color: m3Tokens.color.inverseOnSurface,
          borderRadius: m3Tokens.shape.extraSmall,
          fontSize: m3Tokens.typeScale.bodySmall.fontSize,
        },
      },
    },
  },
});

// Attach raw tokens to theme for direct access in sx props: theme.m3.color.primary, etc.
theme.m3 = m3Tokens;

export default theme;
