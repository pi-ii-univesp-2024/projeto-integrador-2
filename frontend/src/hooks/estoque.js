import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import { useData } from "./base_hook";
import queryClient from "@/config/queryClient";

// Hook para buscar todos os estoques
export const useEstoques = (options = {}) => {
  const fetchEstoque = async () => {
    const response = await api.get("estoques/");
    return response.data;
  };

  return useData(["estoques"], fetchEstoque, options);
};

export const useCreateEstoque = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("estoques/", data);
      return response.data;
    },
    onError: (error) => {
      throw error.response.data;
    },
    onSuccess: (data) => {
      const produtoId = data.produto;
      queryClient.invalidateQueries(["produtos", produtoId]);
      queryClient.invalidateQueries(["estoques"]);
    },
  });
};
