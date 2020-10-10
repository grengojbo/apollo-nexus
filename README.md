# Apollo Server 

Установленные плагины:

  - [Prometheus metrics exporter for Fastify](https://gitlab.com/m03geek/fastify-metrics)
      если есть системная переменная **IS_METRICS** URL **/metrics**
  - Fastify Plugin to serve responses for health checks](https://github.com/smartiniOnGitHub/fastify-healthcheck) 
      проверка по URL **/health** если есть системная переменная **APP_UPTIME** время неприрывной работы
  - [Fastify Plugin to serve default favicon](https://github.com/smartiniOnGitHub/fastify-favicon)
  - [A Fastify plugin to parse request language](https://github.com/lependu/fastify-language-parser)

## Первоначальная установка

```shell
npm install -g @paljs/cli
```

установите системную переменную что бы небыло ошибки

```shell
export DATABASE_URL="file:./dev.db"
```

Если хотите установить из шаблона

```shell
pal c
yarn add -D create-nexus-type
yarn add nexus-plugin-prisma
yarn add faker
yarn add -D @types/faker
```

```shell
yarn db:create
yarn migration:save # сохраняем изменения prisma/schema.prisma
yarn migration:up # применяем миграцию
```

После изменеия в [prisma/schema.prisma](prisma/schema.prisma) необходимо запустить

```shell
yarn generate
```

это эквивалент следующих 4 комманд

```shell
yarn generate:types # генерируем типы
yarn generate:schema # генерируем типы для GraphQL
yarn generate:prisma # генерируем клиента prisma
yarn generate:nexus # генерируем schema.graphql
```

```shell
# pal g
yarn generate
yarn dev
```

/.well-known/apollo/server-health

## DB

We added `sqlite` as db provider in `schema.prisma` you can change it to your custom db provider

after an update your `schema.prisma` run

```shell
yarn create-migration
yarn migrate-database
```

this commands will save your schema into db

now run


- build prisma client
- build crud system
- start dev server

`Good work`
