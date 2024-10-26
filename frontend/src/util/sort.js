export function handleSortModel([order]) {
  if (!order) {
    return "";
  }

  let field = order.field;
  if (order.sort === "desc") {
    field = "-" + field;
  }

  return field;
}
