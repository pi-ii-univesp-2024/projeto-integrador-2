import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useEstoque = () => {
  return useQuery({
    queryKey: ["estoques"],
    queryFn: async () => {
      const response = await api.get("estoques/");
      return response.data;
    },
  });
};
