import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../forms/CustomTextField";
import CustomAutocomplete from "../forms/CustomAutocomplete";
import { useCategoriasProduto } from "@/hooks/categorias_produto";
import getValueLabelOptions from "@/util/options";
import { useFornecedores } from "@/hooks/fornecedor";
import { UNIDADES_PRODUTO_OPTIONS } from "@/util/produtos";
import CustomDateInput from "../forms/CustomDateInput";
import dayjs from "dayjs";

export default function ProdutoForm({ handleSubmit, initialValues }) {
  const now = dayjs();

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    categoria: Yup.string().required("Categoria é obrigatória"),
    fornecedor: Yup.string().required("Fornecedor é obrigatório"),
    unidade_medida: Yup.string().required("Unidade de medida é obrigatória"),
    preco_por_unidade: Yup.number()
      .required("Preço é obrigatório")
      .min(0, "O preço deve ser maior ou igual a 0"),
    quantidade_estoque: Yup.number()
      .required("Quantidade é obrigatório")
      .min(0, "O preço deve ser maior ou igual a 0"),
    quantidade_minima: Yup.number()
      .required("Quantidade é obrigatório")
      .min(0, "O preço deve ser maior ou igual a 0"),
    data_validade: Yup.date()
      .required("Data de validade é obrigatória")
      .min(
        now.startOf("day"),
        "A data de validade deve ser hoje ou uma data futura."
      ),
  });

  const { data: categorias, isLoading: categoriasIsLoading } =
    useCategoriasProduto();
  const { data: fornecedores, isLoading: fornecedoresIsLoading } =
    useFornecedores();

  const categoriasOptions = getValueLabelOptions(categorias);
  const fornecedoresOptions = getValueLabelOptions(fornecedores);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid  }) => (
        <Form>
          <Stack gap={2}>
            <CustomTextField name="nome" label="Nome" />
            <CustomTextField
              name="descricao"
              label="Descrição"
              multiline
              rows={3}
            />
            <CustomAutocomplete
              name="categoria"
              label="Categoria"
              options={categoriasOptions}
              loading={categoriasIsLoading}
            />
            <CustomTextField name="marca" label="Marca" />
            <CustomAutocomplete
              name="fornecedor"
              label="Fornecedor"
              options={fornecedoresOptions}
              loading={fornecedoresIsLoading}
            />
            <CustomAutocomplete
              name="unidade_medida"
              label="Unidade de medida"
              options={UNIDADES_PRODUTO_OPTIONS}
              loading={!UNIDADES_PRODUTO_OPTIONS}
            />
            <CustomTextField
              name="preco_por_unidade"
              label="Preço por unidade"
              type="number"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />
            <CustomTextField
              name="quantidade_estoque"
              label="Quantidade de estoque"
              type="number"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />
            <CustomTextField
              name="quantidade_minima"
              label="Quantidade mínima"
              type="number"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />
            <CustomDateInput
              name="data_validade"
              label="Data de validade"
              minDate={now}
            />
            <Button type="submit" variant="contained" disabled={isSubmitting || !isValid }>
              Confirmar
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
