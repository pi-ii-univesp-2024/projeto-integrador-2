import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../forms/CustomTextField";
import CustomFormButtons from "../forms/CustomFormButtons";
import { ESTOQUE_TIPO_OPTIONS } from "@/util/estoque";
import CustomAutocomplete from "../forms/CustomAutocomplete";

export default function RegistroProdutoEstoqueForm({
  handleSubmit,
  handleCancel,
  initialValues,
}) {
  const validationSchema = Yup.object({
    quantidade: Yup.number()
      .required("Quantidade é obrigatória")
      .min(0, "A quantidade deve ser maior ou igual a 0"),
    tipo: Yup.string().required("Tipo é obrigatório"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, errors }) => (
        <Form>
          <Stack gap={2}>
            <CustomTextField
              name="quantidade"
              label="Quantidade de estoque"
              type="number"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              helperText={errors.quantidade}
            />
            <CustomAutocomplete
              name="tipo"
              label="Tipo movimentação"
              options={ESTOQUE_TIPO_OPTIONS}
              loading={!ESTOQUE_TIPO_OPTIONS}
            />
            <CustomFormButtons
              cancelAction={handleCancel}
              confirmDisabled={isSubmitting || !isValid}
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
