# FILM!

Онлайн-сервис бронирования билетов в кинотеатр. Frontend — React, backend — Nest.js, база данных — PostgreSQL + TypeORM.

## Установка

### PostgreSQL

Установите PostgreSQL с [официального сайта](https://www.postgresql.org/download/) или через пакетный менеджер ОС.

Создайте пользователя и базу (если ещё не созданы), затем выполните SQL-скрипты из `backend/test/`:

```bash
# от суперпользователя — создать пользователя prac и БД prac
psql -U postgres -d postgres -c "CREATE USER prac WITH PASSWORD 'prac';"
psql -U postgres -d postgres -c "CREATE DATABASE prac OWNER prac;"

# расширение и таблицы
psql -U postgres -d prac -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
tail -n +6 backend/test/prac.init.sql | psql -U postgres -d prac

# тестовые данные
psql -U prac -d prac -f backend/test/prac.films.sql
psql -U prac -d prac -f backend/test/prac.shedules.sql
```

### Backend

```bash
cd backend
npm ci
cp .env.example .env
npm run start:dev
```

В `.env` укажите:

- `DATABASE_DRIVER` — `postgres`
- `DATABASE_HOST` — хост PostgreSQL, например `localhost`
- `DATABASE_PORT` — порт PostgreSQL, например `5432`
- `DATABASE_NAME` — имя базы данных, например `prac`
- `DATABASE_USERNAME` — имя пользователя БД
- `DATABASE_PASSWORD` — пароль пользователя БД

Backend запускается на порту **3000**, API доступен по префиксу `/api/afisha`.

### Frontend

```bash
cd frontend
npm ci
cp .env.example .env
npm run dev
```

Для локальной разработки в `.env`:

```
VITE_API_URL=http://localhost:3000/api/afisha
VITE_CDN_URL=http://localhost:3000/content/afisha
```

Frontend запускается на порту **5173**.

## Docker

```bash
cp .env.example .env
docker compose up -d --build
```

Приложение доступно на порту **80**, pgAdmin — на **8080**.

Переменные окружения для compose — в [`.env.example`](.env.example).

## Деплой

Приложение доступно по адресу: https://film-rechkalov.nomorepartiessite.ru

## API

Описание API — в файле [`film.yml`](film.yml).

Основные эндпоинты:

- `GET /api/afisha/films` — список фильмов
- `GET /api/afisha/films/:id/schedule` — расписание сеансов
- `POST /api/afisha/order` — бронирование билетов
- `GET /content/afisha/*` — статический контент (постеры)

## Проверка

```bash
cd backend
npm run lint
npm test
npm run build
```

Тестовый запрос:

```bash
curl http://localhost:3000/api/afisha/films/
```
