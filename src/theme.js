import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

// ============================================================================
// xStudio AI Studio — Design Token System
// Mapped from AI Studio CSS variables (tailwind.css / global.less)
// Primary: rgb(90,75,254) / #5A4BFE  (--colors-background-core-standard)
// Accent:  #00beb4                    (--accent-primary)
// Red CTA: #d82121                    (Ant Design brand override)
// ============================================================================

const xStudioTokens = {
  // --- Color Roles (Light Scheme — mapped from AI Studio CSS vars) ---
  color: {
    // Brand purple (--colors-background-core-standard / --colors-text-core-standard)
    primary:              '#5A4BFE',
    onPrimary:            '#FFFFFF',
    primaryContainer:     '#EDE9FF',
    onPrimaryContainer:   '#1A0066',

    // Red CTA (Ant Design text button / radio checked in global.less)
    secondary:            '#d82121',
    onSecondary:          '#FFFFFF',
    secondaryContainer:   '#FEE2E2',
    onSecondaryContainer: '#7F1D1D',

    // Teal accent (--accent-primary: #00beb4)
    tertiary:             '#00beb4',
    onTertiary:           '#FFFFFF',
    tertiaryContainer:    '#CCFBF1',
    onTertiaryContainer:  '#134E4A',

    // Error (--state-error / --colors-text-functional-danger)
    error:                '#DC2626',
    onError:              '#FFFFFF',
    errorContainer:       '#FEE2E2',
    onErrorContainer:     '#7F1D1D',

    // Surfaces (--bg-base, --bg-card, --bg-component, --bg-input, --bg-title)
    surface:              '#FFFFFF',
    onSurface:            '#1A1A1A',
    surfaceVariant:       '#F0EFF4',
    onSurfaceVariant:     '#6B7280',

    surfaceContainerLowest:  '#FFFFFF',
    surfaceContainerLow:     '#FAFAFA',
    surfaceContainer:        '#F5F5F7',
    surfaceContainerHigh:    '#EFEFEF',
    surfaceContainerHighest: '#E8E8ED',

    // Inverse (terminal / dark panels)
    inverseSurface:       '#1E293B',
    inverseOnSurface:     '#E2E8F0',
    inversePrimary:       '#A78BFA',

    // Borders (--border-default, --border-accent)
    outline:              '#9CA3AF',
    outlineVariant:       '#E5E7EB',

    scrim:                '#000000',
    shadow:               '#000000',

    // Extended success (--state-success)
    success:              '#16A34A',
    successContainer:     '#DCFCE7',
    onSuccessContainer:   '#14532D',

    // Extended warning (--state-warning)
    warning:              '#D97706',
    warningContainer:     '#FEF3C7',
    onWarningContainer:   '#78350F',
  },

  // --- Elevation (same structure, slightly refined shadows) ---
  elevation: {
    level0: 'none',
    level1: '0px 1px 2px 0px rgba(0,0,0,0.06), 0px 1px 3px 0px rgba(0,0,0,0.10)',
    level2: '0px 1px 2px 0px rgba(0,0,0,0.06), 0px 2px 6px 2px rgba(0,0,0,0.10)',
    level3: '0px 1px 3px 0px rgba(0,0,0,0.10), 0px 4px 8px 3px rgba(0,0,0,0.08)',
    level4: '0px 2px 3px 0px rgba(0,0,0,0.10), 0px 6px 10px 4px rgba(0,0,0,0.08)',
    level5: '0px 4px 4px 0px rgba(0,0,0,0.10), 0px 8px 12px 6px rgba(0,0,0,0.08)',
  },

  // --- Shape (Corner Radius) — --radius: 0.5rem (8px) ---
  shape: {
    none:       0,
    extraSmall: 4,
    small:      8,
    medium:     12,
    large:      16,
    extraLarge: 28,
    full:       9999,
  },

  // --- Type Scale (using Inter — mapped through SF Pro Display font-family) ---
  typeScale: {
    displayLarge:  { fontSize: '3.5625rem',  lineHeight: '4rem',    fontWeight: 400, letterSpacing: '-0.25px' },
    displayMedium: { fontSize: '2.8125rem',  lineHeight: '3.25rem', fontWeight: 400, letterSpacing: '0px' },
    displaySmall:  { fontSize: '2.25rem',    lineHeight: '2.75rem', fontWeight: 400, letterSpacing: '0px' },

    headlineLarge:  { fontSize: '2rem',      lineHeight: '2.5rem',  fontWeight: 400, letterSpacing: '0px' },
    headlineMedium: { fontSize: '1.75rem',   lineHeight: '2.25rem', fontWeight: 400, letterSpacing: '0px' },
    headlineSmall:  { fontSize: '1.5rem',    lineHeight: '2rem',    fontWeight: 400, letterSpacing: '0px' },

    titleLarge:  { fontSize: '1.375rem', lineHeight: '1.75rem', fontWeight: 400, letterSpacing: '0px' },
    titleMedium: { fontSize: '1rem',     lineHeight: '1.5rem',  fontWeight: 500, letterSpacing: '0.15px' },
    titleSmall:  { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500, letterSpacing: '0.1px' },

    bodyLarge:  { fontSize: '1rem',     lineHeight: '1.5rem',  fontWeight: 400, letterSpacing: '0.5px' },
    bodyMedium: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 400, letterSpacing: '0.25px' },
    bodySmall:  { fontSize: '0.75rem',  lineHeight: '1rem',    fontWeight: 400, letterSpacing: '0.4px' },

    labelLarge:  { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500, letterSpacing: '0.1px' },
    labelMedium: { fontSize: '0.75rem',  lineHeight: '1rem',    fontWeight: 500, letterSpacing: '0.5px' },
    labelSmall:  { fontSize: '0.6875rem', lineHeight: '1rem',   fontWeight: 500, letterSpacing: '0.5px' },
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
// MUI Theme — xStudio Token Application
// ============================================================================

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: xStudioTokens.color.primary,
      light: xStudioTokens.color.primaryContainer,
      dark: xStudioTokens.color.onPrimaryContainer,
      contrastText: xStudioTokens.color.onPrimary,
    },
    secondary: {
      main: xStudioTokens.color.secondary,
      light: xStudioTokens.color.secondaryContainer,
      dark: xStudioTokens.color.onSecondaryContainer,
      contrastText: xStudioTokens.color.onSecondary,
    },
    error: {
      main: xStudioTokens.color.error,
      light: xStudioTokens.color.errorContainer,
      dark: xStudioTokens.color.onErrorContainer,
      contrastText: xStudioTokens.color.onError,
    },
    warning: {
      main: xStudioTokens.color.warning,
      light: xStudioTokens.color.warningContainer,
      dark: xStudioTokens.color.onWarningContainer,
    },
    success: {
      main: xStudioTokens.color.success,
      light: xStudioTokens.color.successContainer,
      dark: xStudioTokens.color.onSuccessContainer,
    },
    info: {
      main: xStudioTokens.color.tertiary,
      light: xStudioTokens.color.tertiaryContainer,
      dark: xStudioTokens.color.onTertiaryContainer,
      contrastText: xStudioTokens.color.onTertiary,
    },
    background: {
      default: xStudioTokens.color.surface,
      paper: xStudioTokens.color.surfaceContainerLowest,
    },
    text: {
      primary: xStudioTokens.color.onSurface,
      secondary: xStudioTokens.color.onSurfaceVariant,
      disabled: 'rgba(26, 26, 26, 0.38)',
    },
    divider: xStudioTokens.color.outlineVariant,
    action: {
      active: xStudioTokens.color.onSurfaceVariant,
      hover: `rgba(90, 75, 254, ${xStudioTokens.stateLayer.hover})`,
      selected: `rgba(90, 75, 254, ${xStudioTokens.stateLayer.pressed})`,
      disabledBackground: 'rgba(26, 26, 26, 0.12)',
      disabled: 'rgba(26, 26, 26, 0.38)',
    },
  },

  typography: {
    fontFamily: '"Inter", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    // Map type scale to MUI variants
    h1: xStudioTokens.typeScale.displayLarge,
    h2: xStudioTokens.typeScale.displayMedium,
    h3: xStudioTokens.typeScale.displaySmall,
    h4: xStudioTokens.typeScale.headlineMedium,
    h5: xStudioTokens.typeScale.headlineSmall,
    h6: xStudioTokens.typeScale.titleLarge,
    subtitle1: xStudioTokens.typeScale.titleMedium,
    subtitle2: xStudioTokens.typeScale.titleSmall,
    body1: xStudioTokens.typeScale.bodyLarge,
    body2: xStudioTokens.typeScale.bodyMedium,
    button: xStudioTokens.typeScale.labelLarge,
    caption: xStudioTokens.typeScale.labelMedium,
    overline: xStudioTokens.typeScale.labelSmall,
  },

  shape: {
    borderRadius: xStudioTokens.shape.medium,
  },

  // Export tokens for direct use in sx props
  m3: xStudioTokens,

  components: {
    // --- Buttons ---
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: xStudioTokens.shape.full,
          padding: '10px 24px',
          fontSize: xStudioTokens.typeScale.labelLarge.fontSize,
          fontWeight: xStudioTokens.typeScale.labelLarge.fontWeight,
          letterSpacing: xStudioTokens.typeScale.labelLarge.letterSpacing,
          lineHeight: xStudioTokens.typeScale.labelLarge.lineHeight,
          textTransform: 'none',
          minHeight: 40,
          transition: 'all 200ms ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: xStudioTokens.elevation.level1,
          },
        },
        outlined: {
          borderColor: xStudioTokens.color.outline,
        },
        text: {
          '&:hover': {
            backgroundColor: `rgba(90, 75, 254, ${xStudioTokens.stateLayer.hover})`,
          },
        },
      },
    },

    // --- FABs ---
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: xStudioTokens.shape.large,
          boxShadow: xStudioTokens.elevation.level3,
        },
      },
    },

    // --- Cards ---
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: xStudioTokens.shape.medium,
          boxShadow: 'none',
          backgroundColor: xStudioTokens.color.surfaceContainerLow,
          border: `1px solid ${xStudioTokens.color.outlineVariant}`,
          transition: 'box-shadow 200ms ease-in-out, border-color 200ms ease-in-out',
        },
      },
    },

    // --- Paper ---
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation0: { boxShadow: xStudioTokens.elevation.level0 },
        elevation1: { boxShadow: xStudioTokens.elevation.level1 },
        elevation2: { boxShadow: xStudioTokens.elevation.level2 },
        elevation3: { boxShadow: xStudioTokens.elevation.level3 },
      },
    },

    // --- Tabs ---
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderBottom: `1px solid ${xStudioTokens.color.surfaceVariant}`,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: xStudioTokens.color.primary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          fontWeight: 500,
          textTransform: 'none',
          fontSize: xStudioTokens.typeScale.titleSmall.fontSize,
          letterSpacing: xStudioTokens.typeScale.titleSmall.letterSpacing,
          color: xStudioTokens.color.onSurfaceVariant,
          transition: 'background-color 200ms ease-in-out',
          borderTopLeftRadius: xStudioTokens.shape.small,
          borderTopRightRadius: xStudioTokens.shape.small,
          '&.Mui-selected': {
            color: xStudioTokens.color.primary,
          },
          '&:hover': {
            backgroundColor: `rgba(90, 75, 254, ${xStudioTokens.stateLayer.hover})`,
          },
        },
      },
    },

    // --- App Bar ---
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: xStudioTokens.color.surface,
          color: xStudioTokens.color.onSurface,
          boxShadow: 'none',
        },
      },
    },

    // --- Text Inputs ---
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: xStudioTokens.shape.extraSmall,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: xStudioTokens.color.outline,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: xStudioTokens.color.onSurface,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: xStudioTokens.color.primary,
            borderWidth: 2,
          },
        },
      },
    },

    // --- Dialogs ---
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: xStudioTokens.shape.extraLarge,
          padding: 8,
        },
      },
    },

    // --- Chips ---
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: xStudioTokens.shape.small,
          fontWeight: 500,
          fontSize: xStudioTokens.typeScale.labelSmall.fontSize,
          letterSpacing: xStudioTokens.typeScale.labelSmall.letterSpacing,
          height: 28,
        },
        outlined: {
          borderColor: xStudioTokens.color.outline,
        },
      },
    },

    // --- Accordion ---
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: `${xStudioTokens.shape.medium}px !important`,
          '&:before': { display: 'none' },
          boxShadow: 'none',
          border: `1px solid ${xStudioTokens.color.outlineVariant}`,
          backgroundColor: xStudioTokens.color.surfaceContainerLow,
        },
      },
    },

    // --- Drawer ---
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: `${xStudioTokens.shape.large}px 0 0 ${xStudioTokens.shape.large}px`,
          backgroundColor: xStudioTokens.color.surfaceContainerLow,
        },
      },
    },

    // --- Switch — Accent teal (#00beb4) ---
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: xStudioTokens.color.tertiary,
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: xStudioTokens.color.tertiary,
          },
        },
      },
    },

    // --- List ---
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: xStudioTokens.shape.full,
          transition: 'background-color 200ms ease-in-out',
          '&:hover': {
            backgroundColor: `rgba(90, 75, 254, ${xStudioTokens.stateLayer.hover})`,
          },
        },
      },
    },

    // --- Stepper ---
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: xStudioTokens.typeScale.labelMedium.fontSize,
          fontWeight: xStudioTokens.typeScale.labelMedium.fontWeight,
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
          borderColor: xStudioTokens.color.outlineVariant,
        },
      },
    },

    // --- Alert ---
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: xStudioTokens.shape.medium,
        },
      },
    },

    // --- Tooltip ---
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: xStudioTokens.color.inverseSurface,
          color: xStudioTokens.color.inverseOnSurface,
          borderRadius: xStudioTokens.shape.extraSmall,
          fontSize: xStudioTokens.typeScale.bodySmall.fontSize,
        },
      },
    },
  },
});

// Attach raw tokens to theme for direct access in sx props: theme.m3.color.primary, etc.
theme.m3 = xStudioTokens;

export default theme;
