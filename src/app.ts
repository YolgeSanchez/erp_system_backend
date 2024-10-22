import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './modules/auth/auth.routes'
import userRoutes from './modules/users/users.routes'
import inventoryRoutes from './modules/inventory/inventory.routes'

const app = express()

// [middlewares]
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// [routes]
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/inventory', inventoryRoutes)

// export the express app
export default app
