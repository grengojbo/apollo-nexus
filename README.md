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
```

```shell
yarn db:create
yarn migration:save # сохраняем изменения prisma/schema.prisma
yarn migration:up # применяем миграцию
```

```shell
yarn generate:types # генерируем типы для GraphQL
```

## DB

We added `sqlite` as db provider in `schema.prisma` you can change it to your custom db provider

after an update your `schema.prisma` run

```shell
yarn create-migration
yarn migrate-database
```

this commands will save your schema into db

now run

```shell
pal g
yarn generate
yarn dev
```

- build prisma client
- build crud system
- start dev server

`Good work`
