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
        body1: {
          fontSize: "1rem",
          fontWeight: 400,
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
