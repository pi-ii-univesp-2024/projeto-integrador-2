import { useMutation } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import { useData } from "./base_hook";
import { useAuthenticatedRequest } from "./useAuthenticatedRequest";

// Hook para buscar todos os fornecedores
export const useFornecedores = (params = {}, options = {}) => {
  const request = useAuthenticatedRequest();

  const fetchFornecedores = async () => {
    const response = await request.get("fornecedores/", { params });
    return response.data;
  };

  const query = useData(["fornecedores", params], fetchFornecedores, options);

  return {
    ...query,
    data: query.data?.results || [],
    count: query.data?.count || 0,
  };
};

// Hook para buscar um único fornecedor
export const useFornecedor = (id, options = {}) => {
  const request = useAuthenticatedRequest();

  const fetchFornecedor = async () => {
    const response = await request.get(`fornecedores/${id}/`);
    return response.data;
  };

  return useData(["fornecedores", id], fetchFornecedor, options);
};

// Hook para criar um novo fornecedor
export const useCreateFornecedor = () => {
  const request = useAuthenticatedRequest();

  return useMutation({
    mutationFn: async (newFornecedor) => {
      const response = await request.post("fornecedores/", newFornecedor);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};

// Hook para editar um fornecedor existente
export const useEditFornecedor = (id) => {
  const request = useAuthenticatedRequest();

  return useMutation({
    mutationFn: async (data) => {
      const response = await request.put(`fornecedores/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};

// Hook para excluir um fornecedor
export const useDeleteFornecedor = (id) => {
  const request = useAuthenticatedRequest();
  
  return useMutation({
    mutationFn: async () => {
      await request.delete(`fornecedores/${id}/`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};
