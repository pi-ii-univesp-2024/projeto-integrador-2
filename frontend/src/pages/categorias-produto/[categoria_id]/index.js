import MainLayout from "@/components/layouts/MainLayout";
import { useCategoriaProduto } from "@/hooks/categorias_produto";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import TitleValueComponent from "@/components/generics/TitleValueComponent";
import { DateFromISO } from "@/util/date";
import CustomLoader from "@/components/generics/CustomLoader";
import { requireAuth } from "@/util/auth";

export const getServerSideProps = requireAuth;

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
      <Box p={3}>
        <Typography
          component="h1"
          variant="h1"
          aria-label="Informações da categoria de produto"
        >
          Informações da categoria de produto
        </Typography>
        <Stack gap={2} marginTop={2}>
          {isLoading && <CustomLoader />}
          {!isLoading && !!categoriaProduto && (
            <Card>
              <CardContent>
                <Stack gap={2} divider={<Divider flexItem />}>
                  <InformacoesGerais categoriaProduto={categoriaProduto} />
                  <InformacoesRegistro categoriaProduto={categoriaProduto} />
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    </MainLayout>
  );
}

function InformacoesGerais({ categoriaProduto }) {
  if (!categoriaProduto) return null;

  return (
    <Stack gap={2} component="section" aria-labelledby="informacoes-gerais">
      <Typography variant="h2" id="informacoes-gerais">
        Informações gerais
      </Typography>
      <Stack gap={1}>
        <TitleValueComponent title="Nome" value={categoriaProduto.nome} />
      </Stack>
    </Stack>
  );
}

function InformacoesRegistro({ categoriaProduto }) {
  if (!categoriaProduto) return null;

  const dataRegistro = DateFromISO(categoriaProduto.created_at);
  const dataUltimaAtualizacao = DateFromISO(categoriaProduto.updated_at);

  return (
    <Stack gap={2} component="section" aria-labelledby="informacoes-registro">
      <Typography variant="h2" id="informacoes-registro">
        Informações de registro
      </Typography>
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
