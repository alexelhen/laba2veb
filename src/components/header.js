import { h } from "../core/h.js";
import { formatToday } from "../core/date.js";

export function createHeader() {
  const counter = h("p", { class: "hero__counter" });
  const bar = h("span", { class: "progress__bar" });
  const progress = h("div", {
    class: "progress",
    role: "progressbar",
    "aria-label": "Прогресс выполнения",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
  }, bar);

  const element = h("header", { class: "hero" },
    h("div", { class: "hero__text" },
      h("p", { class: "hero__date", text: formatToday() }),
      h("h1", { class: "hero__title", text: "Мои задачи" }),
    ),
    h("div", { class: "hero__stats" }, counter, progress),
  );

  function update(todos) {
    const done = todos.filter((todo) => todo.done).length;
    const percent = todos.length ? Math.round((done / todos.length) * 100) : 0;

    counter.textContent = `Выполнено ${done} из ${todos.length}`;
    bar.style.width = `${percent}%`;
    progress.setAttribute("aria-valuenow", percent);
  }

  return { element, update };
}
