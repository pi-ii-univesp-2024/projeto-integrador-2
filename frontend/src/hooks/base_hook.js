import { useQuery } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import { useAuthenticatedRequest } from "@/hooks/useAuthenticatedRequest";

export const useData = (key, fetchFn, options = {}) => {
  const request = useAuthenticatedRequest();

  return useQuery({
    queryKey: key,
    queryFn: () => fetchFn(request),
    initialData: () => queryClient.getQueryData(key),
    ...options,
  });
};
