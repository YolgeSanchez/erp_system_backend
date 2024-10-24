import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),

  max: 25,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
})

export default pool
