import fastify from 'fastify'

import { ApolloServer } from 'apollo-server-fastify'
import { schema } from './nexusSchema'
import { createContext } from './context'
import { config } from './config'
import { default as favicon } from 'fastify-favicon'
import { default as healthcheck } from 'fastify-healthcheck'
import { default as metricsPlugin } from 'fastify-metrics'
import { default as LP } from 'fastify-language-parser'

const app = fastify({
  logger: {
    level: 'warn',
    prettyPrint: true,
  },
})

const server = new ApolloServer({
  schema,
  // context: ({ req }) => {
  //   console.log(req)
  //   return req
  // },
  tracing: true,
  debug: true,
  context: createContext,
})

app.register(LP, { order: ['header', 'query'] })
// app.register(LP, { order: ['cookie', 'header', 'path', 'query'] })

app.register(favicon, { path: '/public' })

if (config.isMetrics) {
  app.log.info('Enabled Prometheus metrics exporter...')
  app.register(metricsPlugin, { endpoint: '/metrics' })
}

app.register(healthcheck, { exposeUptime: config.showUptime })

app.get('/ping', async (request, reply) => {
  app.log.info(`ping from IP: ${request.ip}`)
  // request.log.info(`ping from IP: ${request.ip}`)
  // @ts-expect-error
  app.log.info(`lang: ${request.detectedLng[0].code}`)
  // request.log.debug(request)
  return 'pong\n'
})

const start = async () => {
  try {
    app.register(server.createHandler())

    await app.listen({ port: config.port, host: '0.0.0.0' })
    // app.log.info(`Server listening at ${app.server.address()}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
  //   app.listen({ port: config.port, host: '0.0.0.0' }, (err, address) => {
  //   if (err) {
  //     console.error(err)
  //     process.exit(1)
  //   }
  //   console.log(`Server listening at ${address}`)
  // })
}
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`)
// })

if (require.main === module) {
  start()
}
