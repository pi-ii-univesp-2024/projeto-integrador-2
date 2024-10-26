import { useRouter } from "next/router"; // Importe useRouter
import MainLayout from "@/components/layouts/MainLayout";
import { useEditProduto } from "@/hooks/produtos";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useCategoriaProduto, useEditCategoriaProduto } from "@/hooks/categorias_produto";
import CategoriaProdutoForm from "@/components/categoria-produto/CategoriaProdutoForm";

export default function CategoriaProdutoEditar() {
  const router = useRouter();
  const params = useParams();

  const categoriaProdutoId = Number(params?.categoria_id);

  const queryOptions = { enabled: !!categoriaProdutoId };
  const { data: categoriaProduto, isLoading } = useCategoriaProduto(
    categoriaProdutoId,
    queryOptions
  );

  const categoriaProdutoMutation = useEditCategoriaProduto(categoriaProdutoId);

  const initialValues = {
    nome: categoriaProduto?.nome,
  };

  const handleSubmit = async (values, { resetForm }) => {
    await categoriaProdutoMutation.mutateAsync(values);
    handleRedirect();
  };

  const handleRedirect = () => {
    router.push("/categorias-produto");
  };

  return (
    <MainLayout>
      {(isLoading || !categoriaProduto) && <CircularProgress />}
      {!isLoading && categoriaProduto && (
        <Box>
          <Stack gap={3}>
            <Stack gap={1}>
              <Typography variant="h1">Editar categoria de produto</Typography>
              <Typography variant="body1">
                Edite as informações da categoria dos seus produtos
              </Typography>
            </Stack>
            <Stack gap={1} maxWidth={600}>
              <CategoriaProdutoForm
                handleSubmit={handleSubmit}
                handleRedirect={handleRedirect}
                initialValues={initialValues}
                action="edit"
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </MainLayout>
  );
}
