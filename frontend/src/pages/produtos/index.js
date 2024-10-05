import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useFornecedor } from "@/hooks/fornecedor";
import { useProdutos } from "@/hooks/produtos";
import { DateFromISO } from "@/util/date";
import { formatPrecoReal } from "@/util/numbers";
import { UNIDADES_PRODUTO_OPTIONS } from "@/util/produtos";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function Produtos() {
  const { data: produtos, isLoading } = useProdutos();

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (props) => (
        <NomeRow nome={props.value} produtoId={props.row.id} />
      ),
      flex: 1,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "marca",
      headerName: "Marca",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "fornecedor",
      headerName: "Fornecedor",
      renderCell: (props) => <FornecedorRow fornecedorId={props.value} />,
      flex: 1,
    },
    {
      field: "preco_por_unidade",
      headerName: "R$/unidade",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => <PrecoPorUnidadeRow preco={props.value} />,
      flex: 1,
    },
    {
      field: "unidade_medida",
      headerName: "Unidade de medida",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => <UnidadeMedidaRow unidade={props.value} />,
      flex: 1,
    },
    {
      field: "quantidade_estoque",
      headerName: "Quantidade em estoque",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => <QuantidadeRow quantidade={props.value} />,
      flex: 1,
    },
    {
      field: "quantidade_minima",
      headerName: "Quantidade mínima",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => <QuantidadeRow quantidade={props.value} />,
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
    {
      field: "updated_at",
      headerName: "Data de edição",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => {
        const updated_at = DateFromISO(props.value);
        return (
          <Typography variant="body2" title={updated_at}>
            {updated_at}
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
          <Typography variant="h1">Produtos</Typography>
          <Stack paddingTop={2}>
            <CustomDataGrid
              rows={produtos || []}
              columns={columns}
              loading={isLoading}
            />
          </Stack>
        </Box>
      )}
    </MainLayout>
  );
}

function NomeRow({ nome, produtoId }) {
  return (
    <CustomLink href={`/produtos/${produtoId}`}>
      <Typography variant="body2" title={nome} color="primary">
        {nome}
      </Typography>
    </CustomLink>
  );
}

function FornecedorRow({ fornecedorId }) {
  const queryOptions = { enabled: !!fornecedorId };
  const { data: fornecedor, isLoading } = useFornecedor(
    fornecedorId,
    queryOptions
  );

  if (isLoading || !fornecedor) return <CircularProgress />;

  return (
    <CustomLink href={`/fornecedores/${fornecedorId}`}>
      <Typography variant="body2" title={fornecedor.nome} color="primary">
        {fornecedor.nome || "-"}
      </Typography>
    </CustomLink>
  );
}

function PrecoPorUnidadeRow({ preco }) {
  if (!preco) return;

  const precoEmReal = formatPrecoReal(preco);

  return (
    <Typography variant="body2" title={precoEmReal}>
      {precoEmReal}
    </Typography>
  );
}

function UnidadeMedidaRow({ unidade }) {
  if (!unidade) return;

  const label = UNIDADES_PRODUTO_OPTIONS?.find(
    (item) => item.value === unidade
  )?.label;

  return (
    <Typography variant="body2" title={label}>
      {label}
    </Typography>
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
