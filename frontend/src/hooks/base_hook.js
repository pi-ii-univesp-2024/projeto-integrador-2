import queryClient from "@/config/queryClient";
import { useQuery } from "@tanstack/react-query";

export const useData = (key, fetchFn, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: fetchFn,
    initialData: () => {
      // Retorna dados do cache se disponíveis
      return queryClient.getQueryData(key);
    },
    ...options,
  });
};
