import { h } from "./core/h.js";
import { setupDocument } from "./core/document.js";
import * as store from "./store.js";
import { createTaskForm } from "./components/taskForm.js";
import { createTaskList } from "./components/taskList.js";

setupDocument();

const taskList = createTaskList({
  onToggle: store.toggleTodo,
  onRemove: store.removeTodo,
});

document.body.append(
  h("div", { class: "app" },
    h("main", { class: "layout" },
      h("aside", { class: "layout__aside" },
        createTaskForm({ onCreate: store.addTodo }),
      ),
      taskList.element,
    ),
    h("footer", { class: "footer" },
      h("p", { text: "Лабораторная работа № 2 · задачи сохраняются в localStorage" }),
    ),
  ),
);

function render() {
  taskList.update(store.getTodos(), { emptyText: "Список пуст. Добавьте первую задачу!" });
}

store.subscribe(render);
render();
