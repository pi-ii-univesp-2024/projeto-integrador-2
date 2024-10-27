import CustomSearchInput from "@/components/forms/CustomSearchInput";
import CustomHeaderPage from "@/components/generics/CustomHeaderPage";
import CustomLink from "@/components/generics/CustomLink";
import CustomLoader from "@/components/generics/CustomLoader";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import RegistroProdutoEstoqueModal from "@/components/produto/RegistroProdutoEstoqueModal";
import { useCategoriaProduto } from "@/hooks/categorias_produto";
import useDebounce from "@/hooks/debounce";
import { useFornecedor } from "@/hooks/fornecedor";
import { useProdutos } from "@/hooks/produtos";
import { DateFromISO } from "@/util/date";
import { formatPrecoReal } from "@/util/numbers";
import { UNIDADES_PRODUTO_OPTIONS } from "@/util/produtos";
import { handleSortModel } from "@/util/sort";
import { AddOutlined, ModeEditOutlineOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Produtos() {
  const [offset, setOffset] = useState(0);
  const [ordering, setOrdering] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const searchDebounced = useDebounce(searchValue, 500);

  const params = { limit: 10, offset, ordering, search: searchDebounced };

  const { data: produtos, count, isLoading } = useProdutos(params);
  const router = useRouter();

  const handleSortModelChange = (order) => {
    setOrdering(handleSortModel(order));
  };

  const [produtoId, setProdutoId] = useState();
  const [openRegistroProdutoEstoqueModal, setOpenRegistroProdutoEstoqueModal] =
    useState(false);

  const handleRedirectProdutoAdd = () => {
    router.push("/produtos/adicionar");
  };

  const handleRedirectProdutoEdit = (produtoId) => {
    router.push(`/produtos/${produtoId}/editar`);
  };

  const handleOpenRegistroProdutoEstoqueModal = (produtoId) => {
    setProdutoId(produtoId);
    setOpenRegistroProdutoEstoqueModal(true);
  };

  const handleCloseRegistroEstoqueProdutoModal = () => {
    setOpenRegistroProdutoEstoqueModal(false);
  };

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
      field: "categoria",
      headerName: "Categoria",
      renderCell: (props) => <CategoriaRow categoriaId={props.value} />,
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
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      getActions: (props) => [
        <GridActionsCellItem
          key="editar_produto"
          title="Editar produto"
          label="Editar produto"
          icon={<ModeEditOutlineOutlined />}
          onClick={() => {
            handleRedirectProdutoEdit(props.row.id);
          }}
        />,
        <GridActionsCellItem
          key="registro_estoque"
          title="Registro de estoque"
          label="Registro de estoque"
          icon={<AddOutlined />}
          onClick={() => {
            handleOpenRegistroProdutoEstoqueModal(props.row.id);
          }}
        />,
      ],
      flex: 1,
    },
  ];

  return (
    <MainLayout>
      <Box p={3}>
        <CustomHeaderPage
          title="Produtos"
          buttonLabel="Novo produto"
          action={handleRedirectProdutoAdd}
        />
        <Stack component="section" paddingTop={2} gap={2}>
          <Box maxWidth={300}>
            <CustomSearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholder="Buscar por nome, categoria, marca e fornecedor"
            />
          </Box>
          {isLoading && <CustomLoader />}
          {!isLoading && (
            <CustomDataGrid
              rows={produtos || []}
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
      {openRegistroProdutoEstoqueModal && (
        <RegistroProdutoEstoqueModal
          open={openRegistroProdutoEstoqueModal}
          handleClose={handleCloseRegistroEstoqueProdutoModal}
          produtoId={produtoId}
        />
      )}
    </MainLayout>
  );
}

function NomeRow({ nome, produtoId }) {
  return (
    <CustomLink
      href={`/produtos/${produtoId}`}
      ariaLabel="Ir para a página do produto"
    >
      <Typography variant="body2" title={nome} color="primary">
        {nome}
      </Typography>
    </CustomLink>
  );
}

function CategoriaRow({ categoriaId }) {
  const queryOptions = { enabled: !!categoriaId };
  const { data: categoria, isLoading } = useCategoriaProduto(
    categoriaId,
    queryOptions
  );

  if (isLoading || !categoria) return <CustomLoader />;

  return (
    <CustomLink
      href={`/categorias-produto/${categoriaId}`}
      ariaLabel="Ir para a página da categoria de produto"
    >
      <Typography variant="body2" title={categoria.nome} color="primary">
        {categoria.nome || "-"}
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

  if (isLoading || !fornecedor) return <CustomLoader />;

  return (
    <CustomLink
      href={`/fornecedores/${fornecedorId}`}
      ariaLabel="Ir para a página do fornecedor"
    >
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
