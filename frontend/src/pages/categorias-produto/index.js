import { useCategoriasProduto } from "@/hooks/categorias_produto";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function CategoriasProduto() {
  const { data: categoriasProduto, isLoading } = useCategoriasProduto();

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h1">Categorias produto</Typography>
      <Stack gap={1} paddingTop={2}>
        {categoriasProduto?.map((categoria) => (
          <Typography key={categoria.id} variant="body1" title={categoria.nome}>
            {categoria.id} - {categoria.nome}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
