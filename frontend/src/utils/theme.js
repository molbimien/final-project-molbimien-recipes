import { createTheme } from "@mui/material/styles";

// MUI Default Theme: https://mui.com/customization/default-theme/

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
