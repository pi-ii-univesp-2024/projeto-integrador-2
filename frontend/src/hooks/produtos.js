import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import queryClient from "@/config/queryClient";

// Hook para buscar todos os produtos
export const useProdutos = () => {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const response = await api.get("produtos/");
      return response.data;
    },
  });
};

// Hook para buscar um único produto
export const useProduto = (id, options = {}) => {
  // options vem de fora que podemos usar para só fazer o fetch após determinada condição
  // ex: const queryOptions = {enabled: !!id}
  return useQuery({
    queryKey: ["produtos", id],
    queryFn: async () => {
      const response = await api.get(`produtos/${id}/`);
      return response.data;
    },
    ...options,
  });
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
export const useEditProduto = () => {

  return useMutation({
    mutationFn: async ({ id, updatedProduto }) => {
      const response = await api.put(`produtos/${id}/`, updatedProduto);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });
};

// Hook para excluir um produto
export const useDeleteProduto = () => {

  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`produtos/${id}/`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });
};
