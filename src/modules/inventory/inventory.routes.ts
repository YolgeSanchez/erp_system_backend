import { Router } from 'express'
import InventoryController from './inventory.controllers'
import { auth } from '../../middlewares/auth.middleware'
import { validate } from '../../middlewares/dataValidation'
import { inventorySchema } from './inventory.schema'

const router = Router()

/**
 * [inventory routes]
 * http://localhost:3001/api/inventory/products [GET]
 * http://localhost:3001/api/inventory/products/:sku [GET]
 * http://localhost:3001/api/inventory/products [POST]
 * http://localhost:3001/api/inventory/products/:sku [PUT]
 * http://localhost:3001/api/inventory/products/:sku [DELETE]
 */

// anyone can access the products
router.use(auth(['super', 'admin', 'manager', 'employee', 'inventory']))
router.get('/products', InventoryController.getProducts)
router.get('/products/:sku', InventoryController.getProductBySku)

// only super, admin, manager, inventory can create and delete a product
router.use(auth(['super', 'admin', 'inventory']))
router.post('/products', validate(inventorySchema), InventoryController.insertProduct)
router.delete('/products/:sku', InventoryController.deleteProduct)

// only super, admin, manager, inventory can update a product
router.use(auth(['super', 'admin', 'manager', 'inventory']))
router.put('/products/:sku', validate(inventorySchema), InventoryController.updateProduct)

// export the routes
export default router
