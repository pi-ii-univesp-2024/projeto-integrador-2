import CustomHeaderPage from "@/components/generics/CustomHeaderPage";
import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useFornecedores } from "@/hooks/fornecedor";
import { DateFromISO } from "@/util/date";
import { CEPMask, CNPJMask } from "@/util/masks";
import { formatPhoneNumber } from "@/util/telefone";
import { ModeEditOutlineOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/router";

export default function Fornecedores() {
  const { data: fornecedores, isLoading } = useFornecedores();
  const router = useRouter();

  const handleRedirectFornecedoresAdd = () => {
    router.push("/fornecedores/adicionar");
  };

  const handleRedirectFornecedorEdit = (fornecedorId) => {
    router.push(`/fornecedores/${fornecedorId}/editar`);
  };

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (props) => (
        <NomeRow nome={props.value} fornecedorId={props.row.id} />
      ),
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "telefone",
      headerName: "Telefone",
      renderCell: (props) => <TelefoneRow telefone={props.value} />,
      flex: 1,
    },
    {
      field: "cnpj",
      headerName: "CNPJ",
      renderCell: (props) => <CNPJRow cnpj={props.value} />,
      flex: 1,
    },
    {
      field: "logradouro",
      headerName: "Logradouro",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "complemento",
      headerName: "Complemento",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "numero",
      headerName: "Nº",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 0.5,
    },
    {
      field: "bairro",
      headerName: "Bairro",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "cidade",
      headerName: "Cidade",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "estado",
      headerName: "UF",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
      flex: 0.5,
    },
    {
      field: "cep",
      headerName: "CEP",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => <CEPRow cep={props.value} />,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Data de criação",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => {
        const created_at = DateFromISO(props.value);
        return (
          <Typography variant="body2" title={created_at}>
            {created_at}
          </Typography>
        );
      },
      flex: 1,
    },
    {
      field: "updated_at",
      headerName: "Data de edição",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => {
        const updated_at = DateFromISO(props.value);
        return (
          <Typography variant="body2" title={updated_at}>
            {updated_at}
          </Typography>
        );
      },
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      getActions: (props) => [
        <GridActionsCellItem
          key="editar_fornecedor"
          title="Editar fornecedor"
          label="Editar fornecedor"
          icon={<ModeEditOutlineOutlined />}
          onClick={() => {
            handleRedirectFornecedorEdit(props.row.id);
          }}
        />,
      ],
      flex: 1,
    },
  ];
  return (
    <MainLayout>
      <Box p={3}>
        <CustomHeaderPage
          title="Fornecedores"
          buttonLabel="Novo fornecedor"
          action={handleRedirectFornecedoresAdd}
        />
        <Stack paddingTop={2}>
          {isLoading && <CircularProgress />}
          {!isLoading && (
            <CustomDataGrid
              rows={fornecedores || []}
              columns={columns}
              loading={isLoading}
            />
          )}
        </Stack>
      </Box>
    </MainLayout>
  );
}

function NomeRow({ nome, fornecedorId }) {
  return (
    <CustomLink
      href={`/fornecedores/${fornecedorId}`}
      ariaLabel="Ir para a página do fornecedor"
    >
      <Typography variant="body2" title={nome} color="primary">
        {nome}
      </Typography>
    </CustomLink>
  );
}

function TelefoneRow({ telefone }) {
  const telefoneFormatado = formatPhoneNumber(telefone);
  return (
    <Typography variant="body2" title={telefoneFormatado}>
      {telefoneFormatado || "-"}
    </Typography>
  );
}

function CNPJRow({ cnpj }) {
  const cnpjFormatado = CNPJMask(cnpj);
  return (
    <Typography variant="body2" title={cnpjFormatado}>
      {cnpjFormatado || "-"}
    </Typography>
  );
}

function CEPRow({ cep }) {
  const cepFormatado = CEPMask(cep);
  return (
    <Typography variant="body2" title={cepFormatado}>
      {cepFormatado || "-"}
    </Typography>
  );
}
