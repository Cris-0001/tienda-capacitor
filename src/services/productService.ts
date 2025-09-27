// src/services/productService.ts
import api from './api';

export async function getProducts() {
  const res = await api.get('/products'); // GET /products (FakeStore)
  return res.data;
}

export async function getProductById(id:number){
  const res = await api.get(`/products/${id}`);
  return res.data;
}
