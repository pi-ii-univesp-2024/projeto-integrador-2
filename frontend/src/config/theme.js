import { createTheme } from "@mui/material/styles";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-data-grid";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

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
        fontFamily: ["Nunito", "Roboto", "sans-serif"].join(","),
        h1: {
          fontSize: "2rem",
          fontWeight: 700,
        },
        h2: {
          fontSize: "1.75rem",
          fontWeight: 600,
        },
        h3: {
          fontSize: "1.5rem",
          fontWeight: 500,
        },
        h4: {
          fontSize: "1.25rem",
          fontWeight: 500,
        },
        h5: {
          fontSize: "1.125rem",
          fontWeight: 400,
        },
        h6: {
          fontSize: "1rem",
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: "1rem",
          fontWeight: 400,
        },
        subtitle2: {
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        body1: {
          fontSize: "1rem",
          fontWeight: 400,
        },
        body2: {
          fontSize: "0.875rem",
          fontWeight: 400,
        },
        caption: {
          fontSize: "0.75rem",
          fontWeight: 400,
        },
        button: {
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "uppercase", 
        },
        overline: {
          fontSize: "0.75rem",
          fontWeight: 400,
          letterSpacing: 1.5, 
          textTransform: "uppercase",
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
