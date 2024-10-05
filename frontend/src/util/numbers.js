export function formatPrecoReal(valor) {
  if (!valor) return;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
