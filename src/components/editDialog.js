import { h } from "../core/h.js";
import { field, fieldError } from "./ui.js";

// Модальное окно редактирования задачи (название и срок) на базе <dialog>.
export function createEditDialog({ onSave }) {
  let editingId = null;

  const title = h("input", { class: "input", id: "edit-title", type: "text", maxLength: 120, autocomplete: "off" });
  const due = h("input", { class: "input", id: "edit-due", type: "date" });
  const error = fieldError(title, "Название не может быть пустым");

  const element = h("dialog", { class: "dialog", "aria-labelledby": "edit-heading", onclose: () => (editingId = null) },
    h("form", { class: "form dialog__form", noValidate: true, onsubmit: handleSubmit },
      h("h2", { class: "card__title", id: "edit-heading", text: "Редактирование задачи" }),
      field("edit-title", "Название", title),
      error.node,
      field("edit-due", "Срок выполнения", due),
      h("div", { class: "dialog__actions" },
        h("button", { class: "btn btn--ghost", type: "button", text: "Отмена", onclick: () => element.close() }),
        h("button", { class: "btn btn--accent", type: "submit", text: "Сохранить" }),
      ),
    ),
  );

  // Клик по затемнённому фону закрывает окно.
  element.addEventListener("click", (event) => {
    if (event.target === element) element.close();
  });

  function handleSubmit(event) {
    event.preventDefault();

    const value = title.value.trim();
    if (!value) {
      error.toggle(true);
      title.focus();
      return;
    }

    onSave(editingId, { title: value, due: due.value });
    element.close();
  }

  function open(todo) {
    if (!todo) return;

    editingId = todo.id;
    title.value = todo.title;
    due.value = todo.due;
    error.toggle(false);

    element.showModal();
    title.select();
  }

  return { element, open };
}
