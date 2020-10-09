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
