// import { name, internet } from 'faker'
import * as faker from 'faker/locale/uk'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Документация по генерации данных
// https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#hacker

async function main() {
  // const prisma = new PrismaClient()
  const user = await prisma.user.create({
    data: {
      password: faker.internet.password(),
      email: faker.internet.email(),
      name: faker.internet.userName(),
    },
  })
  console.log('added user:\n', user.name)
  // await prisma.$disconnect()
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('disconect...')
  })
