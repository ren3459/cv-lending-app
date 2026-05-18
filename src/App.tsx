import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./App.css";

const contactSchema = z.object({
  name: z.string().min(2, "Укажите имя от 2 символов"),
  phone: z
    .string()
    .min(7, "Укажите телефон")
    .regex(
      /^[+\d\s()-]+$/,
      "Телефон может содержать цифры, +, скобки и дефисы",
    ),
  email: z.email("Введите корректный email"),
  comment: z.string().min(10, "Добавьте комментарий от 10 символов"),
});

type ContactForm = z.infer<typeof contactSchema>;
type SubmitState = "idle" | "loading" | "success" | "error";

const stack = [
  "JavaScript",
  "Git",
  "TypeScript",
  "Node.js",
  "React",
  "CSS3",
  "SQL",
  "PostgreSQL",
  "shadcn/ui",
  "TanStack Query",
  "Tailwind CSS",
  "Jest",
  "Vitest",
  "Next.js",
  "Frontend",
  "SSR",
  "Английский язык",
  "React Router",
  "HTML5",
  "SPA",
  "REST API",
  "Sequelize",
  "Recharts",
  "Material UI",
  "SCSS",
  "LIT",
];

const cases = [
  {
    title: "Iot7m",
    tag: "Frontend-разработчик · Июль 2024 — настоящее время",
    text: "Разработка клиентской части системы автоматизации на базе Home Assistant от прототипа до production-релизов: единый интерфейс управления сценариями автоматизации, телеметрией устройств и аналитическими данными.",
    role: "Стек: React, TypeScript, Lit, Recharts, shadcn/ui, Grafana, Ansible, REST API. Создавал кастомные UI-компоненты для Home Assistant, интеграции с REST API, интерфейсы KPI и MVP аналитической платформы Tech Radar.",
  },
  {
    title: "Кухня на районе",
    tag: "Fullstack-разработчик · Январь 2022 — Июнь 2024",
    text: "Разработка внутренней операционной платформы для автоматизации процессов подразделений: административные панели, операционные данные, заявки сотрудников, отчетность, аналитические дашборды и ролевая модель доступа.",
    role: "Стек: React, Next.js, TypeScript, NestJS, PostgreSQL, Sequelize, Material UI, ExcelJS, REST API. Внедрил платформу управления данными, Excel-отчетность, backend-слой бизнес-логики, роли доступа и дашборды KPI.",
  },
];

// const aiPrompts = [
//   "React лендинг с формой обратной связи и отправкой писем",
//   "Dashboard для менеджеров с фильтрами, карточками и REST API",
//   "AI помощник для подготовки коротких резюме по проектам",
// ];

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
const apiUrl = (path: string) => `${apiBaseUrl}${path}`;

