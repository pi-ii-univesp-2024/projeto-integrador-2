import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "./base_hook";
import Cookies from "js-cookie";

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

export const useRegister = () => {
  return useMutation({
    mutationFn: async (newUser) => {
      const response = await api.post("auth/register/", newUser);
      return response.data; 
    },
  });
};

export const useLogin = () => {
  const { login } = useAuth(); 

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("auth/login/", credentials);
      return response.data; 
    },
    onSuccess: (data) => {
      login(data); 
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const token = Cookies.get("token"); 
      await api.post("auth/logout/", null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    },
    onSuccess: () => {
      logout(); 
    },
  });
};
