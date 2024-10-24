import { IProduct, IProductData } from './inventory.interfaces'
import pool from '../../config/postgress.config'

class InventoryRepository {
  // insert a new product
  insertProduct = async (product: IProduct): Promise<IProductData> => {
    const client = await pool.connect()
    const result = await client.query<IProductData>(
      'INSERT INTO products ( prd_name, prd_description, prd_category, prd_brand, prd_unit_of_measurement, prd_purchase_price, prd_selling_price, prd_current_stock, prd_expiration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning sku, prd_name, prd_description, prd_category, prd_brand, prd_unit_of_measurement, prd_purchase_price, prd_selling_price, prd_current_stock, prd_expiration_date, created_at',
      [
        product.prd_name,
        product.prd_description,
        product.prd_category,
        product.prd_brand,
        product.prd_unit_of_measurement,
        product.prd_purchase_price,
        product.prd_selling_price,
        product.prd_current_stock,
        product.prd_expiration_date,
      ]
    )

    client.release()
    return result.rows[0]
  }

  // get all products
  getProducts = async (): Promise<IProductData[]> => {
    const client = await pool.connect()
    const result = await client.query<IProductData>('SELECT * FROM products')

    client.release()
    return result.rows
  }

  // get a product by sku
  getProductBySku = async (sku?: string): Promise<IProductData> => {
    const client = await pool.connect()
    const result = await client.query<IProductData>('SELECT * FROM products WHERE sku = $1', [sku])

    client.release()
    return result.rows[0]
  }

  // get a product by prd_name
  getProductByName = async (prd_name: string): Promise<IProductData> => {
    const client = await pool.connect()
    const result = await client.query<IProductData>('SELECT * FROM products WHERE prd_name = $1', [
      prd_name,
    ])

    client.release()
    return result.rows[0]
  }

  // update a product
  updateProduct = async (sku: string, updatedProduct: IProduct): Promise<IProductData> => {
    const client = await pool.connect()
    const result = await client.query<IProductData>(
      'UPDATE products SET prd_name = $1, prd_description = $2, prd_category = $3, prd_brand = $4, prd_unit_of_measurement = $5, prd_purchase_price = $6, prd_selling_price = $7, prd_current_stock = $8, prd_expiration_date = $9 WHERE sku = $10 returning sku, prd_name, prd_description, prd_category, prd_brand, prd_unit_of_measurement, prd_purchase_price, prd_selling_price, prd_current_stock, prd_expiration_date, created_at',
      [
        updatedProduct.prd_name,
        updatedProduct.prd_description,
        updatedProduct.prd_category,
        updatedProduct.prd_brand,
        updatedProduct.prd_unit_of_measurement,
        updatedProduct.prd_purchase_price,
        updatedProduct.prd_selling_price,
        updatedProduct.prd_current_stock,
        updatedProduct.prd_expiration_date,
        sku,
      ]
    )

    client.release()
    return result.rows[0]
  }

  // delete a product by sku
  deleteProduct = async (sku: string): Promise<IProductData> => {
    const client = await pool.connect()
    const result = await client.query<IProductData>('DELETE FROM products WHERE sku = $1', [sku])

    client.release()
    return result.rows[0]
  }
}

export default new InventoryRepository()
