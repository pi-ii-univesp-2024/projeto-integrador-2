import MainLayout from "@/components/layouts/MainLayout";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function Produto() {
  const params = useParams();
  const produtoId = params?.produto_id;
  return (
    <MainLayout>
      <Box>
        <Typography variant="h1">Produto {produtoId}</Typography>
      </Box>
    </MainLayout>
  );
}
