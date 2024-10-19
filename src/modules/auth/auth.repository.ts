import { IPublicUserData } from '../users/users.interfaces'
import pool from '../../config/postgress.config'

class AuthRepository {
  // get a user
  getUser = async (id: string): Promise<IPublicUserData> => {
    const client = await pool.connect()
    const result = await client.query<IPublicUserData>('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0]
  }

  // get a user by email
  getByEmail = async (email: string): Promise<IPublicUserData> => {
    const client = await pool.connect()
    const result = await client.query<IPublicUserData>('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    console.log(result.rows)
    client.release()
    return result.rows[0]
  }

  // get a user by email and return password with it
  getByEmailAuth = async (email: string) => {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email])
    console.log(result.rows)
    client.release()
    return result.rows[0]
  }
}

export default new AuthRepository()
