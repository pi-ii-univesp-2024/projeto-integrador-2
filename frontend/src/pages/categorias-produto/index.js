import CustomSearchInput from "@/components/forms/CustomSearchInput";
import CustomHeaderPage from "@/components/generics/CustomHeaderPage";
import CustomLink from "@/components/generics/CustomLink";
import CustomLoader from "@/components/generics/CustomLoader";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useCategoriasProduto } from "@/hooks/categorias_produto";
import useDebounce from "@/hooks/debounce";
import { requireAuth } from "@/util/auth";
import { DateFromISO } from "@/util/date";
import { handleSortModel } from "@/util/sort";
import { ModeEditOutlineOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = requireAuth;

export default function CategoriasProduto() {
  const [offset, setOffset] = useState(0);
  const [ordering, setOrdering] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const searchDebounced = useDebounce(searchValue, 500);

  const params = { limit: 10, offset, ordering, search: searchDebounced };

  const { data: categoriasProduto, count, isLoading } = useCategoriasProduto(params);
  const router = useRouter();

  const handleSortModelChange = (order) => {
    setOrdering(handleSortModel(order));
  };

  const handleRedirectCategoriaProdutoAdd = () => {
    router.push("/categorias-produto/adicionar");
  };

  const handleRedirectCategoriaProdutoEdit = (categoriaProdutoId) => {
    router.push(`/categorias-produto/${categoriaProdutoId}/editar`);
  };

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (props) => (
        <CustomLink
          href={`/categorias-produto/${props.row.id}`}
          ariaLabel="Ir para a página da categoria do produto"
        >
          <Typography variant="body2" color="primary">
            {props.value}
          </Typography>
        </CustomLink>
      ),
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Data de criação",
      renderCell: (props) => {
        const created_at = DateFromISO(props.value);
        return <Typography variant="body2">{created_at}</Typography>;
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
          key="editar_categoria_produto"
          title="Editar categoria"
          label="Editar categoria"
          icon={<ModeEditOutlineOutlined />}
          onClick={() => {
            handleRedirectCategoriaProdutoEdit(props.row.id);
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
          title="Categorias de produto"
          buttonLabel="Nova categoria"
          action={handleRedirectCategoriaProdutoAdd}
        />
        <Stack component="section" paddingTop={2} gap={2}>
          <Box maxWidth={300}>
            <CustomSearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholder="Buscar por nome"
            />
          </Box>
          {isLoading && <CustomLoader />}
          {!isLoading && (
            <CustomDataGrid
              rows={categoriasProduto || []}
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
