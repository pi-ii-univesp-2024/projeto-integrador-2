import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../forms/CustomTextField";
import CustomFormButtons from "../forms/CustomFormButtons";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (values, { setErrors }) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    if (result.error) {
      setErrors({
        username: "Usuário incorreto",
        password: "Senha incorreta",
      });
    } else {
      router.push("/");
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
            <CustomFormButtons
              confirmDisabled={isSubmitting || !isValid}
              confirmTitle="Entrar"
              justifyContent="flex-end"
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
