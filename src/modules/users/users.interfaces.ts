import { Roles } from '../../types/roles'

export interface IPublicUserData {
  id: string
  name: string
  email: string
  role: Roles
}

export interface IUser {
  name: string
  email: string
  password: string
  role: Roles
}
