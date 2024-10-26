import { useQuery } from "@tanstack/react-query";
import { viaCepAPI } from "../../lib/axios";

export const useViaCEP = (cep, options = {}) => {
  const fetchViaCep = async () => {
    const response = await viaCepAPI.get(`${cep}/json/`);

    if (response.data.erro) {
      throw new Error("CEP inválido"); // Lança erro se o CEP for inválido
    }
    return {
      logradouro: response?.data?.logradouro,
      complemento: response?.data?.complemento,
      bairro: response?.data?.bairro,
      cidade: response?.data?.localidade,
      estado: response?.data?.uf,
      cep: response?.data?.cep,
    };
  };

  return useQuery({
    queryKey: ["viaCep", cep],
    queryFn: fetchViaCep,
    enabled: Boolean(cep),
    ...options,
  });
};
