import { z } from 'zod'

export const inventorySchema = z.object({
  prd_name: z
    .string()
    .min(2, 'product name should be longer than or equal to 2 characters')
    .max(50),
  prd_description: z
    .string()
    .min(2, 'product description should be longer than or equal to 2 characters')
    .max(50),
  prd_category: z
    .string()
    .min(2, 'product category should be longer than or equal to 2 characters')
    .max(50),
  prd_brand: z
    .string()
    .min(2, 'product brand should be longer than or equal to 2 characters')
    .max(50),
  prd_unit_of_measurement: z
    .string()
    .min(2, 'product unit of measurement should be longer than or equal to 2 characters')
    .max(50),
  prd_purchase_price: z
    .number()
    .min(0, 'product purchase price should be a number')
    .max(1000, 'product purchase price should be less than or equal to 1000'),
  prd_selling_price: z
    .number()
    .min(0, 'product selling price should be a number')
    .max(1000, 'product selling price should be a number less than or equal to 1000'),
  prd_current_stock: z
    .number()
    .min(0, 'product current stock should be a number')
    .max(1000, 'product current stock should be less than or equal to 1000'),
  prd_expiration_date: z.coerce.date().min(new Date(), 'product expiration date should be a date'),
})
