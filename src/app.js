import { h } from "./core/h.js";
import { setupDocument } from "./core/document.js";
import * as store from "./store.js";
import { selectVisible } from "./view.js";
import { createHeader } from "./components/header.js";
import { createTaskForm } from "./components/taskForm.js";
import { createToolbar } from "./components/toolbar.js";
import { createTaskList } from "./components/taskList.js";

setupDocument();

// Состояние интерфейса (не сохраняется): поиск, фильтр, сортировка.
const view = { query: "", status: "all", sort: "manual" };

const header = createHeader();

const taskList = createTaskList({
  onToggle: store.toggleTodo,
  onRemove: store.removeTodo,
});

const toolbar = createToolbar({
  state: view,
  onChange(changes) {
    Object.assign(view, changes);
    render();
  },
});

document.body.append(
  h("div", { class: "app" },
    header.element,
    h("main", { class: "layout" },
      h("aside", { class: "layout__aside" },
        createTaskForm({ onCreate: store.addTodo }),
        toolbar,
      ),
      taskList.element,
    ),
    h("footer", { class: "footer" },
      h("p", { text: "Лабораторная работа № 2 · задачи сохраняются в localStorage" }),
    ),
  ),
);

function render() {
  const todos = store.getTodos();

  header.update(todos);
  taskList.update(selectVisible(todos, view), {
    emptyText: todos.length
      ? "Ничего не найдено — измените поиск или фильтр"
      : "Список пуст. Добавьте первую задачу!",
  });
}

store.subscribe(render);
render();
