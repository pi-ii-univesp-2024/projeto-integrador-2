import MainLayout from "@/components/layouts/MainLayout";
import ProdutoForm from "@/components/produto/ProdutoForm";
import { useCreateProduto } from "@/hooks/produtos";
import { DateFromISO, DateToISO } from "@/util/date";
import { Box, Stack, Typography } from "@mui/material";

export default function ProdutoCriar() {
  const initialValues = {
    nome: "",
    descricao: "",
    categoria: "",
    marca: "",
    fornecedor: "",
    unidade_medida: "",
    preco_por_unidade: "",
    quantidade_estoque: "",
    quantidade_minima: "",
    data_validade: "",
  };

  const produtoMutation = useCreateProduto();

  const handleSubmit = async (values) => {
    const data_validade = DateToISO(values.data_validade);
    await produtoMutation.mutateAsync({ ...values, data_validade });
    console.log(values);
  };

  return (
    <MainLayout>
      <Box>
        <Stack gap={3}>
          <Stack gap={1}>
            <Typography variant="h1">Adicionar produto</Typography>
            <Typography variant="body1">
              Crie um novo produto para seu estoque
            </Typography>
          </Stack>
          <Stack gap={1} maxWidth={600}>
            <ProdutoForm
              handleSubmit={handleSubmit}
              initialValues={initialValues}
            />
          </Stack>
        </Stack>
      </Box>
    </MainLayout>
  );
}
