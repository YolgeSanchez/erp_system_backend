import { z } from 'zod'

enum Roles {
  super = 'super',
  admin = 'admin',
  manager = 'manager',
  inventory = 'inventory',
  employee = 'employee',
}

export const registerSchema = z.object({
  name: z.string().min(2, 'name should be longer than or equal to 2 characters').max(50),
  email: z.string().email({ message: 'email should be a valid email' }),
  password: z.string().min(6, 'password should be at least 6 characters long'),
  role: z.nativeEnum(Roles),
})
