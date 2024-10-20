import api from "../../lib/axios";
import { useData } from "./base_hook"; 

// Hook para buscar todos os estoques
export const useEstoque = (options = {}) => {
  const fetchEstoque = async () => {
    const response = await api.get("estoques/");
    return response.data;
  };

  return useData(["estoques"], fetchEstoque, options);
};
