import MainLayout from "@/components/layouts/MainLayout";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <MainLayout>
      <Box>
        <Typography variant="h1" color="primary">
          Home
        </Typography>
      </Box>
    </MainLayout>
  );
}
