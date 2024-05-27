import { join } from 'node:path'

const config = {
  port: process.env.PORT,
  hostname: process.env.HOSTNAME,
  database: {
    path: join(process.cwd(), process.env.DATABASE_NAME)
  },
  authentication: {
    secretKey: '865f38a9950699794e81fcd91584f8612f5a42aec5b7bbed48c1683832c519c22c836c91fe1afc0330a2ea02dea0a31a1f509dfde1a780ce82ec0eb1'
  }
}

export default config
