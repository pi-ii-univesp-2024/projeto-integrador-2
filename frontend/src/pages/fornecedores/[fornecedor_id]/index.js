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
import { CEPMask, CNPJMask } from "@/util/masks";

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
      <Box p={2}>
        <Typography component="h1" variant="h1">
          Informações do fornecedor
        </Typography>
        <Stack gap={2} marginTop={2}>
          {isLoading && <CircularProgress />}
          {!isLoading && !!fornecedor && (
            <Card>
              <CardContent>
                <Stack gap={2} divider={<Divider flexItem />}>
                  <InformacoesGerais fornecedor={fornecedor} />
                  <InformacoesContato fornecedor={fornecedor} />
                  <InformacoesEndereco fornecedor={fornecedor} />
                  <InformacoesRegistro fornecedor={fornecedor} />
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    </MainLayout>
  );
}

function InformacoesGerais({ fornecedor }) {
  if (!fornecedor) return;

  const cnpjFormatado = CNPJMask(fornecedor.cnpj);
  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações gerais</Typography>
      <Stack gap={1}>
        <TitleValueComponent title="Nome" value={fornecedor.nome} />
        <TitleValueComponent title="CNPJ" value={cnpjFormatado || "-"} />
      </Stack>
    </Stack>
  );
}

function InformacoesContato({ fornecedor }) {
  if (!fornecedor) return;

  const telefoneFormatado = formatPhoneNumber(fornecedor.telefone) || "-";

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações de contato</Typography>
      <Stack gap={1}>
        <TitleValueComponent title="E-mail" value={fornecedor.email || "-"} />
        <TitleValueComponent title="Telefone" value={telefoneFormatado} />
      </Stack>
    </Stack>
  );
}

function InformacoesEndereco({ fornecedor }) {
  if (!fornecedor) return;

  const cepFormatado = CEPMask(fornecedor.cep);
  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações de endereço</Typography>
      <Stack gap={1}>
        <TitleValueComponent
          title="Logradouro"
          value={fornecedor.logradouro || "-"}
        />
        <TitleValueComponent title="Bairro" value={fornecedor.bairro || "-"} />
        <TitleValueComponent title="Nº" value={fornecedor.numero || "-"} />
        <TitleValueComponent
          title="Complemento"
          value={fornecedor.complemento || "-"}
        />
        <TitleValueComponent title="Cidade" value={fornecedor.cidade || "-"} />
        <TitleValueComponent title="Estado" value={fornecedor.estado || "-"} />
        <TitleValueComponent title="CEP" value={cepFormatado || "-"} />
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
