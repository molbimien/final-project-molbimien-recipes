import { createTheme } from "@mui/material/styles";

// MUI Default Theme: https://mui.com/customization/default-theme/
// MUI breakpoints: https://mui.com/customization/breakpoints/
// MUI sx prop: https://mui.com/system/the-sx-prop/

export const theme = createTheme({
  palette: {
    primary: {
      light: "#ff70bd",
      main: "#DB398D",
      dark: "#a50060",
      contrastText: "#fff",
    },

    secondary: {
      main: "#616161",
      contrastText: "#fff",
    },
  },
});
