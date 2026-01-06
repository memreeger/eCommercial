import React, { createContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import { useAuth } from "../hooks/useAuth";
import {
    addOrUpdateCartProduct,
    removeCartProduct,
    getCartProducts,
} from "../../../services/firebase/cart-service";
import {
    getLocalCart,
    setLocalCart,
    clearLocalCart,
} from "../../../utils/local-cart";

type CartItem = Product & { quantity: number };

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);

    // 🔁 AUTH CHANGE → CART SYNC
    useEffect(() => {
        const loadCart = async () => {
            if (!user) {
                setCart(getLocalCart());
                return;
            }

            const localCart = getLocalCart();
            const firebaseCart = await getCartProducts(user.uid);

            const map = new Map<number, CartItem>();

            firebaseCart.forEach(item =>
                map.set(item.id, { ...item })
            );

            localCart.forEach(item => {
                if (map.has(item.id)) {
                    map.get(item.id)!.quantity += item.quantity;
                } else {
                    map.set(item.id, item);
                }
            });

            const merged = Array.from(map.values());
            setCart(merged);

            await Promise.all(
                merged.map(item =>
                    addOrUpdateCartProduct(user.uid, item)
                )
            );

            clearLocalCart();
        };

        loadCart();
    }, [user]);

    // ➕ ADD
    const addToCart = (product: Product) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === product.id);
            const updated = exists
                ? prev.map(i =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
                : [...prev, { ...product, quantity: 1 }];

            if (!user) {
                setLocalCart(updated);
            } else {
                const item = updated.find(i => i.id === product.id)!;
                addOrUpdateCartProduct(user.uid, item);
            }

            return updated;
        });
    };

    // ➖ REMOVE
    const removeFromCart = (id: number) => {
        setCart(prev => {
            const updated = prev.filter(i => i.id !== id);

            if (!user) {
                setLocalCart(updated);
            } else {
                removeCartProduct(user.uid, id);
            }

            return updated;
        });
    };

    const clearCart = () => {
        setCart([]);
        if (!user) {
            clearLocalCart();
        }
    };

    const increaseQuantity = (id: number) => {
        setCart(prev => {
            const updated = prev.map(i =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            );

            if (!user) {
                setLocalCart(updated);
            } else {
                const item = updated.find(i => i.id === id)!;
                addOrUpdateCartProduct(user.uid, item);
            }

            return updated;
        });
    };

    const decreaseQuantity = (id: number) => {
        setCart(prev => {
            const updated = prev
                .map(i =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
                .filter(i => i.quantity > 0);

            if (!user) {
                setLocalCart(updated);
            } else {
                const item = updated.find(i => i.id === id);
                if (item) {
                    addOrUpdateCartProduct(user.uid, item);
                } else {
                    removeCartProduct(user.uid, id);
                }
            }

            return updated;
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
