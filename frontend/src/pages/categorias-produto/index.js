import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useCategoriasProduto } from "@/hooks/categorias_produto";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function CategoriasProduto() {
  const { data: categoriasProduto, isLoading } = useCategoriasProduto();

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (props) => (
        <Link
          href={`categorias-produto/${props.row.id}`}
          style={{ color: "#000", textDecoration: "none" }}
        >
          <Typography variant="body2">{props.value}</Typography>
        </Link>
      ),
      flex: 1,
    },
    { field: "created_at", headerName: "Data de criação", flex: 1 },
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
