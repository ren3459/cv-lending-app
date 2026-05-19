# CV Landing App

Frontend лендинга на React, TypeScript и Vite. Приложение показывает опыт, стек, кейсы и форму обратной связи.

## Как запустить

```bash
npm install
npm run dev
```

Frontend будет доступен по адресу, который выведет Vite.

Production-сборка:

```bash
npm run build
npm run preview
```

## Переменные окружения

Создайте `.env` по примеру `.env.example`.

```bash
VITE_API_BASE_URL=http://127.0.0.1:4000
```

## Стек

### Frontend

- React
- TypeScript
- Vite
- CSS / SCSS
- Fetch API
- адаптивная верстка

### Backend

- Node.js
- Express
- TypeScript
- Nodemailer
- express-rate-limit
- CORS
- dotenv
- OpenRouter API

## Форма

Поля:

- имя
- телефон
- email
- комментарий

Схема работы:

```txt
Frontend → API → SMTP → Email owner + Email copy
```

Реализованы:

- loading;
- success;
- error;
- disabled state во время отправки.

AI-summary не ломает основной сценарий, если AI недоступен.

## AI-интеграция

Используется OpenRouter API для генерации AI-summary.

## Какие AI-инструменты использовались

- ChatGPT
- OpenRouter

## Что делалось с помощью ИИ

- обсуждение архитектуры;
- получение стартовых вариантов реализации;
- анализ ошибок и альтернативных решений.

## Что пришлось исправлять вручную

- структура frontend-проекта;
- интеграция клиента с API;
- логика формы и пользовательские сценарии;
- обработка ошибок;
- интеграция frontend и backend на Vercel;
- настройка production-конфигурации;
- тестирование и отладка после деплоя.
