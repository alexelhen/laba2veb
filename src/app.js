import { h } from "./core/h.js";
import { setupDocument } from "./core/document.js";
import * as store from "./store.js";
import { createTaskForm } from "./components/taskForm.js";

setupDocument();

document.body.append(
  h("div", { class: "app" },
    h("main", { class: "layout" },
      h("aside", { class: "layout__aside" },
        createTaskForm({ onCreate: store.addTodo }),
      ),
    ),
    h("footer", { class: "footer" },
      h("p", { text: "Лабораторная работа № 2 · задачи сохраняются в localStorage" }),
    ),
  ),
);
