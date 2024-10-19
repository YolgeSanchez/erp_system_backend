import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware'
import UsersControllers from './users.controllers'
import { validate } from '../../middlewares/dataValidation'
import { registerSchema } from './users.schemas'

const router = Router()

/**
 * [users routes]
 * http://localhost:3001/api/users [GET]
 * http://localhost:3001/api/users/:id [GET]
 * http://localhost:3001/api/users/:id [PUT]
 * http://localhost:3001/api/users/:id [DELETE]
 * http://localhost:3001/api/users [POST]
 */
router.use(auth(['super', 'admin']))
router.get('/', UsersControllers.getUsers)
router.get('/:id', UsersControllers.getUser)
router.put('/:id', validate(registerSchema), UsersControllers.updateUser)
router.delete('/:id', UsersControllers.deleteUser)
router.post('/', validate(registerSchema), UsersControllers.createUser)

// export the routes
export default router
