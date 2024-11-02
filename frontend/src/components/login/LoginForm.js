import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../forms/CustomTextField";
import CustomFormButtons from "../forms/CustomFormButtons";
import { useRouter } from "next/router";
import { useLogin } from "@/hooks/account";

export default function LoginForm() {
  const router = useRouter();
  const { mutateAsync: login } = useLogin();

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await login(values);
      router.push("/");
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data;
        setErrors({
          username: backendErrors.username || "Usuário incorreto",
          password: backendErrors.password || "Senha incorreta",
        });
      } else {
        setErrors({
          username: "Erro desconhecido",
          password: "Erro desconhecido",
        });
      }
    }
  };

  const schema = Yup.object().shape({
    username: Yup.string().required("Usuário é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Stack gap={2}>
            <CustomTextField name="username" label="Usuário" />
            <CustomTextField name="password" label="Senha" type="password" />
            <CustomFormButtons confirmDisabled={isSubmitting || !isValid} confirmTitle="Entrar" justifyContent="flex-end" />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
