import { api } from './api';
import type { Product, ProductInput, ProductListQuery, ProductListResponse } from '../types/product';

export async function getProducts(query: ProductListQuery) {
  const response = await api.get<ProductListResponse>('/products', { params: query });
  return response.data;
}

export async function getProductById(id: number) {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function createProduct(payload: ProductInput) {
  const response = await api.post<Product>('/products', payload);
  return response.data;
}

export async function updateProduct(id: number, payload: ProductInput) {
  const response = await api.put<Product>(`/products/${id}`, payload);
  return response.data;
}

export async function deleteProduct(id: number) {
  await api.delete(`/products/${id}`);
}
