import { useProduto } from "@/hooks/produtos";
import CustomModal from "../generics/CustomModal";
import RegistroProdutoEstoqueForm from "./RegistroProdutoEstoqueForm";
import { CircularProgress, Typography } from "@mui/material";
import { useCreateEstoque } from "@/hooks/estoque";

export default function RegistroProdutoEstoqueModal({
  open,
  handleClose,
  produtoId,
}) {
  const queryOptions = { enabled: !!open && !!produtoId };
  const { data: produto, isLoading } = useProduto(produtoId, queryOptions);

  const initialValues = {
    quantidade: "",
    tipo: "",
  };

  const estoqueMutation = useCreateEstoque();

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await estoqueMutation.mutateAsync({ ...values, produto: produtoId });
      handleClose();
    } catch (error) {
      setErrors({ quantidade: error});
    }
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title="Registro de estoque"
      subtitle="Registre a movimentação de estoque do produto"
    >
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <Typography variant="body2">Produto: {produto?.nome}</Typography>
          <Typography variant="body2">
            Quantidade atual: {produto?.quantidade_estoque}
          </Typography>
          <RegistroProdutoEstoqueForm
            handleSubmit={handleSubmit}
            handleCancel={handleClose}
            initialValues={initialValues}
          />
        </>
      )}
    </CustomModal>
  );
}
