import CustomLink from "@/components/generics/CustomLink";
import MainLayout from "@/components/layouts/MainLayout";
import CustomDataGrid from "@/components/lists/CustomDataGrid";
import { useFornecedores } from "@/hooks/fornecedor";
import { DateFromISO } from "@/util/date";
import { formatPhoneNumber } from "@/util/telefone";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function Fornecedores() {
  const { data: fornecedores, isLoading } = useFornecedores();

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (props) => (
        <NomeRow nome={props.value} produtoId={props.row.id} />
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
      field: "endereco",
      headerName: "Endereço",
      renderCell: (props) => (
        <Typography variant="body2" title={props.value}>
          {props.value || "-"}
        </Typography>
      ),
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
  ];
  return (
    <MainLayout>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Box>
          <Typography variant="h1">Fornecedores</Typography>
          <Stack paddingTop={2}>
            <CustomDataGrid
              rows={fornecedores || []}
              columns={columns}
              loading={isLoading}
            />
          </Stack>
        </Box>
      )}
    </MainLayout>
  );
}

function NomeRow({ nome, produtoId }) {
  return (
    <CustomLink href={`/fornecedores/${produtoId}`}>
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
      {telefoneFormatado || '-'}
    </Typography>
  );
}
