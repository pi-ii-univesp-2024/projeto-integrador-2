import { useRouter } from "next/router"; // Importe useRouter
import MainLayout from "@/components/layouts/MainLayout";
import ProdutoForm from "@/components/produto/ProdutoForm";
import { useEditProduto, useProduto } from "@/hooks/produtos";
import { DateToISO } from "@/util/date";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

export default function ProdutoEditar() {
  const router = useRouter();
  const params = useParams();

  const produtoId = Number(params?.produto_id);

  const queryOptions = { enabled: !!produtoId };
  const { data: produto, isLoading } = useProduto(produtoId, queryOptions);

  const produtoMutation = useEditProduto(produtoId);

  const initialValues = {
    nome: produto?.nome,
    descricao: produto?.descricao,
    categoria: produto?.categoria,
    marca: produto?.marca,
    fornecedor: produto?.fornecedor,
    unidade_medida: produto?.unidade_medida,
    preco_por_unidade: Number(produto?.preco_por_unidade),
    quantidade_minima: Number(produto?.quantidade_minima),
    data_validade: dayjs(produto?.data_validade),
  };

  const handleSubmit = async (values, { resetForm }) => {
    const data_validade = DateToISO(values?.data_validade);
    await produtoMutation.mutateAsync({ ...values, data_validade });
    handleRedirect();
  };

  const handleRedirect = () => {
    router.push("/produtos");
  };

  return (
    <MainLayout>
      {(isLoading || !produto) && <CircularProgress />}
      {!isLoading && produto && (
        <Box>
          <Stack gap={3}>
            <Stack gap={1}>
              <Typography variant="h1">Editar produto</Typography>
              <Typography variant="body1">
                Edite as informações do produto em seu estoque
              </Typography>
            </Stack>
            <Stack gap={1} maxWidth={600}>
              <ProdutoForm
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
