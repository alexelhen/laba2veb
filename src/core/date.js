const DAY_MS = 24 * 60 * 60 * 1000;

const toDate = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDue(iso) {
  if (!iso) return "Без срока";
  return toDate(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function formatToday() {
  const text = new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" });
  return text[0].toUpperCase() + text.slice(1);
}

// Возвращает метку срока для невыполненной задачи: просрочено / сегодня / завтра.
export function dueLabel(todo) {
  if (!todo.due || todo.done) return null;

  const days = Math.round((toDate(todo.due) - toDate(todayISO())) / DAY_MS);

  if (days < 0) return { kind: "overdue", text: "Просрочено" };
  if (days === 0) return { kind: "today", text: "Сегодня" };
  if (days === 1) return { kind: "soon", text: "Завтра" };
  return null;
}
