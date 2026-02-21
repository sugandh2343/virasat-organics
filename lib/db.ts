import { Pool } from "pg"

declare global {
  var _pool: Pool | undefined
}

export const pool =
  global._pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 3,
  })

if (!global._pool) global._pool = pool
