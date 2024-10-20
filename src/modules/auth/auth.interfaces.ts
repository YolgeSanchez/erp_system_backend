import { Roles } from '../../types/roles'

export interface IAuth {
  email: string
  password: string
}
export interface IPublicAuthData {
  id: string
  name: string
  email: string
  role: Roles
}
