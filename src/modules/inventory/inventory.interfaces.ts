export interface IProduct {
  prd_name: string
  prd_description: string
  prd_category: string
  prd_brand: string
  prd_unit_of_measurement: string
  prd_purchase_price: number
  prd_selling_price: number
  prd_current_stock: number
  prd_expiration_date: string
}

export interface IProductData extends IProduct {
  sku: string
  created_at: string
}
