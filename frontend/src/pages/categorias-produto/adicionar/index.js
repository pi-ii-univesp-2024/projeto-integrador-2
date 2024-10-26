import { useRouter } from "next/router"; // Importe useRouter
import MainLayout from "@/components/layouts/MainLayout";
import { Box, Stack, Typography } from "@mui/material";
import CategoriaProdutoForm from "@/components/categoria-produto/CategoriaProdutoForm";
import { useCreateCategoriaProduto } from "@/hooks/categorias_produto";

export default function CategoriaProdutoCriar() {
  const router = useRouter();
  const categoriaProdutoMutation = useCreateCategoriaProduto();

  const initialValues = {
    nome: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    await categoriaProdutoMutation.mutateAsync(values);
    resetForm();
    handleRedirect();
  };

  const handleRedirect = () => {
    router.push("/categorias-produto");
  };

  return (
    <MainLayout>
      <Box p={3}>
        <Stack gap={3}>
          <Stack component="header" gap={1}>
            <Typography
              component="h1"
              variant="h1"
              id="categoria-produto-title"
            >
              Adicionar categoria de produto
            </Typography>
            <Typography variant="body1">
              Crie uma nova categoria para relacionar seus produtos
            </Typography>
          </Stack>
          <Stack
            gap={1}
            maxWidth={600}
            component="section"
            aria-labelledby="categoria-produto-title"
          >
            <CategoriaProdutoForm
              handleSubmit={handleSubmit}
              handleRedirect={handleRedirect}
              initialValues={initialValues}
              action="add"
            />
          </Stack>
        </Stack>
      </Box>
    </MainLayout>
  );
}
