export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
};

export type ProductInput = {
  name: string;
  price: number;
  stock: number;
};

export type ProductListQuery = {
  page: number;
  limit: number;
  search: string;
  sortBy: 'name' | 'price' | 'stock' | 'created_at';
  order: 'asc' | 'desc';
};

export type ProductListResponse = {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
