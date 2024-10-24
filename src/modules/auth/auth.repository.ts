import { IPublicUserData } from '../users/users.interfaces'
import { query } from '../../config/postgress.config'

class AuthRepository {
  // get a user
  getUser = async (id: string): Promise<IPublicUserData> => {
    const result = await query('SELECT * FROM users WHERE id = $1', [id])
    return result[0]
  }

  // get a user by email
  getByEmail = async (email: string): Promise<IPublicUserData> => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email])
    return result[0]
  }

  // get a user by email and return password with it
  getByEmailAuth = async (email: string) => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email])
    return result[0]
  }
}

export default new AuthRepository()
