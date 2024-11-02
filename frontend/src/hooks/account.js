import api from "../../lib/axios";
import { useData } from "./base_hook";

export const useUsers = (options = {}) => {
  const fetchUsers = async () => {
    const response = await api.get("users/");
    return response.data;
  };

  return useData(["users"], fetchUsers, options);
};

export const useUser = (userId, options = {}) => {
  const fetchUser = async () => {
    const response = await api.get(`users/${userId}/`);
    return response.data;
  };

  return useData(["user", userId], fetchUser, options);
};
