import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Define quanto tempo os dados são considerados frescos
      staleTime: 5 * 60 * 1000, // 5 minutos
      // Define por quanto tempo os dados ficam no cache após se tornarem obsoletos
      cacheTime: 5 * 60 * 1000, // 5 minutos
      // Refetch automático quando a janela é focada novamente
      refetchOnWindowFocus: true,
    },
  },
});

export default queryClient;
