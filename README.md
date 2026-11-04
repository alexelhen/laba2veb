# web-lab2 — ToDo-список

Веб-приложение «Мои задачи» на чистом JavaScript (DOM API), без фреймворков и сборщиков.

**Демо:** https://bahadirahmedov.github.io/web-lab2/

## Возможности

- добавление задачи с названием и сроком выполнения;
- удаление задачи;
- редактирование названия и срока в модальном окне `<dialog>`;
- отметка о выполнении (зачёркивание, зелёный фон, прогресс-бар в шапке);
- метки «Просрочено», «Сегодня», «Завтра»;
- сортировка по сроку (ближайшие / дальние / мой порядок);
- фильтрация по статусу (все / в работе / готово);
- поиск по названию;
- сохранение в `localStorage` и восстановление при загрузке;
- изменение порядка перетаскиванием (мышь — Drag and Drop API, сенсорный экран — за «ручку» ⋮⋮);
- адаптивная вёрстка на grid/flex, светлая и тёмная тема.

## Структура

```
index.html                 — только каркас и подключение скрипта
styles/main.css            — стили, тёмная тема, медиазапросы
src/app.js                 — точка входа: сборка страницы и рендер
src/store.js               — состояние задач и localStorage
src/view.js                — фильтр, поиск, сортировка
src/core/h.js              — фабрика DOM-элементов h(tag, props, ...children)
src/core/document.js       — заполнение <head> (title, meta, стили)
src/core/date.js           — работа с датами
src/components/header.js   — шапка с прогрессом
src/components/taskForm.js — форма добавления
src/components/toolbar.js  — поиск, статус, сортировка
src/components/taskList.js — список задач (делегирование событий)
src/components/taskItem.js — карточка задачи
src/components/editDialog.js — окно редактирования
src/components/ui.js       — мелкие общие элементы (поле, кнопка-иконка, ошибка)
src/features/dragSort.js   — перетаскивание
```

## Запуск локально

Скрипты подключаются как ES-модули, поэтому нужен локальный сервер:

```bash
python3 -m http.server 8000
# открыть http://localhost:8000
```

## Деплой

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.
