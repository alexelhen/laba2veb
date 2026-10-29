import { h } from "../core/h.js";
import { field, fieldError } from "./ui.js";

export function createTaskForm({ onCreate }) {
  const title = h("input", {
    class: "input",
    id: "new-title",
    type: "text",
    placeholder: "Например, сдать лабораторную",
    maxLength: 120,
    autocomplete: "off",
  });
  const due = h("input", { class: "input", id: "new-due", type: "date" });
  const error = fieldError(title, "Введите название задачи");

  const form = h("form", { class: "form", noValidate: true, onsubmit: handleSubmit },
    field("new-title", "Название", title),
    error.node,
    field("new-due", "Срок выполнения", due),
    h("button", { class: "btn btn--accent btn--wide", type: "submit", text: "Добавить задачу" }),
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.value) {
      error.toggle(true);
      title.focus();
      return;
    }

    onCreate({ title: title.value, due: due.value });
    form.reset();
    title.focus();
  }

  return h("section", { class: "card", "aria-labelledby": "form-heading" },
    h("h2", { class: "card__title", id: "form-heading", text: "Новая задача" }),
    form,
  );
}
