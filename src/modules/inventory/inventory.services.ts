import { IProduct, IProductData } from './inventory.interfaces'
import { AppError } from '../../types/errors'
import InventoryRepository from './inventory.repository'

class InventoryService {
  // insert new product
  insertProduct = async (product: IProduct): Promise<IProductData> => {
    // check if product already exists
    const productExists = await InventoryRepository.getProductByName(product.prd_name)
    if (productExists) throw new AppError('PRODUCT_ALREADY_EXISTS', 409)

    // insert the product
    try {
      const insertedProduct = await InventoryRepository.insertProduct(product)
      if (!insertedProduct) throw new AppError('PRODUCT_NOT_FOUND', 404)
      return insertedProduct
    } catch (error) {
      throw new AppError('PRODUCT_NOT_FOUND', 404)
    }
  }

  // get all products
  getProducts = async (): Promise<IProduct[]> => {
    try {
      const products = await InventoryRepository.getProducts()
      if (!products) throw new AppError('PRODUCTS_NOT_FOUND', 404)
      return products
    } catch (error) {
      throw new AppError('PRODUCTS_NOT_FOUND', 404)
    }
  }

  // get a product by sku
  getProductBySku = async (sku: string): Promise<IProduct> => {
    try {
      const product = await InventoryRepository.getProductBySku(sku)
      if (!product) throw new AppError('PRODUCT_NOT_FOUND', 404)
      return product
    } catch (error) {
      throw new AppError('PRODUCT_NOT_FOUND', 404)
    }
  }

  // update a product
  updateProduct = async (sku: string, updatedProduct: IProduct): Promise<IProduct> => {
    try {
      const product = await InventoryRepository.updateProduct(sku, updatedProduct)
      if (!product) throw new AppError('PRODUCT_NOT_FOUND', 404)
      return product
    } catch (error) {
      throw new AppError('PRODUCT_NOT_FOUND', 404)
    }
  }

  // delete a product by sku
  deleteProduct = async (sku: string): Promise<IProduct> => {
    try {
      const product = await InventoryRepository.deleteProduct(sku)
      if (!product) throw new AppError('PRODUCT_NOT_FOUND', 404)
      return product
    } catch (error) {
      throw new AppError('PRODUCT_NOT_FOUND', 404)
    }
  }
}

export default new InventoryService()
