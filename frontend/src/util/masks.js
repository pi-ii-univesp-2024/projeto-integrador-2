export function CNPJMask(value) {
  if (!value) return "";
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function CEPMask(value) {
  if (!value) return "";
  return value.replace(/\D+/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
}

export function TelefoneMask(value) {
  if (!value) return "";

  // Remove tudo que não é dígito
  const cleaned = value.replace(/\D+/g, "");

  // Condição para aplicar as máscaras corretas
  if (cleaned.length <= 10) {
    // Para telefone fixo (até 10 dígitos)
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else {
    // Para celular (11 dígitos)
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
}
