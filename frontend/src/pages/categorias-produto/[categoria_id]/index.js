import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function CategoriaProduto() {
  const params = useParams();
  const categoriaProdutoId = params?.categoria_id;
  return (
    <Box>
      <Typography variant="h1">Categoria {categoriaProdutoId}</Typography>
    </Box>
  );
}
