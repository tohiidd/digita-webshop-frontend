import { createTheme } from "@mui/material/styles";
import { Shadows } from "@mui/material/styles/shadows";
import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    digitaBlack: string;
    digitaRed: string;
    digitaGrey: string;
    digitaGrey1: string;
    digitaGrey2: string;
    digitaGrey3: string;
    digitaGrey4: string;
    digitaGrey5: string;
  }
}

export const theme = createTheme({
  palette: {
    common: {
      digitaBlack: "#333333",
      digitaRed: "#f03637",
      digitaGrey: "#777777",
      digitaGrey1: "#808080",
      digitaGrey2: "#C1C4C9CC",
      digitaGrey3: "#666666",
      digitaGrey4: "#5454540D",
      digitaGrey5: "#F5F5F5",
    },
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#777777",
    },
    error: {
      main: "#f03637",
    },
  },
  typography: {
    fontFamily: ["jost", "sans-serif"].join(","),
    h1: {
      fontSize: 68,
    },
    h3: {
      fontSize: 40,
    },
    h4: {
      fontSize: 32,
    },
    subtitle1: {
      fontSize: 15,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 1,
          "&:hover": {
            backgroundColor: "#f03637",
          },
          textTransform: "capitalize",
        },
      },
    },
  },
  shadows: Array(25).fill("none") as Shadows,
});
