import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import queryClient from "@/config/queryClient";
import { useData } from "./base_hook";

// Hook para buscar todos os produtos
export const useProdutos = (params = {}, options = {}) => {
  const fetchProdutos = async () => {
    const response = await api.get("produtos/", { params });
    return response.data;
  };

  const query = useData(["produtos", params], fetchProdutos, options);

  return {
    ...query,
    data: query.data?.results || [],
    count: query.data?.count || 0,
  };
};

// Hook para buscar um único produto
export const useProduto = (id, options = {}) => {
  const fetchProduto = async () => {
    const response = await api.get(`produtos/${id}/`);
    return response.data;
  };

  return useData(["produtos", id], fetchProduto, options);
};

// Hook para criar um novo produto
export const useCreateProduto = () => {
  return useMutation({
    mutationFn: async (newProduto) => {
      const response = await api.post("produtos/", newProduto);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });
};

// Hook para editar um produto existente
export const useEditProduto = (id) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`produtos/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });
};

// Hook para excluir um produto
export const useDeleteProduto = (id) => {
  return useMutation({
    mutationFn: async () => {
      await api.delete(`produtos/${id}/`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });
};
