const padDatePart = (value: number) => String(value).padStart(2, "0");

export const formatLocalDateStamp = (date: Date) => {
  const year = date.getFullYear();
  const month = padDatePart(date.getMonth() + 1);
  const day = padDatePart(date.getDate());

  return `${year}-${month}-${day}`;
};
