import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import queryClient from "@/config/queryClient";

export const useFornecedores = () => {
  return useQuery({
    queryKey: ["fornecedores"],
    queryFn: async () => {
      const response = await api.get("fornecedores/");
      return response.data;
    },
  });
};

export const useFornecedor = (id, options = {}) => {
  return useQuery({
    queryKey: ["fornecedor", id],
    queryFn: async () => {
      const response = await api.get(`fornecedores/${id}/`);
      return response.data;
    },
    ...options,
  });
};

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

export const useEditFornecedor = () => {
  return useMutation({
    mutationFn: async ({ id, updatedFornecedor }) => {
      const response = await api.put(`fornecedores/${id}/`, updatedFornecedor);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};

export const useDeleteFornecedor = () => {
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`fornecedores/${id}/`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["fornecedores"]);
    },
  });
};
