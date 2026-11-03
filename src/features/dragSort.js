// Изменение порядка задач перетаскиванием.
// Мышь — HTML Drag and Drop API, сенсорный экран — Pointer Events за «ручку» ⋮⋮.
// Во время перетаскивания элемент сразу переставляется в DOM,
// а после отпускания новый порядок id передаётся в onReorder.

const DRAGGING = "task--dragging";

// Первый элемент, середина которого ниже курсора: перед ним и вставляем.
function findNextItem(list, y, dragged) {
  const items = [...list.querySelectorAll(".task")].filter((item) => item !== dragged);

  return items.find((item) => {
    const box = item.getBoundingClientRect();
    return y < box.top + box.height / 2;
  });
}

export function enableDragSort(list, onReorder) {
  let dragged = null;
  let startOrder = "";

  const readOrder = () => [...list.children].map((item) => item.dataset.id);

  const start = (item) => {
    dragged = item;
    startOrder = readOrder().join();
    item.classList.add(DRAGGING);
  };

  const moveTo = (y) => {
    const next = findNextItem(list, y, dragged);
    if (next) {
      if (next !== dragged.nextElementSibling) list.insertBefore(dragged, next);
    } else if (dragged !== list.lastElementChild) {
      list.append(dragged);
    }
  };

  const finish = () => {
    if (!dragged) return;

    dragged.classList.remove(DRAGGING);
    dragged = null;

    const order = readOrder();
    if (order.join() !== startOrder) onReorder(order);
  };

  // --- Мышь ---
  list.addEventListener("dragstart", (event) => {
    const item = event.target.closest?.(".task");
    if (!item?.draggable) return;

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", item.dataset.id);
    start(item);
  });

  list.addEventListener("dragover", (event) => {
    if (!dragged) return;
    event.preventDefault();
    moveTo(event.clientY);
  });

  list.addEventListener("drop", (event) => event.preventDefault());
  list.addEventListener("dragend", finish);

  // --- Сенсорный экран ---
  list.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;

    const grip = event.target.closest(".task__grip");
    if (!grip) return;

    event.preventDefault();
    grip.setPointerCapture(event.pointerId);
    start(grip.closest(".task"));
  });

  list.addEventListener("pointermove", (event) => {
    if (dragged && event.pointerType !== "mouse") moveTo(event.clientY);
  });

  list.addEventListener("pointerup", finish);
  list.addEventListener("pointercancel", finish);
}
