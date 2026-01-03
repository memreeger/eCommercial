import { createContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { getFavorites } from "../../../services/firebase/favorite-service";

type FavoriteContextType = {
    favorites: any[];
    refreshFavorites: () => void;
};

export const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<any[]>([]);

    const refreshFavorites = async () => {
        if (!user) {
            setFavorites([]);
            return;
        }
        const data = await getFavorites(user.uid);
        setFavorites(data);
    };

    useEffect(() => {
        refreshFavorites();
    }, [user]);

    return (
        <FavoriteContext.Provider value={{ favorites, refreshFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};
