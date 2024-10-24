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

export const query = async (text: string, params?: any) => {
  // start a timer
  const start = Date.now()

  // initialize a client for the query
  const client = await pool.connect()
  const res = await client.query(text, params)

  // finish the timer and log the query info
  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })

  // return the client to the pool after using it
  client.release()

  // return the query result
  return res.rows
}

export default pool
