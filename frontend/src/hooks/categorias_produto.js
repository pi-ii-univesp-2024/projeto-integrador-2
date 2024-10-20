import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import queryClient from "@/config/queryClient";
import { useData } from "./base_hook";

// Hook para buscar todas as categorias de produtos
export const useCategoriasProduto = (options = {}) => {
  const fetchCategoriasProduto = async () => {
    const response = await api.get("categorias_produtos/");
    return response.data;
  };

  return useData(["categorias_produtos"], fetchCategoriasProduto, options);
};

// Hook para buscar uma única categoria de produto
export const useCategoriaProduto = (id, options = {}) => {
  const fetchCategoriaProduto = async () => {
    const response = await api.get(`categorias_produtos/${id}/`);
    return response.data;
  };

  return useData(["categorias_produtos", id], fetchCategoriaProduto, options);
};

// Hook para criar uma nova categoria de produto
export const useCreateCategoriaProduto = () => {
  return useMutation({
    mutationFn: async (newCategoria) => {
      const response = await api.post("categorias_produtos/", newCategoria);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categorias_produtos"]);
    },
  });
};

// Hook para editar uma categoria de produto existente
export const useEditCategoriaProduto = () => {
  return useMutation({
    mutationFn: async ({ id, updatedCategoria }) => {
      const response = await api.put(
        `categorias_produtos/${id}/`,
        updatedCategoria
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categorias_produtos"]);
    },
  });
};

// Hook para excluir uma categoria de produto
export const useDeleteCategoriaProduto = () => {
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`categorias_produtos/${id}/`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["categorias_produtos"]);
    },
  });
};
