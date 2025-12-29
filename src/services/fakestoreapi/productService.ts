import axios from "axios";
import type { Product } from "../../views/e-commerce/types/product";

const BASE_URL = "https://fakestoreapi.com/products";

// Tüm ürünleri al
export const getProducts = () => axios.get<Product[]>(BASE_URL);

// Kategoriye göre ürünleri al
export const getProductsByCategory = (category: string) =>
    axios.get<Product[]>(`${BASE_URL}/category/${category}`);

// Tek ürün al
export const getProductById = (id: number) =>
    axios.get<Product>(`${BASE_URL}/${id}`);
