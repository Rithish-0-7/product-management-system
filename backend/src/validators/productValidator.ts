import { z } from 'zod';

export const productInputSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  stock: z.coerce.number().int('Stock must be an integer').min(0, 'Stock must be >= 0'),
});

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional().default(''),
  sortBy: z.enum(['name', 'price', 'stock', 'created_at']).default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
});
