import { createTheme } from "@mui/material/styles";

// Custom color variables
const colors = {
  textColor: "#2d2d2d",
  textSecondaryColor: "#c7c7c7",
  primaryColor: "#747bff",
  primaryColorHover: "#575cc4",
  secondaryColor: "#cd3e24",
  actionColor: "#baf54d",
  contrastColor: "#4a4a4a",
  backgroundColor: "#fdfdfd",
};

// Create custom theme
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primaryColor,
      light: colors.primaryColorHover,
      dark: colors.primaryColorHover,
      contrastText: colors.backgroundColor,
    },
    secondary: {
      main: colors.secondaryColor,
      light: colors.secondaryColor,
      dark: colors.secondaryColor,
      contrastText: colors.backgroundColor,
    },
    text: {
      primary: colors.textColor,
      secondary: colors.textSecondaryColor,
    },
    background: {
      default: colors.backgroundColor,
      paper: colors.backgroundColor,
    },
    action: {
      active: colors.actionColor,
      hover: colors.primaryColorHover,
      selected: colors.actionColor,
    },
    divider: colors.contrastColor,
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
          },
        },
        contained: {
          backgroundColor: colors.primaryColor,
          color: colors.backgroundColor,
          "&:hover": {
            backgroundColor: colors.primaryColorHover,
          },
        },
        outlined: {
          borderColor: colors.contrastColor,
          color: colors.textColor,
          "&:hover": {
            borderColor: colors.primaryColor,
            backgroundColor: colors.backgroundColor,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundColor,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.primaryColor,
          "&:hover": {
            color: colors.primaryColorHover,
          },
        },
      },
    },
  },
});
