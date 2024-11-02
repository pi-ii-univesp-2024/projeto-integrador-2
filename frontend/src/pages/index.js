import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import { requireAuth } from "@/util/auth";
import { Box, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export const getServerSideProps = requireAuth;

export default function Home() {

  // const { data: session } = useSession();
  // console.log(session)
  return (
    <MainLayout>
      <Box height="100vh" p={3}>
        <Stack height="100%">
          <Typography variant="h1">Home</Typography>
          <Stack mt={2} height="100%" justifyContent="space-between">
            <Stack flex={1}>
              <Typography variant="body1">
                Este projeto é um experimento Técnico-Científico apresentado na
                disciplina de Projeto Integrador II para o curso de Tecnologia
                da Informação da Universidade Virtual do Estado de São Paulo
                (UNIVESP). O objetivo deste trabalho é otimizar um problema de
                controle de estoque utilizando aplicações web, trazendo
                melhorias técnicas e de controle para a lanchonete em que a
                aplicação for implementada.
              </Typography>
            </Stack>
            <Stack
              component="footer"
              direction="row"
              justifyContent="center"
              alignItems="center"
              p={2}
              gap={0.5}
            >
              <Typography variant="body2">Desenvolvido por </Typography>
              <CustomLink
                href="https://github.com/jobemcamera"
                target="_blank"
                color="primary"
                ariaLabel="Ir para a página do desenvolvedor"
              >
                <Typography variant="body2" color="primary">
                  Jobe Camera
                </Typography>
              </CustomLink>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </MainLayout>
  );
}
