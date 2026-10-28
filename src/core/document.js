import { h } from "./h.js";

// Всё содержимое <head> добавляется из JavaScript,
// в index.html остаётся только каркас и подключение скрипта.
export function setupDocument() {
  document.title = "Мои задачи";

  document.head.append(
    h("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    h("meta", { name: "description", content: "ToDo-список на чистом JavaScript" }),
    h("link", { rel: "stylesheet", href: "styles/main.css" }),
  );
}
