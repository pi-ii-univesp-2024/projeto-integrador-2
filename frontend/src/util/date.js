import dayjs from "dayjs";

export function ISOToDayjs(ISODate) {
  const dayjsDate = dayjs(ISODate);
  return dayjsDate;
}

export function DateFromISO(ISODate) {
  const hrDate = dayjs(ISODate).format("DD/MM/YYYY");
  return hrDate;
}
