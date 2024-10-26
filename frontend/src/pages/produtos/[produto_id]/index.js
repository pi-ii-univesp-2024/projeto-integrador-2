import MainLayout from "@/components/layouts/MainLayout";
import { useCategoriaProduto } from "@/hooks/categorias_produto";
import { useFornecedor } from "@/hooks/fornecedor";
import { useProduto } from "@/hooks/produtos";
import { DateFromISO } from "@/util/date";
import { formatPrecoReal } from "@/util/numbers";
import { UNIDADES_PRODUTO_OPTIONS } from "@/util/produtos";
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

export default function Produto() {
  const params = useParams();
  const produtoId = Number(params?.produto_id);

  const queryOptions = { enabled: !!produtoId };

  const { data: produto, isLoading } = useProduto(produtoId, queryOptions);

  return (
    <MainLayout>
      <Box p={3}>
        <Typography component="h1" variant="h1">
          Informações do produto
        </Typography>
        <Stack gap={2} marginTop={2}>
          {isLoading && <CircularProgress />}
          {!isLoading && !!produto && (
            <Card>
              <CardContent>
                <Stack gap={2} divider={<Divider flexItem />}>
                  <InformacoesGerais produto={produto} />
                  <InformacoesPrecoEstoque produto={produto} />
                  <InformacoesVencimentoRegistro produto={produto} />
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    </MainLayout>
  );
}

function InformacoesGerais({ produto }) {
  if (!produto) return;

  const fornecedorId = produto.fornecedor;
  const queryOptionsFornecedor = { enabled: !!fornecedorId };
  const { data: fornecedor, isLoading: fornecedorIsLoading } = useFornecedor(
    fornecedorId,
    queryOptionsFornecedor
  );

  const categoriaId = produto.categoria;
  const queryOptionsCategoria = { enabled: !!categoriaId };
  const { data: categoria, isLoading: categoriaIsLoading } =
    useCategoriaProduto(categoriaId, queryOptionsCategoria);

  const isLoading = fornecedorIsLoading || categoriaIsLoading;

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações gerais</Typography>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Stack gap={1}>
          <TitleValueComponent title="Nome" value={produto.nome} />
          <TitleValueComponent title="Marca" value={produto.marca} />
          <TitleValueComponent
            title="Fornecedor"
            value={fornecedor?.nome}
            link={`/fornecedores/${fornecedorId}`}
          />
          <TitleValueComponent
            title="Categoria"
            value={categoria?.nome}
            link={`/categorias-produto/${categoriaId}`}
          />
          <TitleValueComponent
            title="Descrição"
            value={produto.descricao || "-"}
          />
        </Stack>
      )}
    </Stack>
  );
}

function InformacoesPrecoEstoque({ produto }) {
  if (!produto) return;

  const quantidadeMinima = produto.quantidade_minima;
  const quantidadeMinimaComVirgula = quantidadeMinima?.replace(".", ",");

  const quantidadeEstoque = produto.quantidade_estoque;
  const quantidadeEstoqueComVirgula = quantidadeEstoque?.replace(".", ",");

  const precoEmReal = formatPrecoReal(produto.preco_por_unidade);

  const unidadeMedida = produto.unidade_medida;
  const unidade = UNIDADES_PRODUTO_OPTIONS?.find(
    (item) => item.value === unidadeMedida
  )?.label;

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações de preço e estoque</Typography>
      <Stack gap={1}>
        <TitleValueComponent
          title="Quantidade mínima em estoque"
          value={quantidadeMinimaComVirgula}
        />
        <TitleValueComponent
          title="Quantidade total em estoque"
          value={quantidadeEstoqueComVirgula}
        />
        <TitleValueComponent title="Preço por unidade" value={precoEmReal} />
        <TitleValueComponent title="Unidade" value={unidade} />
      </Stack>
    </Stack>
  );
}

function InformacoesVencimentoRegistro({ produto }) {
  if (!produto) return;

  const dataVencimento = DateFromISO(produto.data_validade);
  const dataRegistro = DateFromISO(produto.created_at);
  const dataUltimaAtualizacao = DateFromISO(produto.updated_at);

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações de vencimento e registro</Typography>
      <Stack gap={1}>
        <TitleValueComponent
          title="Data de vencimento"
          value={dataVencimento}
        />
        <TitleValueComponent title="Data de registro" value={dataRegistro} />
        <TitleValueComponent
          title="Data da última atualização"
          value={dataUltimaAtualizacao}
        />
      </Stack>
    </Stack>
  );
}
