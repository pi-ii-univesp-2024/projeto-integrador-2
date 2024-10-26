import { useRouter } from "next/router"; // Importe useRouter
import MainLayout from "@/components/layouts/MainLayout";
import { Box, Stack, Typography } from "@mui/material";
import { useCreateFornecedor } from "@/hooks/fornecedor";
import FornecedorForm from "@/components/fornecedor/FornecedorForm";

export default function FornecedorCriar() {
  const router = useRouter();
  const fornecedorMutation = useCreateFornecedor();

  const initialValues = {
    nome: "",
    email: "",
    telefone: "",
    cnpj: "",
    logradouro: "",
    complemento: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  };

  const handleSubmit = async (values) => {
    const cnpj = values.cnpj.replace(/\D/g, "");
    const cep = values.cep.replace(/\D/g, "");
    const telefone = values.telefone.replace(/\D/g, "");
    await fornecedorMutation.mutateAsync({ ...values, cnpj, cep, telefone });
    handleRedirect();
  };

  const handleRedirect = () => {
    router.push("/fornecedores");
  };

  return (
    <MainLayout>
      <Box>
        <Stack gap={3}>
          <Stack gap={1}>
            <Typography variant="h1">Adicionar fornecedor</Typography>
            <Typography variant="body1">
              Crie um novo fornecedor de seus produtos
            </Typography>
          </Stack>
          <Stack gap={1} maxWidth={600}>
            <FornecedorForm
              handleSubmit={handleSubmit}
              handleRedirect={handleRedirect}
              initialValues={initialValues}
            />
          </Stack>
        </Stack>
      </Box>
    </MainLayout>
  );
}
