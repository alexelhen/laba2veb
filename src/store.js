// Хранилище задач: состояние в памяти + синхронизация с localStorage.
// Каждое изменение создаёт новый массив и уведомляет подписчиков.

const STORAGE_KEY = "web-lab2/todos";
const listeners = new Set();

let todos = readStorage();

function isTodo(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.due === "string" &&
    typeof value.done === "boolean"
  );
}

function readStorage() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(data) ? data.filter(isTodo) : [];
  } catch {
    return [];
  }
}

function writeStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Не удалось сохранить задачи", error);
  }
}

function commit(next) {
  todos = next;
  writeStorage();
  listeners.forEach((listener) => listener(todos));
}

const createId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const getTodos = () => todos;

export const findTodo = (id) => todos.find((todo) => todo.id === id);

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addTodo({ title, due }) {
  const todo = { id: createId(), title, due, done: false, createdAt: Date.now() };
  commit([todo, ...todos]);
}

export function updateTodo(id, changes) {
  commit(todos.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo)));
}

export function toggleTodo(id) {
  commit(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
}

export function removeTodo(id) {
  commit(todos.filter((todo) => todo.id !== id));
}

// Получает id видимых задач в новом порядке и раскладывает их
// по тем же позициям в общем списке — скрытые фильтром задачи остаются на месте.
export function reorderTodos(orderedIds) {
  const moved = new Set(orderedIds);
  const slots = [];
  todos.forEach((todo, index) => moved.has(todo.id) && slots.push(index));

  const next = [...todos];
  orderedIds.forEach((id, i) => {
    next[slots[i]] = findTodo(id);
  });

  commit(next);
}
