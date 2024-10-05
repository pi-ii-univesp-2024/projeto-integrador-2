import { createTheme } from "@mui/material/styles";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-data-grid";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

import { Nunito, Inter } from "next/font/google";

export const fontPrimary = Nunito({
  subsets: ["latin"],
  variable: "--default-font",
  weight: ["400", "500", "600", "700"],
});
export const fontSecondary = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const getTheme = () => {
  dayjs.locale("pt-br");
  return createTheme(
    {
      palette: {
        primary: {
          main: "#1976d2",
        },
        secondary: {
          main: "#dc004e",
        },
        background: {
          default: "#f4f4f4",
        },
        text: {
          primary: "#333",
          secondary: "#555",
        },
      },
      typography: {
        fontFamily: ["Nunito", "Inter", "sans-serif"].join(","),
        h1: {
          fontSize: "2rem",
          fontWeight: 700,
          fontFamily: fontSecondary.style.fontFamily,
        },
        h2: {
          fontSize: "1.75rem",
          fontWeight: 600,
          fontFamily: fontSecondary.style.fontFamily,
        },
        h3: {
          fontSize: "1.5rem",
          fontWeight: 500,
          fontFamily: fontSecondary.style.fontFamily,
        },
        h4: {
          fontSize: "1.25rem",
          fontWeight: 500,
          fontFamily: fontSecondary.style.fontFamily,
        },
        h5: {
          fontSize: "1.125rem",
          fontWeight: 400,
          fontFamily: fontSecondary.style.fontFamily,
        },
        h6: {
          fontSize: "1rem",
          fontWeight: 400,
          fontFamily: fontSecondary.style.fontFamily,
        },
        subtitle1: {
          fontSize: "1rem",
          fontWeight: 400,
          fontFamily: fontPrimary.style.fontFamily,
        },
        subtitle2: {
          fontSize: "0.875rem",
          fontWeight: 500,
          fontFamily: fontPrimary.style.fontFamily,
        },
        body1: {
          fontSize: "1rem",
          fontWeight: 400,
          fontFamily: fontPrimary.style.fontFamily,
        },
        body2: {
          fontSize: "0.875rem",
          fontWeight: 400,
          fontFamily: fontPrimary.style.fontFamily,
        },
        caption: {
          fontSize: "0.75rem",
          fontWeight: 400,
          fontFamily: fontPrimary.style.fontFamily,
        },
        button: {
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "uppercase",
          fontFamily: fontPrimary.style.fontFamily,
        },
        overline: {
          fontSize: "0.75rem",
          fontWeight: 400,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontFamily: fontPrimary.style.fontFamily,
        },
      },
      spacing: 8,
      gap: 8,
    },
    corePtBR,
    ptBR
  );
};

export default getTheme;