function App() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverMessage, setServerMessage] = useState("");
  // const [aiInput, setAiInput] = useState(aiPrompts[0]);
  // const [aiSummary, setAiSummary] = useState("");
  // const [aiLoading, setAiLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      comment: "",
    },
  });

  const focusAreas = useMemo(
    () => [
      "React и TypeScript интерфейсы",
      "Внутренние платформы и административные панели",
      "REST API, формы и операционные данные",
    ],
    [],
  );

  const onSubmit = async (data: ContactForm) => {
    setSubmitState("loading");
    setServerMessage("");

    try {
      console.log(apiBaseUrl);

      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Не удалось отправить форму");
      }

      setSubmitState("success");
      setServerMessage(
        result.message || "Заявка отправлена. Копия письма ушла на ваш email.",
      );
      reset();
    } catch (error) {
      setSubmitState("error");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Что-то пошло не так. Попробуйте отправить форму позже.",
      );
    }
  };

  // const generateSummary = async () => {
  //   setAiLoading(true);
  //   setAiSummary("");

  //   try {
  //     const response = await fetch(apiUrl("/api/ai-summary"), {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt: aiInput }),
  //     });
  //     const result = (await response.json()) as {
  //       summary?: string;
  //       message?: string;
  //     };

  //     if (!response.ok) {
  //       throw new Error(result.message || "AI helper временно недоступен");
  //     }

  //     setAiSummary(result.summary || "");
  //   } catch (error) {
  //     setAiSummary(
  //       error instanceof Error
  //         ? error.message
  //         : "Не удалось получить AI-резюме. Основная форма при этом работает отдельно.",
  //     );
  //   } finally {
  //     setAiLoading(false);
  //   }
  // };

  return (
    <main className="page-shell">
      <header className="topbar" aria-label="Основная навигация">
        <a className="brand" href="#hero" aria-label="На главную">
          SZ
        </a>
        <nav>
          <a href="#about">Обо мне</a>
          <a href="#process">Подход</a>
          <a href="#cases">Кейсы</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <section className="hero-section" id="hero">
        <div className="hero-copy">
          <p className="eyebrow">Frontend developer</p>
          <h1>Сергей Жаринов</h1>
          <p className="hero-text">
            Frontend-разработчик с опытом в системах автоматизации, внутренних
            операционных платформах и аналитических дашбордах. Работаю с React,
            TypeScript, Next.js, Lit, REST API и визуализацией данных.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#contact">
              Обсудить проект
            </a>
            <a className="secondary-link" href="#cases">
              Смотреть кейсы
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Краткая сводка">
          <div>
            <span>Стек</span>
            <strong>React + TS</strong>
          </div>
          <div>
            <span>Фокус</span>
            <strong>Платформы, API, данные</strong>
          </div>
          <div>
            <span>Опыт</span>
            <strong>4+ года</strong>
          </div>
        </div>
      </section>

      <section className="section two-columns" id="about">
        <div>
          <p className="eyebrow">Обо мне</p>
          <h2>
            Делаю frontend, который можно проверить руками и поддерживать
            дальше.
          </h2>
        </div>
        <div className="content-block">
          <p>
            С 2022 года разрабатываю интерфейсы и fullstack-модули для
            продуктовых и внутренних систем: автоматизация на базе Home
            Assistant, телеметрия устройств, операционные платформы,
            административные панели, Excel-отчетность и аналитические дашборды.
          </p>
          <div className="stack-list" aria-label="Технологический стек">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-heading">
          <p className="eyebrow">Как работаю</p>
          <h2>
            От задачи к рабочему циклу frontend &rarr; API &rarr; результат.
          </h2>
        </div>
        <div className="process-grid">
          {[
            [
              "01",
              "Разбираю сценарий",
              "Фиксирую, кто пользователь, какое действие он делает и что должно произойти после.",
            ],
            [
              "02",
              "Собираю UI",
              "Делаю адаптивную верстку, понятные формы, состояния загрузки, успеха и ошибки.",
            ],
            [
              "03",
              "Подключаю API",
              "Описываю контракт запроса, валидирую данные на клиенте и сервере, возвращаю понятные ответы.",
            ],
            [
              "04",
              "Довожу до production",
              "Оптимизирую клиентскую архитектуру, производительность и сопровождение интерфейсов после запуска.",
            ],
          ].map(([number, title, text]) => (
            <article className="process-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* <section className="section ai-section" aria-labelledby="ai-title">
        <div className="section-heading">
          <p className="eyebrow">AI-интеграция</p>
          <h2 id="ai-title">Мини helper для резюме проекта</h2>
        </div>
        <div className="ai-workspace">
          <div className="field-group">
            <label htmlFor="ai-input">Вводные</label>
            <textarea
              id="ai-input"
              value={aiInput}
              onChange={(event) => setAiInput(event.target.value)}
              rows={4}
            />
          </div>
          <div className="prompt-row">
            {aiPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt}
                onClick={() => setAiInput(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <button
            className="primary-button"
            type="button"
            onClick={generateSummary}
            disabled={aiLoading}
          >
            {aiLoading ? "Генерирую..." : "Сгенерировать резюме"}
          </button>
          {aiSummary && <p className="ai-result">{aiSummary}</p>}
        </div>
      </section> */}

      <section className="section" id="cases">
        <div className="section-heading">
          <p className="eyebrow">Кейсы</p>
          <h2>Проекты, где виден личный вклад.</h2>
        </div>
        <div className="case-grid">
          {cases.map((item) => (
            <article className="case-card" key={item.title}>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <small>{item.role}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-columns contact-section" id="contact">
        <div>
          <p className="eyebrow">Контакты</p>
          <h2>
            Напишите, если нужен frontend-разработчик в проект или команду.
          </h2>
          <ul className="contact-list">
            <li>
              <span>Email</span>
              <a href="mailto:ren3459@gmail.com">ren3459@gmail.com</a>
            </li>
            <li>
              <span>GitHub</span>
              <a
                href="https://github.com/ren3459"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/ren3459
              </a>
            </li>
            <li>
              <span>Направления</span>
              <p>{focusAreas.join(", ")}</p>
            </li>
          </ul>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="field-grid">
            <div className="field-group">
              <label htmlFor="name">Имя</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                {...register("name")}
              />
              {errors.name && (
                <span className="field-error">{errors.name.message}</span>
              )}
            </div>
            <div className="field-group">
              <label htmlFor="phone">Телефон</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="field-error">{errors.phone.message}</span>
              )}
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="field-error">{errors.email.message}</span>
            )}
          </div>
          <div className="field-group">
            <label htmlFor="comment">Комментарий</label>
            <textarea id="comment" rows={5} {...register("comment")} />
            {errors.comment && (
              <span className="field-error">{errors.comment.message}</span>
            )}
          </div>
          <button
            className="primary-button"
            type="submit"
            disabled={submitState === "loading"}
          >
            {submitState === "loading" ? "Отправляю..." : "Отправить"}
          </button>
          {serverMessage && (
            <p
              className={`form-status ${submitState === "error" ? "is-error" : "is-success"}`}
            >
              {serverMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default App;
