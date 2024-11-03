import { useSession } from "next-auth/react";
import axios from "axios";

const NEXT_PUBLIC_DJANGO_API_URL = "http://localhost:8000/api";

export const useAuthenticatedRequest = () => {
  const { data: session } = useSession();

  const request = axios.create({
    baseURL: NEXT_PUBLIC_DJANGO_API_URL,
    headers: {
      Authorization: `Token ${session?.accessToken || ""}`,
    },
  });

  return request;
};
