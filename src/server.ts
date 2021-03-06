import fastify from 'fastify';

import { ApolloServer } from 'apollo-server-fastify';
import { schema } from './nexusSchema';
import { createContext } from './context';
import { config } from './config';
import { default as favicon } from 'fastify-favicon';
import { default as healthcheck } from 'fastify-healthcheck';
import { default as metricsPlugin } from 'fastify-metrics';
import { default as LP } from 'fastify-language-parser';

// const Reply = require('fastify/lib/reply')
// const Request = require('fastify/lib/request')

const app = fastify({
  logger: {
    level: config.logLevel,
    prettyPrint: config.env === 'production' ? false : true,
  },
});

const server = new ApolloServer({
  schema,
  tracing: true,
  context: createContext,
  // context: (...args) => {
  //   console.log(`There are ${args.length} args being passed into context`)

  //   args.forEach((arg, index) => {
  //     const argName = `Arg #${index + 1}`

  //     if (arg instanceof Reply) {
  //       console.log(`${argName} is a Fastify Reply`)
  //     }
  //     if (arg instanceof Request) {
  //       console.log(`${argName} is a Fastify Request`)
  //     } else {
  //       console.log(`${argName}: ${arg}`)
  //     }
  //   })
  //   return {}
  // },

  // context: async (ctx: any, reply: FastifyReply) => {
  //   const request: ContextApolo = ctx.request
  //   request.log.warn(`--------> request <--------`)
  //   console.log(request.headers)
  //   // console.log(request.metrics)
  //   // console.log(request.detectedLng)
  //   // console.log(request.context)
  //   // return {
  //   //   request,
  //   //   reply, // res: reply,
  //   //   app: fastify,
  //   // };
  //   // reply.log.warn(`--------> reply <--------`)
  //   // reply.log.warn(reply)
  // },
});

void app.register(LP, { order: ['header', 'query'] });
// app.register(LP, { order: ['cookie', 'header', 'path', 'query'] })

void app.register(favicon, { path: '/public' });

if (config.isMetrics) {
  app.log.info('Enabled Prometheus metrics exporter...');
  void app.register(metricsPlugin, { endpoint: '/metrics' });
}

void app.register(healthcheck, { exposeUptime: config.showUptime });

// app.get('/ping', async (request, reply) => {
app.get('/ping', async (request) => {
  app.log.info(`ping from IP: ${request.id}`);
  // request.log.info(`ping from IP: ${request.ip}`)
  // @ts-expect-error
  app.log.trace(`lang: ${request.detectedLng[0]?.code}`);
  // request.log.debug(request)
  return 'pong\n';
});

const start = async () => {
  try {
    void app.register(server.createHandler());

    await app.listen({ port: config.port, host: '0.0.0.0' });
    // console.log(`LOG_LEVEL: ${config.logLevel}`)
    // app.log.info(`Server listening at ${app.server.address()}`)
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
  //   app.listen({ port: config.port, host: '0.0.0.0' }, (err, address) => {
  //   if (err) {
  //     console.error(err)
  //     process.exit(1)
  //   }
  //   console.log(`Server listening at ${address}`)
  // })
};
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`)
// })

if (require.main === module) {
  void start();
}
