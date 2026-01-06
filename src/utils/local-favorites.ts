import type { Product } from "../views/e-commerce/types/product";

const LOCAL_FAV_KEY = "guest_favorites";

//GET ITEM
export const getLocalFavorites = (): Product[] => {
    const data = localStorage.getItem(LOCAL_FAV_KEY);
    return data ? JSON.parse(data) : [];
}

// ADD ITEM

export const addLocalFavorites = (product: Product) => {
    const favorites = getLocalFavorites();

    const exists = favorites.some(fav => fav.id === product.id)
    if (exists) {
        return
    }

    favorites.push(product)
    localStorage.setItem(LOCAL_FAV_KEY, JSON.stringify(favorites))
}

// REMOVE ITEM

export const removeLocalFavorites = (productId: number) => {
    const favorites = getLocalFavorites().filter(
        fav => fav.id !== productId
    )
    localStorage.setItem(LOCAL_FAV_KEY, JSON.stringify(favorites))
}