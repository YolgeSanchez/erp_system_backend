export interface IAuth {
  email: string
  password: string
}
export interface IPublicAuthData {
  id: string
  name: string
  email: string
  role: 'super' | 'admin' | 'inventory' | 'employee'
}
