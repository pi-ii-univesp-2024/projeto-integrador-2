import { useRouter } from "next/router"; // Importe useRouter
import MainLayout from "@/components/layouts/MainLayout";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEditFornecedor, useFornecedor } from "@/hooks/fornecedor";
import FornecedorForm from "@/components/fornecedor/FornecedorForm";

export default function FornecedorEditar() {
  const router = useRouter();
  const params = useParams();

  const fornecedorId = Number(params?.fornecedor_id);

  const queryOptions = { enabled: !!fornecedorId };
  const { data: fornecedor, isLoading } = useFornecedor(
    fornecedorId,
    queryOptions
  );

  const fornecedorMutation = useEditFornecedor(fornecedorId);

  const initialValues = {
    nome: fornecedor?.nome || "",
    email: fornecedor?.email || "",
    telefone: fornecedor?.telefone || "",
    cnpj: fornecedor?.cnpj || "",
    logradouro: fornecedor?.logradouro || "",
    complemento: fornecedor?.complemento || "",
    numero: fornecedor?.numero || "",
    bairro: fornecedor?.bairro || "",
    cidade: fornecedor?.cidade || "",
    estado: fornecedor?.estado || "",
    cep: fornecedor?.cep || "",
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
      <Box p={2}>
        <Stack gap={3}>
          <Stack gap={1}>
            <Typography variant="h1">Editar fornecedor</Typography>
            <Typography variant="body1">
              Edite as informações do fornecedor parceiro
            </Typography>
          </Stack>
          <Stack gap={1} maxWidth={600}>
            {(isLoading || !fornecedor) && <CircularProgress />}
            {!isLoading && fornecedor && (
              <FornecedorForm
                handleSubmit={handleSubmit}
                handleRedirect={handleRedirect}
                initialValues={initialValues}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    </MainLayout>
  );
}
