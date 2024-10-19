import pool from './config/postgress.config'
import app from './app'
import initAdminUser from './utils/adminUser.handle'

// change this to the port you want to use
const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await initAdminUser()
    console.log('>>> Connected to the database')
    app.listen(PORT, () => console.log(`>>> Running on port ${PORT}`))
  } catch (error) {
    console.log('Error connecting to the database:', error)
  }
}

startServer()
