import LoginForm from "@/components/login/LoginForm";
import { requireAuth } from "@/util/auth";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export const getServerSideProps = requireAuth;

export default function Login() {
  return (
    <Box p={3}>
      <Stack gap={3} alignItems="center" justifyContent="center" width="100%">
        <Typography variant="h1">Sistema de controle de estoque</Typography>
        <Card sx={{ maxWidth: 400, width: "100%" }}>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
