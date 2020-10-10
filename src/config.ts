import dotenv from 'dotenv'
import yn from 'yn'

dotenv.config({ path: '.env' })

export interface Config {
  env: string
  port: number
  isMetrics: boolean
  showUptime: boolean
  debugLogging: boolean
  dbsslconn: boolean
  jwtSecret: string
  databaseUrl: string
  dbEntitiesPath: string[]
}

const isDevMode = process.env.NODE_ENV == 'development'

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  // port: +(process.env.PORT || 4000),
  port: parseInt(process.env.PORT as string, 10) || 4000,
  isMetrics: yn(process.env.IS_METRICS) || false,
  showUptime: yn(process.env.APP_UPTIME) || false,
  debugLogging: isDevMode,
  dbsslconn: !isDevMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  // postgres: postgres,
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  dbEntitiesPath: [
    ...(isDevMode ? ['src/entity/**/*.ts'] : ['dist/entity/**/*.js']),
  ],
}

export { config }
