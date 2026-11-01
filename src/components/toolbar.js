import { h } from "../core/h.js";
import { field } from "./ui.js";

const STATUS_OPTIONS = [
  ["all", "Все"],
  ["active", "В работе"],
  ["done", "Готово"],
];

const SORT_OPTIONS = [
  ["manual", "Мой порядок"],
  ["due-asc", "Срок: сначала ближайшие"],
  ["due-desc", "Срок: сначала дальние"],
];

export function createToolbar({ state, onChange }) {
  const search = h("input", {
    class: "input input--search",
    id: "search",
    type: "search",
    placeholder: "Название задачи…",
    autocomplete: "off",
    value: state.query,
    oninput: (event) => onChange({ query: event.target.value }),
  });

  const status = h("fieldset", { class: "segmented", onchange: (event) => onChange({ status: event.target.value }) },
    h("legend", { class: "field__label", text: "Статус" }),
    h("div", { class: "segmented__track" },
      STATUS_OPTIONS.map(([value, label]) =>
        h("label", { class: "segmented__option" },
          h("input", { class: "segmented__input", type: "radio", name: "status", value, checked: value === state.status }),
          h("span", { class: "segmented__label", text: label }),
        ),
      ),
    ),
  );

  const sort = h("select", { class: "input input--select", id: "sort", onchange: (event) => onChange({ sort: event.target.value }) },
    SORT_OPTIONS.map(([value, label]) => h("option", { value, text: label, selected: value === state.sort })),
  );

  return h("section", { class: "card", "aria-labelledby": "toolbar-heading" },
    h("h2", { class: "card__title", id: "toolbar-heading", text: "Поиск и фильтры" }),
    h("div", { class: "toolbar" },
      field("search", "Поиск", search),
      status,
      field("sort", "Сортировка", sort),
    ),
  );
}
