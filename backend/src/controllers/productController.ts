import { NextFunction, Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { productInputSchema, productQuerySchema } from '../validators/productValidator';

const serializeProduct = (product: {
  id: number;
  name: string;
  price: { toNumber: () => number } | number;
  stock: number;
  createdAt: Date;
}) => ({
  id: product.id,
  name: product.name,
  price: typeof product.price === 'number' ? product.price : product.price.toNumber(),
  stock: product.stock,
  created_at: product.createdAt,
});

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = productInputSchema.parse(req.body);
    const created = await productModel.create(payload);
    res.status(201).json(serializeProduct(created));
  } catch (error) {
    next(error);
  }
}

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const query = productQuerySchema.parse(req.query);
    const { data, total } = await productModel.list(query);

    res.status(200).json({
      data: data.map(serializeProduct),
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(serializeProduct(product));
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const payload = productInputSchema.parse(req.body);
    const updated = await productModel.update(id, payload);

    res.status(200).json(serializeProduct(updated));
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    await productModel.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
