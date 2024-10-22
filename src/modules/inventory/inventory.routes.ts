import { Router } from 'express'
import InventoryController from './inventory.controllers'
import { auth } from '../../middlewares/auth.middleware'
import { validate } from '../../middlewares/dataValidation'
import { inventorySchema } from './inventory.schema'

const router = Router()

/**
 *
 */

export default router
