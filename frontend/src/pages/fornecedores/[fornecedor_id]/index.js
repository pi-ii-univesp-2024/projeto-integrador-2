import MainLayout from "@/components/layouts/MainLayout";
import { useFornecedor } from "@/hooks/fornecedor";
import { DateFromISO } from "@/util/date";
import { formatPhoneNumber } from "@/util/telefone";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import TitleValueComponent from "@/components/generics/TitleValueComponent";

export default function Fornecedor() {
  const params = useParams();
  const fornecedorId = Number(params?.fornecedor_id);

  const queryOptions = { enabled: !!fornecedorId };

  const { data: fornecedor, isLoading } = useFornecedor(
    fornecedorId,
    queryOptions
  );

  return (
    <MainLayout>
      <Box>
        <Typography component="h1" variant="h1">
          Informações do fornecedor
        </Typography>
        {isLoading && <CircularProgress />}
        {!isLoading && !!fornecedor && (
          <Stack gap={2} marginTop={2}>
            <Card>
              <CardContent>
                <Stack gap={2} divider={<Divider flexItem />}>
                  <InformacoesGerais fornecedor={fornecedor} />
                  <InformacoesRegistro fornecedor={fornecedor} />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Box>
    </MainLayout>
  );
}

function InformacoesGerais({ fornecedor }) {
  if (!fornecedor) return;

  const telefoneFormatado = formatPhoneNumber(fornecedor.telefone) || "-";

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações gerais</Typography>
      <Stack gap={1}>
        <TitleValueComponent title="Nome" value={fornecedor.nome} />
        <TitleValueComponent title="E-mail" value={fornecedor.email || '-'} />
        <TitleValueComponent title="Telefone" value={telefoneFormatado} />
        <TitleValueComponent title="Endereço" value={fornecedor.endereco || '-'} />
      </Stack>
    </Stack>
  );
}

function InformacoesRegistro({ fornecedor }) {
  if (!fornecedor) return;

  const dataRegistro = DateFromISO(fornecedor.created_at);
  const dataUltimaAtualizacao = DateFromISO(fornecedor.updated_at);

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações de registro</Typography>
      <Stack gap={1}>
        <TitleValueComponent title="Data de registro" value={dataRegistro} />
        <TitleValueComponent
          title="Data da última atualização"
          value={dataUltimaAtualizacao}
        />
      </Stack>
    </Stack>
  );
}
