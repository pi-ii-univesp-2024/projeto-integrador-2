import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import queryClient from "@/config/queryClient";
import { useData } from "./base_hook";

// Hook para buscar todos os fornecedores
export const useFornecedores = (params = {}, options = {}) => {
  const fetchFornecedores = async () => {
    const response = await api.get("fornecedores/", { params });
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
  const fetchFornecedor = async () => {
    const response = await api.get(`fornecedores/${id}/`);
    return response.data;
  };

  return useData(["fornecedores", id], fetchFornecedor, options);
};

// Hook para criar um novo fornecedor
export const useCreateFornecedor = () => {
  return useMutation({
    mutationFn: async (newFornecedor) => {
      const response = await api.post("fornecedores/", newFornecedor);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};

// Hook para editar um fornecedor existente
export const useEditFornecedor = (id) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`fornecedores/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};

// Hook para excluir um fornecedor
export const useDeleteFornecedor = (id) => {
  return useMutation({
    mutationFn: async () => {
      await api.delete(`fornecedores/${id}/`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};
