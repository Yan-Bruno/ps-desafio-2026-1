import { api } from './api';

export interface Category {
  id: string;
  name: string;
}

export async function getAllCategories(): Promise<Category[]> {
  const { response, error } = await api('GET', '/category');
  if (response) {
    return response as Category[];
  }
  console.error('Erro ao buscar categorias:', error?.message);
  return [];
}