import { h } from "./core/h.js";
import { setupDocument } from "./core/document.js";

setupDocument();

document.body.append(
  h("div", { class: "app" },
    h("main", { class: "layout" }),
    h("footer", { class: "footer" },
      h("p", { text: "Лабораторная работа № 2 · задачи сохраняются в localStorage" }),
    ),
  ),
);
