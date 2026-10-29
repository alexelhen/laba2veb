import { h } from "../core/h.js";
import { createTaskItem } from "./taskItem.js";

const idOf = (node) => node.closest(".task").dataset.id;

export function createTaskList({ onToggle, onRemove }) {
  const counter = h("span", { class: "board__count" });
  const list = h("ul", { class: "tasks" });
  const empty = h("p", { class: "board__empty", hidden: true });

  // Делегирование событий: один обработчик на весь список.
  list.addEventListener("change", (event) => {
    if (event.target.matches(".task__toggle")) onToggle(idOf(event.target));
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const actions = { remove: onRemove };
    actions[button.dataset.action]?.(idOf(button));
  });

  const element = h("section", { class: "card board", "aria-labelledby": "board-heading" },
    h("div", { class: "board__head" },
      h("h2", { class: "card__title", id: "board-heading", text: "Список задач" }),
      counter,
    ),
    list,
    empty,
  );

  function update(todos, { emptyText }) {
    list.replaceChildren(...todos.map((todo) => createTaskItem(todo)));

    counter.textContent = todos.length;
    empty.hidden = todos.length > 0;
    empty.textContent = emptyText;
  }

  return { element, update };
}
