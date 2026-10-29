import { h } from "../core/h.js";

export function field(id, label, control) {
  return h("div", { class: "field" },
    h("label", { class: "field__label", for: id, text: label }),
    control,
  );
}

export function iconButton(action, icon, label, variant = "") {
  return h("button", {
    class: `icon-btn ${variant && `icon-btn--${variant}`}`.trim(),
    type: "button",
    title: label,
    "aria-label": label,
    data: { action },
    text: icon,
  });
}

// Текст ошибки под полем; показывается/скрывается вместе с подсветкой поля.
export function fieldError(input, message) {
  const node = h("p", { class: "field__error", role: "alert", hidden: true, text: message });

  const toggle = (visible) => {
    node.hidden = !visible;
    input.classList.toggle("input--invalid", visible);
  };

  input.addEventListener("input", () => toggle(false));
  return { node, toggle };
}
