import { useData } from "./base_hook";
import { useAuthenticatedRequest } from "./useAuthenticatedRequest";

export const useUsers = (options = {}) => {
  const request = useAuthenticatedRequest();

  const fetchUsers = async () => {
    const response = await request.get("users/");
    return response.data;
  };

  return useData(["users"], fetchUsers, options);
};

export const useUser = (userId, options = {}) => {
  const request = useAuthenticatedRequest();
  
  const fetchUser = async () => {
    const response = await request.get(`users/${userId}/`);
    return response.data;
  };

  return useData(["user", userId], fetchUser, options);
};
