import MainLayout from "@/components/layouts/MainLayout";
import { useCategoriaProduto } from "@/hooks/categorias_produto";
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
import { DateFromISO } from "@/util/date";

export default function CategoriaProduto() {
  const params = useParams();
  const categoriaProdutoId = Number(params?.categoria_id);

  const queryOptions = { enabled: !!categoriaProdutoId };

  const { data: categoriaProduto, isLoading } = useCategoriaProduto(
    categoriaProdutoId,
    queryOptions
  );

  return (
    <MainLayout>
      <Box>
        <Typography component="h1" variant="h1">
          Informações da categoria de produto
        </Typography>
        {isLoading && <CircularProgress />}
        {!isLoading && !!categoriaProduto && (
          <Stack gap={2} marginTop={2}>
            <Card>
              <CardContent>
                <Stack gap={2} divider={<Divider flexItem />}>
                  <InformacoesGerais categoriaProduto={categoriaProduto} />
                  <InformacoesRegistro categoriaProduto={categoriaProduto} />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Box>
    </MainLayout>
  );
}

function InformacoesGerais({ categoriaProduto }) {
  if (!categoriaProduto) return;

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações gerais</Typography>
      <Stack gap={1}>
        <TitleValueComponent title="Nome" value={categoriaProduto.nome} />
      </Stack>
    </Stack>
  );
}

function InformacoesRegistro({ categoriaProduto }) {
  if (!categoriaProduto) return;

  const dataRegistro = DateFromISO(categoriaProduto.created_at);
  const dataUltimaAtualizacao = DateFromISO(categoriaProduto.updated_at);

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
