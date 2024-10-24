import { IPublicUserData, IUser } from './users.interfaces'
import { query } from '../../config/postgress.config'

class UserRepository {
  // insert a new user
  insertUser = async (user: IUser): Promise<IPublicUserData> => {
    const result = await query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) returning id, name, email, role',
      [user.name, user.email, user.password, user.role]
    )
    return result[0]
  }

  // get all users
  getUsers = async (): Promise<IPublicUserData[]> => {
    const result = await query('SELECT * FROM users')
    return result
  }

  // get a user by id
  getUser = async (id: string): Promise<IPublicUserData> => {
    const result = await query('SELECT * FROM users WHERE id = $1', [id])
    return result[0]
  }

  // get a user by email
  getByEmail = async (email: string): Promise<IPublicUserData> => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email])
    return result[0]
  }

  // update a user
  updateUser = async (id: string, updatedUser: IUser): Promise<IPublicUserData> => {
    const result = await query(
      'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 returning id, name, email, role',
      [updatedUser.name, updatedUser.email, updatedUser.password, updatedUser.role, id]
    )
    return result[0]
  }

  // delete a user by id
  deleteUser = async (id: string): Promise<IPublicUserData> => {
    const result = await query('DELETE FROM users WHERE id = $1', [id])
    return result[0]
  }
}

export default new UserRepository()
