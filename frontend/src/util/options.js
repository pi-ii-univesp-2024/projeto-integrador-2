export default function getValueLabelOptions(
  data,
  value = "id",
  label = "nome"
) {
  if (!data) return [];
  return data.map((item) => {
    if (item && item[value] && item[label]) {
      return {
        value: item[value],
        label: item[label],
      };
    }
    return { value: null, label: "" };
  });
}
