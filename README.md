# CV Landing App

Frontend лендинга на React, TypeScript и Vite. Приложение показывает опыт, стек, кейсы и форму обратной связи.

## Стек

- React 19
- TypeScript
- Vite
- CSS
- React Hook Form
- Zod

## Как запустить

```bash
npm install
npm run dev
```

Frontend будет доступен по адресу, который выведет Vite.

Для проверки production-сборки:

```bash
npm run build
npm run preview
```

## Переменные окружения

Создайте `.env` по примеру `.env.example`.

```bash
VITE_API_BASE_URL=http://127.0.0.1:4000
```

Если `VITE_API_BASE_URL` не задан, frontend будет отправлять `/api/contact` на тот же origin. В локальной разработке Vite также проксирует `/api` на `http://localhost:4000`.

## Форма обратной связи

Форма находится в `src/App.tsx`.

- Поля: имя, телефон, email, комментарий.
- Клиентская валидация сделана через `react-hook-form` и `zod`.
- При отправке выполняется `POST /api/contact`.
- UI показывает loading, success и error состояния.
- После успешной отправки форма очищается.

Серверная обработка формы находится в отдельном проекте `cv-lending-api`.

## AI-интеграция

В `src/App.tsx` оставлена закомментированная заготовка AI-блока. Серверный роут `POST /api/ai-summary` уже есть в `cv-lending-api`, но на главной странице блок пока не отображается.
