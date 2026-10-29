import { h } from "../core/h.js";
import { formatDue } from "../core/date.js";
import { iconButton } from "./ui.js";

export function createTaskItem(todo) {
  const item = h("li", { class: "task", data: { id: todo.id } },
    h("label", { class: "task__check" },
      h("input", {
        class: "task__toggle",
        type: "checkbox",
        checked: todo.done,
        "aria-label": `Задача «${todo.title}» выполнена`,
      }),
      h("span", { class: "task__checkmark", "aria-hidden": "true" }),
    ),

    h("article", { class: "task__body" },
      h("h3", { class: "task__title", text: todo.title }),
      h("p", { class: "task__meta" },
        h("time", { class: "task__due", dateTime: todo.due || null, text: formatDue(todo.due) }),
      ),
    ),

    h("div", { class: "task__actions" },
      iconButton("remove", "✕", `Удалить «${todo.title}»`, "danger"),
    ),
  );

  item.classList.toggle("task--done", todo.done);

  return item;
}
