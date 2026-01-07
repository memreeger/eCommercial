import { createContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import {
    // getFavorites as getFirebaseFavorites,
    addFavorite as addFirebaseFavorite,
    removeFavorite as removeFirebaseFavorite,
    getFavorites,
} from "../../../services/firebase/favorite-service";
import { getLocalFavorites, addLocalFavorites, removeLocalFavorites } from "../../../utils/local-favorites";
import type { Product } from "../types/product";

type FavoriteContextType = {
    favorites: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
};

export const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Product[]>([]);

    // Helper: Firebase ve localStorage'dan gelen id'leri number yap
    const normalizeProduct = (p: any): Product => ({
        ...p,
        id: typeof p.id === "string" ? Number(p.id) : p.id,
    });

    useEffect(() => {
        const loadFavorites = async () => {
            if (!user) {
                // Guest favorileri
                setFavorites(getLocalFavorites().map(normalizeProduct));
                return;
            }

            // Login olduysa: önce guest favorilerini Firebase ile sync et
            const localFavs = getLocalFavorites(); //[1,2,3,]
            const firebaseFavs = await getFavorites(user.uid);

            const allFavsMap = new Map<number, Product>();
            // Firebase favorilerini ekle
            firebaseFavs.forEach(f => allFavsMap.set(f.id, normalizeProduct(f)));

            // Local favorileri ekle (duplicate kontrolü)
            for (const f of localFavs) {
                const normalized = normalizeProduct(f);
                if (!allFavsMap.has(normalized.id)) {
                    allFavsMap.set(normalized.id, normalized);
                    await addFirebaseFavorite(user.uid, normalized); // firebase'e ekle
                }
            }

            // State olarak tüm favorileri set et
            setFavorites(Array.from(allFavsMap.values()));

            // localStorage temizle
            localFavs.forEach(f => removeLocalFavorites(f.id));
        };

        loadFavorites();
    }, [user]);


    const addFavorite = (product: Product) => {
        const normalized = normalizeProduct(product);

        if (user) {
            addFirebaseFavorite(user.uid, normalized).then(() =>
                setFavorites((prev) => {
                    if (prev.some((p) => p.id === normalized.id)) return prev;
                    return [...prev, normalized];
                })
            );
        } else {
            // guest
            setFavorites((prev) => {
                if (prev.some((p) => p.id === normalized.id)) return prev;
                const newFavs = [...prev, normalized];
                addLocalFavorites(normalized);
                return newFavs;
            });
        }
    };

    const removeFavorite = (productId: number) => {
        if (user) {
            removeFirebaseFavorite(user.uid, productId).then(() =>
                setFavorites((prev) => prev.filter((p) => p.id !== productId))
            );
        } else {
            setFavorites((prev) => prev.filter((p) => p.id !== productId));
            removeLocalFavorites(productId);
        }
    };

    const isFavorite = (productId: number) => favorites.some((p) => p.id === productId);

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
