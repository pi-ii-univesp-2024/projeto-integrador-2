import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../forms/CustomTextField";
import CustomFormButtons from "../forms/CustomFormButtons";
import { useViaCEP } from "@/hooks/cep";
import { useEffect } from "react";
import { CEPMask, CNPJMask, TelefoneMask } from "@/util/masks";
import CustomAutocomplete from "../forms/CustomAutocomplete";
import { ESTADOS_OPTIONS } from "@/util/options";

export default function FornecedorForm({
  handleSubmit,
  handleRedirect,
  initialValues,
}) {
  const cepLength = 8;
  const cnpjLength = 18;
  const telefoneLength = 15;

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("E-mail inválido").nullable(),
    telefone: Yup.string().nullable(),
    cnpj: Yup.string(),
    logradouro: Yup.string(),
    complemento: Yup.string(),
    numero: Yup.string().matches(/^\d+$/, "Número inválido"),
    bairro: Yup.string(),
    cidade: Yup.string(),
    estado: Yup.string().matches(/^[A-Z]{2}$/, "Estado inválido"),
    cep: Yup.string()
      .min(cepLength + 1, "CEP deve conter 8 dígitos")
      .matches(/^\d{5}-?\d{3}$/, "CEP inválido"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, setFieldValue, values }) => {
        const { cep, cnpj, telefone } = values;
        const cepBruto = cep.replace(/\D/g, "");
        const cnpjBruto = cnpj.replace(/\D/g, "");
        const telefoneBruto = telefone.replace(/\D/g, "");

        const {
          data: cepData,
          error,
          isError,
        } = useViaCEP(cepBruto.length === cepLength ? cepBruto : "", {
          enabled: cepBruto.length === cepLength,
        });

        useEffect(() => {
          if (cepData) {
            setFieldValue(
              "logradouro",
              cepData.logradouro || initialValues.logradouro
            );
            setFieldValue(
              "complemento",
              cepData.complemento || initialValues.complemento
            );
            setFieldValue("bairro", cepData.bairro || initialValues.bairro);
            setFieldValue("cidade", cepData.cidade || initialValues.cidade);
            setFieldValue("estado", cepData.estado || initialValues.estado);
          }
        }, [cepData, setFieldValue, initialValues]);

        return (
          <Form>
            <Stack gap={2}>
              <CustomTextField name="nome" label="Nome" />
              <CustomTextField name="email" type="email" label="Email" />
              <CustomTextField
                name="telefone"
                type="telefone"
                label="Telefone"
                inputProps={{ maxLength: telefoneLength }}
                value={TelefoneMask(telefoneBruto)}
                onChange={(e) => {
                  const valorBruto = e.target.value;
                  const formattedValue = TelefoneMask(valorBruto);
                  setFieldValue("telefone", formattedValue);
                }}
              />
              <CustomTextField
                name="cnpj"
                label="CNPJ"
                inputProps={{ maxLength: cnpjLength }}
                value={CNPJMask(cnpjBruto)}
                onChange={(e) => {
                  const valorBruto = e.target.value;
                  const formattedValue = CNPJMask(valorBruto);
                  setFieldValue("cnpj", formattedValue);
                }}
              />
              <CustomTextField
                name="cep"
                label="CEP"
                inputProps={{ maxLength: cepLength + 1 }}
                value={CEPMask(cepBruto)}
                onChange={(e) => {
                  const valorBruto = e.target.value.replace(/\D/g, "");
                  setFieldValue("cep", CEPMask(valorBruto));
                }}
                onBlur={() =>
                  setFieldValue("cep", CEPMask(cepBruto.slice(0, cepLength)))
                }
              />
              <CustomTextField
                name="logradouro"
                label="Logradouro"
                disabled={Boolean(cepData?.logradouro)}
              />
              <CustomTextField
                name="complemento"
                label="Complemento"
                disabled={Boolean(cepData?.complemento)}
              />
              <CustomTextField
                name="numero"
                label="Número"
                onChange={(e) =>
                  setFieldValue("numero", e.target.value.replace(/\D/g, ""))
                }
              />
              <CustomTextField
                name="bairro"
                label="Bairro"
                disabled={Boolean(cepData?.bairro)}
              />
              <CustomTextField
                name="cidade"
                label="Cidade"
                disabled={Boolean(cepData?.cidade)}
              />
              {values.cep && (
                <CustomTextField
                  name="estado"
                  label="Estado"
                  disabled={Boolean(cepData?.estado)}
                />
              )}
              {!values.cep && (
                <CustomAutocomplete
                  name="estado"
                  label="Estado"
                  options={ESTADOS_OPTIONS || []}
                />
              )}
              <CustomFormButtons
                cancelAction={handleRedirect}
                confirmDisabled={isSubmitting || !isValid}
              />
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
