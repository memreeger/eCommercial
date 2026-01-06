import { useContext } from "react"
import { FavoriteContext } from "../context/favorite-context"

export const useFavorite = () => {
    const ctx = useContext(FavoriteContext)
    if (!ctx) {
        throw new Error("useFavorite FavoriteProdiver içinde kullanılmalı ")
    }
    return ctx
}