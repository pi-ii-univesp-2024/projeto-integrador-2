import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import { useAuth } from "@/contexts/AuthContext";
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

// Hook para registrar um novo usuário
export const useRegister = () => {
  return useMutation({
    mutationFn: async (newUser) => {
      const response = await api.post("auth/register/", newUser);
      return response.data; // Retorna o token ou os dados do usuário
    },
    onSuccess: (data) => {
      // Aqui você pode armazenar o token no localStorage ou no state, se necessário
      // localStorage.setItem('token', data.token);
    },
  });
};

export const useLogin = () => {
  const { login } = useAuth(); // Obtém a função de login do contexto

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("auth/login/", credentials);
      return response.data; // Retorna o token
    },
    onSuccess: (data) => {
      login(data); // Chama a função de login do contexto
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth(); // Obtém a função de logout do contexto

  return useMutation({
    mutationFn: async () => {
      await api.post("auth/logout/"); // Chama o endpoint de logout
    },
    onSuccess: () => {
      logout(); // Chama a função de logout do contexto
    },
  });
};
