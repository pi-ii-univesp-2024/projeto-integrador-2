import { useMutation } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import { useData } from "./base_hook";
import { useAuthenticatedRequest } from "./useAuthenticatedRequest";

// Hook para buscar todas as categorias de produtos
export const useCategoriasProduto = (params = {}, options = {}) => {
  const request = useAuthenticatedRequest();
  
  const fetchCategoriasProduto = async () => {
    const response = await request.get("categorias_produtos/", { params });
    return response.data;
  };

  const query = useData(
    ["categorias_produtos", params],
    fetchCategoriasProduto,
    options
  );

  return {
    ...query,
    data: query.data?.results || [],
    count: query.data?.count || 0,
  };
};

// Hook para buscar uma única categoria de produto
export const useCategoriaProduto = (id, options = {}) => {
  const request = useAuthenticatedRequest();

  const fetchCategoriaProduto = async () => {
    const response = await request.get(`categorias_produtos/${id}/`);
    return response.data;
  };

  return useData(["categorias_produtos", id], fetchCategoriaProduto, options);
};

// Hook para criar uma nova categoria de produto
export const useCreateCategoriaProduto = () => {
  const request = useAuthenticatedRequest();

  return useMutation({
    mutationFn: async (newCategoria) => {
      const response = await request.post("categorias_produtos/", newCategoria);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categorias_produtos"]);
    },
  });
};

// Hook para editar uma categoria de produto existente
export const useEditCategoriaProduto = (id) => {
  const request = useAuthenticatedRequest();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await request.put(`categorias_produtos/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categorias_produtos"]);
    },
  });
};

// Hook para excluir uma categoria de produto
export const useDeleteCategoriaProduto = (id) => {
  const request = useAuthenticatedRequest();

  return useMutation({
    mutationFn: async () => {
      await request.delete(`categorias_produtos/${id}/`);
      return id; // Retorna o id após a exclusão
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries(["categorias_produtos"]);
    },
  });
};
