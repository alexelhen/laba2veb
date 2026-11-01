// Фильтрация по статусу, поиск по названию и сортировка по дате.

const STATUS = {
  all: () => true,
  active: (todo) => !todo.done,
  done: (todo) => todo.done,
};

// Задачи без срока всегда оказываются в конце списка.
const byDue = (direction) => (a, b) => {
  if (a.due === b.due) return 0;
  if (!a.due) return 1;
  if (!b.due) return -1;
  return a.due < b.due ? -direction : direction;
};

const SORTERS = {
  "due-asc": byDue(1),
  "due-desc": byDue(-1),
};

export function selectVisible(todos, { query, status, sort }) {
  const needle = query.trim().toLocaleLowerCase("ru");
  const matchStatus = STATUS[status] ?? STATUS.all;

  const visible = todos.filter(
    (todo) => matchStatus(todo) && todo.title.toLocaleLowerCase("ru").includes(needle),
  );

  return SORTERS[sort] ? visible.sort(SORTERS[sort]) : visible;
}
