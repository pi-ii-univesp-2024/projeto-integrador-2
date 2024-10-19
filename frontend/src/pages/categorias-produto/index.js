import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useCategoriasProduto } from "@/hooks/categorias_produto";
import { DateFromISO } from "@/util/date";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function CategoriasProduto() {
  const { data: categoriasProduto, isLoading } = useCategoriasProduto();

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (props) => (
        <CustomLink href={`/categorias-produto/${props.row.id}`}>
          <Typography variant="body2" color="primary">{props.value}</Typography>
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
  ];

  return (
    <MainLayout>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Box>
          <Typography variant="h1">Categorias produto</Typography>
          <Stack paddingTop={2}>
            <CustomDataGrid
              rows={categoriasProduto || []}
              columns={columns}
              loading={isLoading}
            />
          </Stack>
        </Box>
      )}
    </MainLayout>
  );
}
