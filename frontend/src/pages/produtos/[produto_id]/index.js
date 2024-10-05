import MainLayout from "@/components/layouts/MainLayout";
import BasicRow from "@/components/lists/BasicRow";
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

export default function Produto() {
  const params = useParams();
  const produtoId = Number(params?.produto_id);

  const queryOptions = { enabled: !!produtoId };

  const { data: produto, isLoading } = useProduto(produtoId, queryOptions);

  return (
    <MainLayout>
      <Box>
        <Typography component="h1" variant="h1">
          Informações do produto
        </Typography>
        {isLoading && <CircularProgress />}
        {!isLoading && !!produto && (
          <Stack gap={2} marginTop={2}>
            <Card>
              <CardContent>
                <Stack gap={2} divider={<Divider flexItem />}>
                  <InformacoesGerais produto={produto} />
                  <InformacoesPrecoEstoque produto={produto} />
                  <InformacoesVencimentoRegistro produto={produto} />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Box>
    </MainLayout>
  );
}

function InformacoesGerais({ produto }) {
  if (!produto) return;

  const fornecedorId = produto.fornecedor;
  const queryOptionsFornecedor = { enabled: !!fornecedorId };
  const { data: fornecedor } = useFornecedor(
    fornecedorId,
    queryOptionsFornecedor
  );

  const categoriaId = produto.categoria;
  const queryOptionsCategoria = { enabled: !!categoriaId };
  const { data: categoria } = useCategoriaProduto(
    categoriaId,
    queryOptionsCategoria
  );

  return (
    <Stack gap={2}>
      <Typography variant="h3">Informações gerais</Typography>
      <Stack gap={1}>
        <BasicRow title="Nome" value={produto.nome} />
        <BasicRow title="Marca" value={produto.marca} />
        <BasicRow title="Fornecedor" value={fornecedor?.nome} />
        <BasicRow title="Categoria" value={categoria?.nome} />
        <BasicRow title="Descrição" value={produto.descricao} />
      </Stack>
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
        <BasicRow
          title="Quantidade mínima em estoque"
          value={quantidadeMinimaComVirgula}
        />
        <BasicRow
          title="Quantidade total em estoque"
          value={quantidadeEstoqueComVirgula}
        />
        <BasicRow title="Preço por unidade" value={precoEmReal} />
        <BasicRow title="Unidade" value={unidade} />
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
        <BasicRow title="Data de vencimento" value={dataVencimento} />
        <BasicRow title="Data de registro" value={dataRegistro} />
        <BasicRow
          title="Data última atualização"
          value={dataUltimaAtualizacao}
        />
      </Stack>
    </Stack>
  );
}
