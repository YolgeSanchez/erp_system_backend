export interface IPublicUserData {
  id: string
  name: string
  email: string
  role: 'super' | 'admin' | 'inventory' | 'employee'
}

export interface IUser {
  name: string
  email: string
  password: string
  role: 'super' | 'admin' | 'inventory' | 'employee'
}
