import { Request, Response } from 'express'
import InventoryServices from './inventory.services'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../types/errors'
import { IProduct } from './inventory.interfaces'

class InventoryController {
  // insert new product
  insertProduct = async (req: Request<any, any, IProduct>, res: Response<IProduct>) => {
    try {
      const insertedProduct = await InventoryServices.insertProduct(req.body)
      res.status(201).send(insertedProduct)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // get all products
  getProducts = async (_: Request, res: Response<IProduct[]>) => {
    try {
      const products = await InventoryServices.getProducts()
      res.status(200).send(products)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // get product by sku
  getProductBySku = async (req: Request<{ sku: string }>, res: Response<IProduct>) => {
    try {
      const product = await InventoryServices.getProductBySku(req.params.sku)
      res.status(200).send(product)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // update product
  updateProduct = async (req: Request<{ sku: string }, any, IProduct>, res: Response<IProduct>) => {
    try {
      const updatedProduct = req.body
      const product = await InventoryServices.updateProduct(req.params.sku, updatedProduct)
      res.status(200).send(product)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // delete product
  deleteProduct = async (req: Request<{ sku: string }>, res: Response) => {
    try {
      await InventoryServices.deleteProduct(req.params.sku)
      res.sendStatus(200)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }
}

export default new InventoryController()
