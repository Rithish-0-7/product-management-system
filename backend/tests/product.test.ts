import request from 'supertest';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { app } from '../src/app';
import { productModel } from '../src/models/productModel';

jest.mock('../src/models/productModel', () => ({
  productModel: {
    create: jest.fn(),
    findById: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
}));

const mockedModel = productModel as jest.Mocked<typeof productModel>;

describe('Product API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates product', async () => {
    mockedModel.create.mockResolvedValue({
      id: 1,
      name: 'Test Product',
      price: { toNumber: () => 10.5 } as never,
      stock: 5,
      createdAt: new Date('2026-03-03T00:00:00.000Z'),
    });

    const response = await request(app).post('/api/products').send({
      name: 'Test Product',
      price: 10.5,
      stock: 5,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Product');
  });

  it('returns paginated products', async () => {
    mockedModel.list.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'A',
          price: { toNumber: () => 20 } as never,
          stock: 12,
          createdAt: new Date('2026-03-03T00:00:00.000Z'),
        },
      ],
      total: 1,
    });

    const response = await request(app).get('/api/products?page=1&limit=10');

    expect(response.status).toBe(200);
    expect(response.body.pagination.total).toBe(1);
    expect(response.body.data).toHaveLength(1);
  });

  it('validates payload on create', async () => {
    const response = await request(app).post('/api/products').send({
      name: 'A',
      price: -1,
      stock: -5,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });
});
