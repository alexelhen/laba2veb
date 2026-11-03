import { h } from "../core/h.js";
import { enableDragSort } from "../features/dragSort.js";
import { createTaskItem } from "./taskItem.js";

const idOf = (node) => node.closest(".task").dataset.id;

export function createTaskList({ onToggle, onRemove, onEdit, onReorder }) {
  const counter = h("span", { class: "board__count" });
  const hint = h("p", {
    class: "board__hint",
    hidden: true,
    text: "Перетаскивание работает в режиме сортировки «Мой порядок»",
  });
  const list = h("ul", { class: "tasks" });
  const empty = h("p", { class: "board__empty", hidden: true });

  // Делегирование событий: один обработчик на весь список.
  list.addEventListener("change", (event) => {
    if (event.target.matches(".task__toggle")) onToggle(idOf(event.target));
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const actions = { edit: onEdit, remove: onRemove };
    actions[button.dataset.action]?.(idOf(button));
  });

  enableDragSort(list, onReorder);

  const element = h("section", { class: "card board", "aria-labelledby": "board-heading" },
    h("div", { class: "board__head" },
      h("h2", { class: "card__title", id: "board-heading", text: "Список задач" }),
      counter,
    ),
    hint,
    list,
    empty,
  );

  function update(todos, { sortable, emptyText }) {
    list.classList.toggle("tasks--sortable", sortable);
    list.replaceChildren(...todos.map((todo) => createTaskItem(todo, { sortable })));

    counter.textContent = todos.length;
    hint.hidden = sortable || todos.length < 2;
    empty.hidden = todos.length > 0;
    empty.textContent = emptyText;
  }

  return { element, update };
}
