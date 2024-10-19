import { IPublicUserData, IUser } from './users.interfaces'
import pool from '../../config/postgress.config'

class UserRepository {
  // insert a new user
  insertUser = async (user: IUser): Promise<IPublicUserData> => {
    const client = await pool.connect()
    const result = await client.query<IPublicUserData>(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) returning id, name, email, role',
      [user.name, user.email, user.password, user.role]
    )
    console.log(result.rows)
    client.release()
    return result.rows[0]
  }

  // get all users
  getUsers = async (): Promise<IPublicUserData[]> => {
    const client = await pool.connect()
    const result = await client.query<IPublicUserData>('SELECT * FROM users')
    console.log(result.rows)
    client.release()
    return result.rows
  }

  // get a user by id
  getUser = async (id: string): Promise<IPublicUserData> => {
    const client = await pool.connect()
    const result = await client.query<IPublicUserData>('SELECT * FROM users WHERE id = $1', [id])
    console.log(result.rows)
    client.release()
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

  // update a user
  updateUser = async (id: string, updatedUser: IUser): Promise<IPublicUserData> => {
    const client = await pool.connect()
    const result = await client.query<IPublicUserData>(
      'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 returning id, name, email, role',
      [updatedUser.name, updatedUser.email, updatedUser.password, updatedUser.role, id]
    )
    console.log(result.rows)
    client.release()
    return result.rows[0]
  }

  // delete a user by id
  deleteUser = async (id: string): Promise<IPublicUserData> => {
    const client = await pool.connect()
    const result = await client.query<IPublicUserData>('DELETE FROM users WHERE id = $1', [id])
    console.log(result.rows)
    client.release()
    return result.rows[0]
  }
}

export default new UserRepository()
