import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../forms/CustomTextField";
import CustomFormButtons from "../forms/CustomFormButtons";

export default function CategoriaProdutoForm({
  handleSubmit,
  handleRedirect,
  initialValues,
  action,
}) {
  const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Stack gap={2}>
            <CustomTextField name="nome" label="Nome" />
            <CustomFormButtons
              cancelAction={handleRedirect}
              confirmDisabled={isSubmitting || !isValid}
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
