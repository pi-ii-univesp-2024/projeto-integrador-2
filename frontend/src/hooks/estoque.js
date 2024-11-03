import { useMutation } from "@tanstack/react-query";
import { useData } from "./base_hook";
import queryClient from "@/config/queryClient";
import { useAuthenticatedRequest } from "./useAuthenticatedRequest";

// Hook para buscar todos os estoques
export const useEstoques = (params = {}, options = {}) => {
  const request = useAuthenticatedRequest();

  const fetchEstoque = async () => {
    const response = await request.get("estoques/", { params });
    return response.data;
  };

  const query = useData(["estoques", params], fetchEstoque, options);

  return {
    ...query,
    data: query.data?.results || [],
    count: query.data?.count || 0,
  };
};

export const useCreateEstoque = () => {
  const request = useAuthenticatedRequest();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await request.post("estoques/", data);
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
