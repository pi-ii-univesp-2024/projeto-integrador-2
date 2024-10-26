import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useCategoriasProduto } from "@/hooks/categorias_produto";
import { DateFromISO } from "@/util/date";
import { AddOutlined, ModeEditOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/router";

export default function CategoriasProduto() {
  const { data: categoriasProduto, isLoading } = useCategoriasProduto();
  const router = useRouter();

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
        <CustomLink href={`/categorias-produto/${props.row.id}`}>
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
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="h1">Categorias produto</Typography>
          <Button
            startIcon={<AddOutlined />}
            color="primary"
            variant="contained"
            onClick={handleRedirectCategoriaProdutoAdd}
          >
            Nova categoria
          </Button>
        </Stack>
        <Stack paddingTop={2}>
          {isLoading && <CircularProgress />}
          {!isLoading && (
            <CustomDataGrid
              rows={categoriasProduto || []}
              columns={columns}
              loading={isLoading}
            />
          )}
        </Stack>
      </Box>
    </MainLayout>
  );
}
