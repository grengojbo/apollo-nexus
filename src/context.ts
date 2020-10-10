import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'
import { FastifyRequest } from 'fastify'

export type ContextApolo = FastifyRequest

export class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
    await prismaDelete.onDelete(args)
  }
}

const prisma = new Prisma()

export interface Context {
  prisma: Prisma
  select: any
}

export function createContext(ctx?: any): Context {
  // console.log(`--------> createContext <--------`)
  if (ctx) {
    const request: ContextApolo = ctx.request
    request.log.warn(`--------> request <--------`)
    console.log(request.headers)
    // console.log(request.metrics)
    // console.log(request.detectedLng)
    // console.log(request.context)
    // console.log(ctx.request)
  }
  return {
    prisma,
    select: {},
  }
}
