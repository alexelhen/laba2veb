const toDate = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function formatDue(iso) {
  if (!iso) return "Без срока";
  return toDate(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function formatToday() {
  const text = new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" });
  return text[0].toUpperCase() + text.slice(1);
}
