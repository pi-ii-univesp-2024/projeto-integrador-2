import CustomSearchInput from "@/components/forms/CustomSearchInput";
import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import useDebounce from "@/hooks/debounce";
import { useEstoques } from "@/hooks/estoque";
import { useProduto } from "@/hooks/produtos";
import { DateFromISO } from "@/util/date";
import { ESTOQUE_TIPO_OPTIONS } from "@/util/estoque";
import { handleSortModel } from "@/util/sort";
import { Box, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Estoque() {
  const [offset, setOffset] = useState(0);
  const [ordering, setOrdering] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const searchDebounced = useDebounce(searchValue, 500);

  const params = { limit: 10, offset, ordering, search: searchDebounced };
  const { data: estoques, count, isLoading } = useEstoques(params);

  const handleSortModelChange = (order) => {
    setOrdering(handleSortModel(order));
  };

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
      headerName: "Data da movimentação",
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
      <Box p={3}>
        <Typography variant="h1">Estoque e movimentações</Typography>
        <Stack component="section" paddingTop={2} gap={2}>
          <Box maxWidth={300}>
            <CustomSearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholder="Buscar por nome e tipo"
            />
          </Box>
          {isLoading && <CircularProgress />}
          {!isLoading && (
            <CustomDataGrid
              rows={estoques || []}
              columns={columns}
              loading={isLoading}
              rowCount={count}
              offset={offset}
              setOffset={setOffset}
              handleSortModelChange={handleSortModelChange}
            />
          )}
        </Stack>
      </Box>
    </MainLayout>
  );
}

function ProdutoRow({ produtoId }) {
  const queryOptions = { enabled: !!produtoId };
  const { data: produto, isLoading } = useProduto(produtoId, queryOptions);

  if (isLoading || !produto) return <CircularProgress />;

  return (
    <CustomLink
      href={`/produtos/${produtoId}`}
      ariaLabel="Ir para a página do produto"
    >
      <Typography variant="body2" title={produto.nome} color="primary">
        {produto.nome}
      </Typography>
    </CustomLink>
  );
}

function QuantidadeRow({ quantidade }) {
  if (!quantidade) return null;

  const quantidadeComVirgula = quantidade.replace(".", ",");

  return (
    <Typography variant="body2" title={quantidadeComVirgula}>
      {quantidadeComVirgula}
    </Typography>
  );
}

function TipoRow({ tipo }) {
  if (!tipo) return null;

  const label = ESTOQUE_TIPO_OPTIONS?.find(
    (item) => item.value === tipo
  )?.label;
  const colorOptions = {
    ENTRADA: "primary",
    SAIDA: "error",
  };
  const color = colorOptions[tipo] || "default";

  return <Chip label={label} title={label} color={color} size="small" />;
}
