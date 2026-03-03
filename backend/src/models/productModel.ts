import { prisma } from '../config/prisma';

type ListParams = {
  page: number;
  limit: number;
  search: string;
  sortBy: 'name' | 'price' | 'stock' | 'created_at';
  order: 'asc' | 'desc';
};

const orderByFieldMap: Record<ListParams['sortBy'], 'name' | 'price' | 'stock' | 'createdAt'> = {
  name: 'name',
  price: 'price',
  stock: 'stock',
  created_at: 'createdAt',
};

export const productModel = {
  async create(input: { name: string; price: number; stock: number }) {
    return prisma.product.create({
      data: {
        name: input.name,
        price: input.price,
        stock: input.stock,
      },
    });
  },

  async findById(id: number) {
    return prisma.product.findUnique({ where: { id } });
  },

  async list(params: ListParams) {
    const skip = (params.page - 1) * params.limit;
    const where = params.search
      ? {
          name: {
            contains: params.search,
            mode: 'insensitive' as const,
          },
        }
      : undefined;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: params.limit,
        orderBy: {
          [orderByFieldMap[params.sortBy]]: params.order,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return { data, total };
  },

  async update(id: number, input: { name: string; price: number; stock: number }) {
    return prisma.product.update({
      where: { id },
      data: {
        name: input.name,
        price: input.price,
        stock: input.stock,
      },
    });
  },

  async remove(id: number) {
    return prisma.product.delete({ where: { id } });
  },
};
