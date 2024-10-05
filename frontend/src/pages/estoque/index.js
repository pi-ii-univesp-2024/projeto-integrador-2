import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useEstoque } from "@/hooks/estoque";
import { useProduto } from "@/hooks/produtos";
import { DateFromISO } from "@/util/date";
import { ESTOQUE_TIPO_OPTIONS } from "@/util/estoque";
import { Box, Chip, CircularProgress, Stack, Typography } from "@mui/material";

export default function Estoque() {
  const { data: estoque, isLoading } = useEstoque();

  const columns = [
    {
      field: "produto",
      headerName: "Produto",
      renderCell: (props) => <ProdutoRow produtoId={props.value} />,
      flex: 1,
    },
    {
      field: "quantidade",
      headerName: "Quantidade",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => <QuantidadeRow quantidade={props.value} />,
      flex: 1,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => <TipoRow tipo={props.value} />,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Data de criação",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => {
        const created_at = DateFromISO(props.value);
        return (
          <Typography variant="body2" title={created_at}>
            {created_at}
          </Typography>
        );
      },
      flex: 1,
    },
  ];

  return (
    <MainLayout>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Box>
          <Typography variant="h1">Estoque e movimentações</Typography>
          <Stack paddingTop={2}>
            <CustomDataGrid
              rows={estoque || []}
              columns={columns}
              loading={isLoading}
            />
          </Stack>
        </Box>
      )}
    </MainLayout>
  );
}

function ProdutoRow({ produtoId }) {
  const queryOptions = { enabled: !!produtoId };
  const { data: produto, isLoading } = useProduto(produtoId, queryOptions);

  if (isLoading || !produto) return <CircularProgress />;

  return (
    <Box width="fit-content">
      <CustomLink href={`produtos/${produtoId}`}>
        <Typography variant="body2" title={produto.nome}>
          {produto.nome}
        </Typography>
      </CustomLink>
    </Box>
  );
}

function QuantidadeRow({ quantidade }) {
  if (!quantidade) return;

  const quantidadeComVirgula = quantidade.replace(".", ",");

  return (
    <Typography variant="body2" title={quantidadeComVirgula}>
      {quantidadeComVirgula}
    </Typography>
  );
}

function TipoRow({ tipo }) {
  if (!tipo) return;

  const label = ESTOQUE_TIPO_OPTIONS?.find((item) => item.value === tipo)?.label;
  const colorOptions = {
    ENTRADA: "primary",
    SAIDA: "error",
  };
  const color = colorOptions[tipo] || "default";

  return <Chip label={label} title={label} color={color} size="small" />;
}
