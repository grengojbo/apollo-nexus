import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'
import { FastifyRequest } from 'fastify'
import { AuthenticationError } from 'apollo-server-fastify'

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

/**
 * Аунтификация пользователя
 * @param token - JWT token
 */
const authUser = (token: string): AuthInterface => {
  let loggedIn = false
  if (token.length !== 0) {
    loggedIn = true
  }
  return {
    id: 0,
    name: '',
    loggedIn: loggedIn,
    roles: ['anonymous'],
  }
}
const prisma = new Prisma()

export interface AuthInterface {
  id: number
  name: string
  loggedIn: boolean
  roles: Array<string>
}

export interface Context {
  prisma: Prisma
  select: any
  auth?: AuthInterface
}

export function createContext(ctx?: any): Context {
  // console.log(`--------> createContext <--------`)
  let auth = authUser('')
  if (ctx) {
    const req: ContextApolo = ctx.request
    req.log.warn(`--------> request <--------`)
    // console.log(.headers)
    // console.log(.metrics)
    // console.log(.detectedLng)
    // console.log(.context)
    // console.log(ctx.request)

    // get the user token from the headers
    const token = req.headers.authorization || 'anonymous'
    auth = authUser(token)

    // optionally block the user
    // we could also check user roles/permissions here
    if (!auth.loggedIn) throw new AuthenticationError('you must be logged in')
  }
  return {
    prisma,
    select: {},
    // auth?: auth,
  }
}
