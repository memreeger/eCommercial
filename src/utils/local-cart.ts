import type { Product } from "../views/e-commerce/types/product";

export type LocalCartItem = Product & { quantity: number };

const KEY = "cart";

export const getLocalCart = (): LocalCartItem[] => {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const setLocalCart = (cart: LocalCartItem[]) => {
    localStorage.setItem(KEY, JSON.stringify(cart));
};

export const clearLocalCart = () => {
    localStorage.removeItem(KEY);
};
